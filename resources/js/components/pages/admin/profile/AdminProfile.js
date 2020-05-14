import React, { Component } from 'react';
import Axios from 'axios';
import CustomToast from '../../../../Utils/CustomToast';
import { connect } from 'react-redux';
import profileAction from '../../../../redux/actions/profileAction';


class AdminProfile extends Component {


    constructor(props) {
        super(props);
        let profile = this.props.profile;

        this.state = this.setProfileObjectData(profile);

        this.changeHandler = this.changeHandler.bind(this);
        this.changeFileHandler = this.changeFileHandler.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidUpdate(prevProps){
        
        if(prevProps.profile !== this.props.profile){
            let profile = this.props.profile;
            this.setState(this.setProfileObjectData(profile));
        }
            
    }


    setProfileObjectData(profile){
       return {
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            email: profile.email,
            address: profile.address,
            about: profile.about,
            facebook_link: profile.facebook_link,
            youtube_link: profile.youtube_link,
            instagram_link: profile.instagram_link,
            imageFile: {},
            imgPreviewSrc: "/images/profile_pic.png",
            nameError: "",
            emailError: ""
        }
    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeFileHandler(e) {
        let files = e.target.files;
        this.setState({
            imageFile: files[0],
            imgPreviewSrc: URL.createObjectURL(files[0])
        })
    }

    updateProfile() {
        event.preventDefault();

        if (this.isValidFields()) {
            var formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('phone', this.state.phone);
            formData.append('email', this.state.email);
            formData.append('about', this.state.about);
            formData.append('address', this.state.address);
            formData.append('image', this.state.imageFile);
            formData.append('facebook_link', this.state.facebook_link);
            formData.append('youtube_link', this.state.youtube_link);
            formData.append('instagram_link', this.state.instagram_link);

            formData.append("_method", 'put');

            Axios.post('api/profile/' + this.state.id, formData)
                .then(res => {
                    this.props.setProfile(res.data);
                    CustomToast.success("Successfully Profile Updated");
                });
        }
    }

    isValidFields() {
        this.clearErrorMsg();
        let isValid = true;

        if (this.state.name.trim() == "") {
            isValid = false;
            this.setState({ nameError: "*Name should not be empty" });
        }
        if (this.state.email.trim() == "") {
            isValid = false;
            this.setState({ emailError: "*Email should not be empty" });
        }

        return isValid;
    }

    clearErrorMsg() {
        this.setState({ nameError: "", emailError: "" });
    }

    render() {
        return (
            <>
                <div style={{ paddingTop: "20px" }} data-aos="fade">
                    <div className="container-fluid">

                        <div className="row justify-content-center">
                            <div className="col-md-10">


                                <div className="row">
                                    <div className="col-lg-12 mb-2">
                                        <form onSubmit={this.updateProfile}>

                                            <div className="row">
                                                <div className="col-lg-8 mb-2">
                                                    <div className="row form-group">
                                                        <div className="col-md-6 mb-3 mb-md-0">
                                                            <label className="text-black">Name</label>
                                                            <input type="text" name="name" onChange={this.changeHandler} value={this.state.name || ""} className="form-control" />
                                                            <span className="validation-error">{this.state.nameError}</span>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="text-black">Phone</label>
                                                            <input type="text" name="phone" onChange={this.changeHandler} value={this.state.phone || ""} className="form-control" />
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
                                                            <label className="text-black">Address</label>
                                                            <textarea name="address" onChange={this.changeHandler} value={this.state.address || ""} cols="30" rows="3" className="form-control" placeholder="Write your notes or questions here..."></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label className="text-black">About Me</label>
                                                            <textarea name="about" onChange={this.changeHandler} value={this.state.about || ""} cols="30" rows="7" className="form-control" placeholder="Write your notes or questions here..."></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 ml-auto">

                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <input type="file" onChange={this.changeFileHandler} accept="image/*" className="form-control" />
                                                            <img className="preview-image" src={this.state.imgPreviewSrc} alt="placeholder image goes here" />
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label className="text-black">Facebook Link</label>
                                                            <input type="text" name="facebook_link" onChange={this.changeHandler} value={this.state.facebook_link || ""} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label className="text-black">Youtube Link</label>
                                                            <input type="text" name="youtube_link" onChange={this.changeHandler} value={this.state.youtube_link || ""} className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-12">
                                                            <label className="text-black">Instagram Link</label>
                                                            <input type="text" name="instagram_link" onChange={this.changeHandler} value={this.state.instagram_link || ""} className="form-control" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row form-group col-lg-12 mb-5">
                                                    <div className="col-md-12">
                                                        <input type="submit" value="Update Profile" className="btn btn-primary py-2 px-4 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (profile) => {
            dispatch(profileAction.setProfile(profile))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);