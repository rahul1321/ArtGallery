import React, { Component } from 'react';
import Axios from 'axios';
import ReactGallery from '../../Utils/ReactGallery';
import ContactMe from '../ContactMe';
import Fade from 'react-reveal/Fade';


class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: props.location.selectedCategory,
            photos: []
        }
        this.getImagesBySelectedCategory = this.getImagesBySelectedCategory.bind(this);
    }

    componentDidMount() {
        if (typeof this.state.selectedCategory === "undefined") {
            this.setFirstCategoryAsDefault(this.getImagesBySelectedCategory);
        } else
            this.getImagesBySelectedCategory(this.state.selectedCategory);
        
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.selectedCategory !== prevProps.location.selectedCategory) {
            console.log('componentDidUpdate' + this.props.location.selectedCategory);
            this.setState({ selectedCategory: this.props.location.selectedCategory });
            this.getImagesBySelectedCategory(this.props.location.selectedCategory);
        }
    }


    setFirstCategoryAsDefault(callback) {
        Axios.get('api/categories/')
            .then(res => {
                this.setState({ selectedCategory: res.data[0] });
                callback(res.data[0]);
            });
    }

    getImagesBySelectedCategory(category) {
        console.log("getImagesBySelectedCategory->" + category.id);
        Axios.get('api/category-images/' + category.id)
            .then(res => {
                this.createGalleryPhotosObject(res.data);
            });
    }

    createGalleryPhotosObject(images) {
        var photos = [];
        images.map(image => {
            var obj = {
                src: 'images/' + image.image,
                width: 1,
                height: 1
            }
            photos.push(obj);
        });
        this.setState({ photos: photos });
    }

    render() {

        return (
            <>
                <div className="site-blocks-cover overlay inner-page-cover background-cover-img" style={{ backgroundImage: "url('asset/images/home_background.png')" }} data-stellar-background-ratio="0.5">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                           <Fade top>
                                <div className="col-md-7 text-center">
                                    <h1>{typeof this.state.selectedCategory === "undefined"?"":this.state.selectedCategory.name}</h1>
                                    <p className="caption">{this.state.photos.length} Pictures</p>
                                </div>
                           </Fade>
                        </div>
                    </div>
                </div>



                <div className="site-section">
                    <div className="container">
                        <ReactGallery photos={this.state.photos}></ReactGallery>
                    </div>
                </div>

                <ContactMe/>
            </>
        );
    }
}

export default Gallery;