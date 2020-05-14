import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ContactMe from '../ContactMe';
import MyPhotography from './MyPhotography';
import Fade from 'react-reveal/Fade';
import Recomendation from '../Recomendation';


class Home extends Component {

   render() {
        return (
            <>
                <div className="site-blocks-cover overlay inner-page-cover background-cover-img" style={{ backgroundImage: "url('asset/images/home_background.png')" }}>
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <Fade top>
                                <div className="col-md-7 text-center">
                                    <h1>I'm Dipto Shill a Professional Artist Live in Chittagong</h1>
                                </div>
                            </Fade>
                        </div>
                    </div>
                </div>

                <div className="site-block-profile-pic">
                    <Link to="/about"><img src="/images/profile_pic.png" alt="Image" /></Link>
                </div>

                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-12 ">
                                <h2 className="site-section-heading text-center">My Specialties</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Fade top>
                                    <div className="site-block-half d-lg-flex">
                                        <div className="image" style={{ backgroundImage: "url('asset/images/scifi01.png')" }}></div>
                                        <div className="text">
                                            <h3>Nature</h3>
                                            <p>Sunt nesciunt repellat molestias vitae nostrum aliquid laudantium quo voluptatem provident voluptate tenetur illo.</p>
                                        </div>
                                    </div>
                                </Fade>
                                <Fade top>
                                    <div className="site-block-half d-lg-flex">
                                        <div className="image" style={{ backgroundImage: "url('asset/images/person_5.jpg')" }}></div>
                                        <div className="text">
                                            <h3>Portrait</h3>
                                            <p>Sunt nesciunt repellat molestias vitae nostrum aliquid laudantium quo voluptatem provident voluptate tenetur illo.</p>
                                        </div>
                                    </div>
                                </Fade>

                            </div>
                            <div className="col-md-6">
                                <Fade top>
                                    <div className="site-block-half d-lg-flex">
                                        <div className="image" style={{ backgroundImage: "url('asset/images/recovered2.jpg')" }}></div>
                                        <div className="text">
                                            <h3>Wedding</h3>
                                            <p>Sunt nesciunt repellat molestias vitae nostrum aliquid laudantium quo voluptatem provident voluptate tenetur illo.</p>
                                        </div>
                                    </div>
                                </Fade>
                                <Fade top>
                                    <div className="site-block-half d-lg-flex">
                                        <div className="image" style={{ backgroundImage: "url('asset/images/kingdom-dff.png')" }}></div>
                                        <div className="text">
                                            <h3>Sci-fi</h3>
                                            <p>Sunt nesciunt repellat molestias vitae nostrum aliquid laudantium quo voluptatem provident voluptate tenetur illo.</p>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>
                </div>

                <Recomendation/>
                
                <MyPhotography />

                <ContactMe />
            </>
        );
    }
}

export default Home;