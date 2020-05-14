import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';


class ContactMe extends Component {
    render() {
        return (
            <>
                <Fade top>
                    <div className="py-3 mb-5 mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 d-md-flex align-items-center">
                                    <h2 className="text-black mb-5 mb-md-0 text-center text-md-left">Need any kind of Art?</h2>
                                    <div className="ml-auto text-center text-md-left">
                                        <Link to="/contact" className="btn btn-danger py-3 px-5 rounded">Contact Me</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>

            </>
        );
    }
}

export default ContactMe;