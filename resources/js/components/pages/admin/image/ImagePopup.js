import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import CustomToast from '../../../../Utils/CustomToast';
import { connect } from 'react-redux';
import Spinner from '../../../../Utils/Spinner';
import hmacSHA512 from 'crypto-js/hmac-sha512';

class ImagePopup extends Component {

    constructor(props) {
        super(props);

        let image = this.props.image;
        this.state = {
            isEdit: image != null,
            title: image != null ? image.title : '',
            category_id: image != null ? image.category_id : null,
            description: image != null ? image.description : '',
            imageFile: null,
            imgPreviewSrc: image != null ? '/images/' + image.image : 'http://via.placeholder.com/350x150',
            image: image,
            titleError: "",
            imageFileError: "",
            loading: false
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.changeFileHandler = this.changeFileHandler.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveImage = this.saveImage.bind(this);
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

    closeModal() {
        this.props.onClose();
    }

    saveImage() {
        event.preventDefault();

        if (this.validFields()) {
            var category_id = this.state.category_id == null ? this.props.categories[0].id : this.state.category_id;

            var formData = new FormData();
            formData.append('image', this.state.imageFile);
            formData.append('title', this.state.title);
            formData.append('category_id', category_id);
            formData.append('description', this.state.description);

            let headers = { 
                'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
            }

            if (this.state.isEdit) {
                formData.append("_method", 'put');

                this.setState({loading: true}, ()=>{
                    Axios.post('api/images/' + this.state.image.id, formData, {headers: headers})
                    .then(res => {
                        this.setState({loading:false});
                        if(res.data.success){
                            this.props.editImageRow(res.data.image);
                            this.closeModal();
                            CustomToast.success("Successfully updated");
                        }else
                            CustomToast.error("Something went wrong");
                    })
                    .catch(error=>{
                        this.setState({loading:false});
                        CustomToast.error("Something went wrong");
                    });
                });
                
            } else {
                this.setState({loading: true}, ()=>{
                    Axios.post('api/images', formData ,{headers: headers})
                    .then(res => {
                        this.setState({loading:false});
                        if(res.data.success){
                            this.props.addImageRow(res.data.image);
                            this.closeModal();
                            CustomToast.success("Successfully added");
                        }else
                            CustomToast.error("Something went wrong");
                    })
                    .catch(error=>{
                        this.setState({loading:false});
                        CustomToast.error("Something went wrong");
                    });
                });
            }
        }
    }


    validFields() {
        this.clearErrorMsg();
        let isValid = true;
        if (this.state.title.trim() == "") {
            isValid = false;
            this.setState({ titleError: "*Title should not be empty" });
        }
        if (!this.state.isEdit && this.state.imageFile == null) {
            isValid = false;
            this.setState({ imageFileError: "*No image selected" });
        }

        return isValid;
    }

    clearErrorMsg(){
        this.setState({ titleError: "" , imageFileError: ""});
    }

    render() {
        return (
            <>
                <Form onSubmit={this.saveImage}>
                    <Form.Group>
                        <Form.Control onChange={this.changeHandler} type="text" name='title' value={this.state.title || ''} placeholder="Enter title" />
                        <span className="validation-error">{this.state.titleError}</span>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Select category</Form.Label>
                        <Form.Control as="select" onChange={this.changeHandler} name='category_id' value={this.state.category_id || ''}>
                            {
                                this.props.categories.map(category => {
                                    return <option key={category.id} value={category.id} >{category.name}</option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name='description' onChange={this.changeHandler} value={this.state.description || ''} rows="3" />
                    </Form.Group> */}

                    <Form.Group>
                        <Form.Control onChange={this.changeFileHandler} type="file"  accept="image/*" name='image' />
                    </Form.Group>

                    <img className="preview-image" src={this.state.imgPreviewSrc} alt="placeholder image goes here" />
                    <span className="validation-error">{this.state.imageFileError}</span>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button className="btn-edit" type="submit">
                            {this.state.isEdit ? "Save" : "Create"}
                        </Button>
                        <Button className="btn-delete" onClick={this.closeModal}>
                            Cancel
                        </Button>
                    </div>

                </Form>
                <Spinner loading={this.state.loading}/>
            </>
        );
    }
}

const mapStateToProps=(state)=>{
  return {
      categories: state.categoryReducer.categories
  }
}

export default connect(mapStateToProps)(ImagePopup);