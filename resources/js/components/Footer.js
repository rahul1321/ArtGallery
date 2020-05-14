import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Footer extends Component {

    render() {
        const profile = this.props.profile;
        return (
            <>
                <footer className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="mb-5">
                                    <h3 className="footer-heading mb-4">About ArtGallery</h3>
                                     <p>This is my personal website. I upload my art and other photography stuffs in this site.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <h3 className="footer-heading mb-4">Navigations</h3>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <ul className="list-unstyled">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/gallery">Photography</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6 col-lg-6">
                                        <ul className="list-unstyled">
                                            <li><Link to="/about">About</Link></li>
                                            <li><Link to="/contact">Contact Me</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 mb-5 mb-lg-0">
                                <h3 className="footer-heading mb-4">Follow Me</h3>

                                <div>
                                    <a href={profile.facebook_link} className="pl-0 pr-3"><span className="icon-facebook"></span></a>
                                    <a href={profile.instagram_link} className="pl-3 pr-3"><span className="icon-instagram"></span></a>
                                    <a href={profile.youtube_link} className="pl-3 pr-3"><span className="icon-youtube-play"></span></a>
                                </div>
                            </div>

                        </div>
                        <div className="row pt-5 mt-5 text-center">
                            <div className="col-md-12">
                                <p>
                                  <span>Developed by <a href="https://resoftbd.com" target="_blank" >Resoft</a></span>  
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}


const mapStateToPros = (state) => {
    return {
        profile: state.profileReducer.profile
    }
}

export default connect(mapStateToPros)(Footer)