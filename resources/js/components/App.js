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

const loader = document.querySelector('.loader');

// if you want to show the loader when React loads data again
const showLoader = () => loader.classList.remove('loader--hide');

const hideLoader = () => loader.classList.add('loader--hide');

class App extends Component {

    componentDidMount() {
        //this.props.hideLoader();
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
            </Provider>
        );
    }
}

// the setTimeout simulates the time it takes react to load, and is not part of the solution
/* setTimeout(() =>
    // the show/hide functions are passed as props
    ReactDOM.render(
        <App
            hideLoader={hideLoader}
            showLoader={showLoader}
        />,
        document.getElementById('root')
    )
    , 1000); */

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
