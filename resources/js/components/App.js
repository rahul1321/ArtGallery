import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './Routers';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from '../redux/store';
import { Provider } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Axios from 'axios';

class App extends Component {

    constructor() {
        super();
        this.state = {
            timeout: 1000 * 60 * 10,
            isLoggedIn: localStorage.getItem(hmacSHA512('admin', 'k').toString()) != null,
        }

        this.idleTimer = null
        this.onAction = this._onAction.bind(this)
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)
    }

    componentDidMount() {
        const loader = document.querySelector('.loader');
        loader.classList.add('loader--hide');
    }

    _onAction(e) {
        //console.log('user did something', e)
        //this.setState({isTimedOut: false})
    }

    _onActive(e) {
        //console.log('user is active', e)
        //this.setState({isTimedOut: false})
    }


    _onIdle(e) {
        if (this.state.isLoggedIn) {
            console.log('user is idle', e)
            this.idleTimer.reset();
            this.logout();
        }
        /* const isTimedOut = this.state.isTimedOut
          if (isTimedOut) {
             this.props.history.push('/')
         } else {
           this.setState({showModal: true})
           this.idleTimer.reset();
           this.setState({isTimedOut: true})
         } */

    }

    logout() {
        let key = hmacSHA512('admin', 'k').toString();

        Axios.post("api/logout", { access_token: localStorage.getItem(key) })
            .then(res => {
                if (res.data.success) {
                    localStorage.removeItem(key);
                    window.location.pathname = '/admin';
                } else {
                    CustomToast.error("Something went wrong, Please try again");
                }
            })
            .catch(error => {
                CustomToast.error("Something went wrong, Please try again");
            });

    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />
                    <Routers />
                    <Footer />
                </Router>
                <ToastContainer />
                {
                    this.state.isLoggedIn ?
                        <IdleTimer
                            ref={ref => { this.idleTimer = ref }}
                            element={document}
                            onActive={this.onActive}
                            onIdle={this.onIdle}
                            onAction={this.onAction}
                            debounce={250}
                            timeout={this.state.timeout}
                        /> : null}
                }

            </Provider>

        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
