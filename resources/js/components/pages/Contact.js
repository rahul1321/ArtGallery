import React, { Component } from 'react'
import Axios from 'axios';
import CustomToast from '../../Utils/CustomToast';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Spinner from '../../Utils/Spinner';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      subject: "",
      message: "",
      fnameError: "",
      emailError: "",
      subjectError: "",
      messageError: "",
      loading: false,
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    window.scrollTo(0, 0)
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendMessage() {
    event.preventDefault();

    if (this.isValidFields()) {

      let data = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      };

      let headers = {
        'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
      }

      this.setState({ loading: true }, () => {
        Axios.post("api/messages", data)
          .then(res => {
            this.setState({ loading: false });
            if (res.data.success) {
              CustomToast.success("Message send successfully");
              this.clearFields();
            }else
              CustomToast.error("Something went wrong");

          }).catch(error => {
            this.setState({ loading: false });
            CustomToast.error("Something went wrong");
          })
      });
    }
  }

  clearFields() {
    this.setState({ fname: "", lname: "", email: "", subject: "", message: "" });
  }

  isValidFields() {
    this.clearErrorMsg();
    let isValid = true;

    if (this.state.fname.trim() == "") {
      isValid = false;
      this.setState({ fnameError: "*First name should not be empty" });
    }
    if (this.state.email.trim() == "") {
      isValid = false;
      this.setState({ emailError: "*Email should not be empty" });
    }
    if (this.state.subject.trim() == "") {
      isValid = false;
      this.setState({ subjectError: "*Subject should not be empty" });
    }
    if (this.state.message.trim() == "") {
      isValid = false;
      this.setState({ messageError: "*Message should not be empty" });
    }

    return isValid;
  }

  clearErrorMsg() {
    this.setState({ fnameError: "", emailError: "", subjectError: "", messageError: "" });
  }

  render() {
    let profile = this.props.profile;
    return (
      <>
        <div className="site-blocks-cover overlay inner-page-cover background-cover-img" style={{ backgroundImage: "url('asset/images/contact_background.png')" }} data-stellar-background-ratio="0.5">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <Fade top>
                <div className="col-md-7 text-center">
                  <h1>Contact Me</h1>
                </div>
              </Fade>
            </div>
          </div>
        </div>
        <Fade big>
          <div className="site-section">
            <div className="container-fluid">

              <div className="row justify-content-center">
                <div className="col-md-7">


                  <div className="row">
                    <div className="col-lg-8 mb-5">
                      <form onSubmit={this.sendMessage}>

                        <div className="row form-group">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <label className="text-black">First Name</label>
                            <input type="text" name="fname" onChange={this.changeHandler} value={this.state.fname || ""} className="form-control" />
                            <span className="validation-error">{this.state.fnameError}</span>
                          </div>
                          <div className="col-md-6">
                            <label className="text-black">Last Name</label>
                            <input type="text" name="lname" onChange={this.changeHandler} value={this.state.lname || ""} className="form-control" />
                          </div>
                        </div>

                        <div className="row form-group">

                          <div className="col-md-12">
                            <label className="text-black">Email</label>
                            <input type="email" name="email" onChange={this.changeHandler} value={this.state.email || ""} className="form-control" />
                            <span className="validation-error">{this.state.emailError}</span>
                          </div>
                        </div>

                        <div className="row form-group">

                          <div className="col-md-12">
                            <label className="text-black">Subject</label>
                            <input type="text" name="subject" onChange={this.changeHandler} value={this.state.subject || ""} className="form-control" />
                            <span className="validation-error">{this.state.subjectError}</span>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col-md-12">
                            <label className="text-black">Message</label>
                            <textarea name="message" onChange={this.changeHandler} value={this.state.message || ""} cols="30" rows="5" className="form-control" placeholder="Write your notes or questions here..."></textarea>
                            <span className="validation-error">{this.state.messageError}</span>
                          </div>
                        </div>

                        <div className="row form-group">
                          <div className="col-md-12">
                            <input type="submit" value="Send Message" className="btn btn-primary py-2 px-4 text-white" />
                          </div>
                        </div>


                      </form>
                    </div>

                    <div className="col-lg-3 ml-auto">
                      <div className="mb-3 bg-white">
                        <p className="mb-0 font-weight-bold">Address</p>
                        <p className="mb-4">{profile.address}</p>

                        <p className="mb-0 font-weight-bold">Phone</p>
                        <p className="mb-4"><a href="#">{profile.phone}</a></p>

                        <p className="mb-0 font-weight-bold">Email Address</p>
                        <p className="mb-0">{profile.email}</p>

                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Fade>
        <Spinner loading={this.state.loading} />

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.profile
  }
}

export default connect(mapStateToProps)(Contact);