import React, { Component } from 'react';
import ContactMe from '../ContactMe';
import MyPhotography from './MyPhotography';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import Recomendation from '../Recomendation';


class About extends Component {

    constructor() {
        super();
        window.scrollTo(0, 0)
    }


    render() {
        const profile = this.props.profile;
        return (
            <>
                <div className="site-blocks-cover overlay inner-page-cover background-cover-img" style={{ backgroundImage: "url('asset/images/aboutme_background.png')" }} data-stellar-background-ratio="0.5">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <Fade top>
                                <div className="col-md-7 text-center">
                                    <h1>About Me</h1>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>



                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <Fade left>
                                <div className="col-md-6  mb-5">
                                    <img src="images/profile_pic.png" alt="Images" className="img-fluid" />
                                </div>
                            </Fade>
                            <Fade right>
                                <div className="col-md-5 ml-auto">
                                    <h3 className="text-black mb-3">Hello! I'm {profile.name}</h3>
                                    <p>{profile.about}</p>
                                    <p className="mt-5 mb-3">Follow Me</p>
                                    <p>
                                        <a href={profile.youtube_link} className="pr-2"><span className="icon-youtube-play"></span></a>
                                        <a href={profile.instagram_link} className="p-2"><span className="icon-instagram"></span></a>
                                        <a href={profile.facebook_link} className="p-2"><span className="icon-facebook"></span></a>
                                    </p>
                                </div>
                            </Fade>

                        </div>
                    </div>
                </div>


                <Fade left>
                    <div className="site-section pt-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <h2 className="text-black">My Skills</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="h5">Nature Art</h2>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{ width: "97%" }} aria-valuenow="97" aria-valuemin="0" aria-valuemax="100">97%</div>
                                    </div>
                                    <h2 className="h5">Portrait Art</h2>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{ width: "90%" }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">90%</div>
                                    </div>
                                    <h2 className="h5">Wedding Art</h2>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{ width: "85%" }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">85%</div>
                                    </div>
                                    <h2 className="h5">Sci-fi Art</h2>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade right>
                    <Recomendation/>
                </Fade>

                <MyPhotography />


                <ContactMe />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
}
export default connect(mapStateToProps)(About);