import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import Modal from '@material-ui/core/Modal';
import '../../../../../public/css/login.css';
import CustomToast from '../../../Utils/CustomToast';
import hmacSHA512 from 'crypto-js/hmac-sha512';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: ""
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this);

    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });

    }

    login() {
        event.preventDefault();
        
        if(this.isValidFields()){
            let email = this.state.email;
            let password = this.state.password;
    
            Axios.get('api/admin/' + email + '/' + password)
                .then(res => {
                    if(Object.keys(res.data).length > 0){
                        let enCryprtKey = hmacSHA512('admin','k').toString();
                        localStorage.setItem(enCryprtKey, res.data);
                        window.location.pathname = '/admin-category';
                    }else{
                        CustomToast.error("Wrong Email or Password");
                    }
                    
                });
        }
    }

    isValidFields(){
        this.clearErrorMessage();
        
        let isValid = true;

        if(this.state.email.trim()==""){
            isValid = false;
            this.setState({emailError:"*Please enter valid email"});
        }
        if(this.state.password.trim()==""){
            isValid = false;
            this.setState({passwordError:"*Please enter password"});
        }

        return isValid;
    }


    clearErrorMessage(){
        this.setState({emailError:"",passwordError:""});
    }

    render() {
        let enCryprtKey = hmacSHA512('admin','k').toString();

        if (localStorage.getItem(enCryprtKey) != null)
            return (<Redirect to="/admin-category"></Redirect>)

        return (
            <>
                <Modal
                    open={true}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                     <div className="limiter">
                        <div className="container-login100">
                            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                                <form onSubmit={this.login} className="login100-form validate-form">
                                    <span className="login100-form-title p-b-33">
                                        Admin Login
                                    </span>
                                    <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="email" name="email" onChange={this.changeHandler} value={this.state.email || ""} placeholder="Email" />
                                        <span className="validation-error">{this.state.emailError}</span>
                                    </div>
                                    <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" name="password" onChange={this.changeHandler} value={this.state.password || ""} placeholder="Password" />
                                        <span className="validation-error">{this.state.passwordError}</span>
                                    </div>
                                    <div className="container-login100-form-btn m-t-20">
                                        <button className="login100-form-btn">
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>


            </>
        );
    }



}

export default Login;