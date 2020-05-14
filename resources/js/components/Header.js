import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import categoryAction from '../redux/actions/categoryAction';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import profileAction from '../redux/actions/profileAction';
import Bounce from 'react-reveal/Bounce';


class Header extends Component {

    constructor(props) {
        super(props);
        let enCryprtKey = hmacSHA512('admin', 'k').toString();
        this.state = {
            categories: [],
            isLoggedIn: localStorage.getItem(enCryprtKey) != null,
            profile: {}
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setCategoriesData();
        this.setProfileData();
    }

    setCategoriesData() {
        Axios.get('api/categories')
            .then(res => {
                this.props.setCategories(res.data);
            });
    }

    setProfileData() {
        Axios.get('api/profile')
            .then(res => {
                this.props.setProfile(res.data[0]);
            });
    }

    logout() {
        localStorage.removeItem(hmacSHA512('admin', 'k').toString());
        window.location.pathname = '/admin';
    }


    render() {
        const profile = this.props.profile;
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light">
                    
                    <Bounce top>
                        <div className="col-6 col-xl-3">
                            <h1 className="mb-0 app-title"><Link to="/" className="text-black h2 mb-0">Art Gallery<span className="text-primary">.</span></Link></h1>
                        </div> 
                    </Bounce> 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/gallery" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Gallery
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {
                                        this.props.categories.map(category => {
                                            return <Link key={category.id} className="dropdown-item" to={{ pathname: "/gallery", selectedCategory: category }}>{category.name}</Link>
                                        })
                                    }
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            {
                                this.state.isLoggedIn ?
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/admin-category" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Admin
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link className="dropdown-item" to="/admin-category">Categories</Link>
                                            <Link className="dropdown-item" to="/admin-image">Images</Link>
                                            <Link className="dropdown-item" to="/admin-message">Messages</Link>
                                            <Link className="dropdown-item" to="/admin-about">Profile</Link>
                                            <Link className="dropdown-item" to="" onClick={this.logout}>Logout</Link>
                                        </div>
                                    </li>
                                    : null
                            }

                            <li className="nav-item social-part">
                                <a href={profile.facebook_link} className="nav-link"><span className="icon-facebook"></span></a>
                            </li>
                            <li>
                                <a href={profile.instagram_link} className="nav-link"><span className="icon-instagram"></span></a>
                            </li>
                            <li>
                                <a href={profile.youtube_link} className="nav-link"><span className="icon-youtube-play"></span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories,
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCategories: (categories) => {
            dispatch(categoryAction.setCategories(categories))
        },
        setProfile: (profile) => {
            dispatch(profileAction.setProfile(profile))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)