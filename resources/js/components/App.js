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

class App extends Component {

    componentDidMount(){
        const loader = document.querySelector('.loader');
        loader.classList.add('loader--hide');
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

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
