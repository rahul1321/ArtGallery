import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class Recomendation extends Component {
    render() {
        return (
            <>
                 <div className="py-5 site-block-testimonial" style={{ backgroundImage: "url('asset/images/hero_bg_1.jpg')" }}>
                    <div className="container">
                        <div className="row block-13 mb-5">
                            <div className="col-md-12 text-center">
                                <div className="nonloop-block-13">
                                    <Carousel infiniteLoop={true} 
                                            showThumbs={false} 
                                            stopOnHover={true} 
                                            autoPlay={true}
                                            showStatus = {false}
                                            showIndicators = {false}
                                    >
                                        <div className="block-testimony">
                                            <img src="asset/images/person_1.jpg" alt="Image" className="img-fluid" />
                                            <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident suscipit dicta repellat, sit aut at nulla quam sed, neque voluptatum deserunt, vero ipsum natus sint culpa illo. Vel, sed, assumenda.&rdquo;</p>
                                            <p className="small">&mdash; Marrygrace Woodland</p>
                                        </div>
                                        <div className="block-testimony">
                                            <img src="asset/images/person_2.jpg" alt="Image" className="img-fluid" />
                                            <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident suscipit dicta repellat, sit aut at nulla quam sed, neque voluptatum deserunt, vero ipsum natus sint culpa illo. Vel, sed, assumenda.&rdquo;</p>
                                            <p className="small">&mdash; Jean Doe</p>
                                        </div>
                                        <div className="block-testimony">
                                            <img src="asset/images/person_3.jpg" alt="Image" className="img-fluid" />
                                            <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident suscipit dicta repellat, sit aut at nulla quam sed, neque voluptatum deserunt, vero ipsum natus sint culpa illo. Vel, sed, assumenda.&rdquo;</p>
                                            <p className="small">&mdash; Ben Smith</p>
                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Recomendation;