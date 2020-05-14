import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import hmacSHA512 from 'crypto-js/hmac-sha512';

const enCryprtKey = hmacSHA512('admin','k').toString();

const PrivateRoute = ({ component: Component, ...rest }) => (
  
    <Route {...rest} render={(props) => (
        localStorage.getItem(enCryprtKey) != null
        ? <Component {...props} />
        : <Redirect to='/admin' />
    )} />
  )

export default PrivateRoute;
