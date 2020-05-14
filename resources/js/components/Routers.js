import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Category from './pages/admin/category/Category';
import Login from './pages/admin/Login';
import Image from './pages/admin/image/Image';
import AdminProfile from './pages/admin/profile/AdminProfile';
import PrivateRoute from '../Utils/PrivateRoute';
import Message from './pages/admin/message/Message';

class Routers extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />v
                    <Route exact path="/gallery/" component={Gallery} />

                    <Route exact path="/admin" component={Login} />
                    <PrivateRoute exact path="/admin-category" component={Category} />
                    <PrivateRoute exact path="/admin-image" component={Image} />
                    <PrivateRoute exact path="/admin-about" component={AdminProfile} />
                    <PrivateRoute exact path="/admin-message" component={Message} />
                </Switch>
            </div>
        );
    }
}

export default Routers;