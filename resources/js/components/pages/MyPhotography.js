import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';


class MyPhotography extends Component {

    constructor() {
        super()
        this.state = {
            catrgoriesWithImage: []
        }
    }

    componentDidMount() {
        Axios.get('api/categoriesWithCoverImage')
            .then(res => {
                this.setState({ catrgoriesWithImage: res.data });
            })
    }

    render() {
        return (
            <>
                <div className="site-section border-bottom">
                    <div className="container">
                        <div className="row text-center justify-content-center mb-5">

                            <Fade left big>
                                <div className="col-md-7">
                                    <h2>My Art Gallery</h2>
                                </div>
                            </Fade>
                        </div>
                        <div className="row">
                            {
                                this.state.catrgoriesWithImage.map(item => {
                                    let category = {
                                        id: item.id,
                                        name: item.name
                                    };

                                    return <div key={item.id} className="col-md-6 col-lg-4">
                                        <Link className="image-gradient" to={{ pathname: "/gallery", selectedCategory: category }}>
                                            <figure>
                                                <img src={"images/" + item.image} alt="" className="img-fluid min-height-img" />
                                            </figure>
                                            <div className="text">
                                                <h3>{item.name}</h3>
                                                <span> {item.numofimage} photos </span>
                                            </div>
                                        </Link>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MyPhotography;