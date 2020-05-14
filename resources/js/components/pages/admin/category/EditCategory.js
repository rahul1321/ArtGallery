import React, { Component } from 'react';
import { Form, Button} from 'react-bootstrap';
import Axios from 'axios';
import CustomToast from '../../../../Utils/CustomToast';
import { connect } from 'react-redux';
import categoryAction from '../../../../redux/actions/categoryAction';
import Spinner from '../../../../Utils/Spinner';

class EditCategory extends Component {

    constructor(props) {
        super(props);

        let category = this.props.category;

        this.state = {
            isEdit: category != null,
            name: category != null ? category.name : '',
            category: category,
            nameError: "",
            loading: false,
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.saveCategory = this.saveCategory.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    saveCategory() {
        event.preventDefault();

        if (this.isValidFields()) {
            
            var category = {
                name: this.state.name
            }

            if (this.state.isEdit) {

                this.setState({loading:true}, ()=>{
                    Axios.put('api/categories/' + this.state.category.id, category)
                    .then(res => {
                        this.setState({loading:false});
                        this.editCategoryRow(res.data);
                        this.closeModal();
                        CustomToast.success("Successfully updated");
                    });
                });                
            }
            else {
                this.setState({loading:true}, ()=>{
                    Axios.post('api/categories', category)
                    .then(res => {
                        this.setState({loading:false});
                        this.addCategoryRow(res.data);
                        this.closeModal();
                        CustomToast.success("Successfully added");
                    });
                });
            }
        }
    }

    addCategoryRow(category) {
        const data = [...this.props.categories,category];
        this.props.setCategories(data);
    }

    editCategoryRow(category) {
        var data = [...this.props.categories];
        var index = data.findIndex(obj => obj.id === category.id);
        data[index] = category;

        this.props.setCategories(data);
    }

    isValidFields() {
        this.clearErrorMsg();
        let isValid = true;
        if (this.state.name.trim() == "") {
            this.setState({ nameError: "*Category name should not be empty" });
            isValid = false;
        }

        return isValid;
    }

    clearErrorMsg(){
        this.setState({ nameError: "" });
    }

    closeModal() {
        this.props.onClose();
    }

    render() {
        return (
            <>
                <Form onSubmit={this.saveCategory}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control onChange={this.changeHandler} type="text" name='name' value={this.state.name || ''} placeholder="Enter name" />
                        <span className="validation-error">{this.state.nameError}</span>
                    </Form.Group>

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

const mapStateToProps = (state) => {
    console.log("mapStateToProps editCategory");
    return {
        categories: state.categoryReducer.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps editCategory");
    return {
        setCategories: (categories)=> {
            dispatch(categoryAction.setCategories(categories))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCategory);