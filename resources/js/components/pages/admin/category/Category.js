import React, { Component } from 'react';
import Axios from 'axios';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/ControlPoint';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditCategory from './EditCategory';
import { connect } from 'react-redux';
import categoryAction from '../../../../redux/actions/categoryAction';
import CustomModal from '../../../../Utils/CustomModal';
import CustomToast from '../../../../Utils/CustomToast';
import Spinner from '../../../../Utils/Spinner';
import ConfirmDialog from '../../../../Utils/ConfirmDialog';
import hmacSHA512 from 'crypto-js/hmac-sha512';

class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            title: '',
            content: '',
            loading: false,
            openConfirmDialog: false,
            deletedCategory: null
        }

        this.deleteCategory = this.deleteCategory.bind(this);
    }

    openModal(category) {
        if (category != null)
            this.setState({ open: true, title: "Edit Category", content: <EditCategory category={category} onClose={() => this.setState({ open: false })} /> });
        else
            this.setState({ open: true, title: "Create Category", content: <EditCategory category={category} onClose={() => this.setState({ open: false })} /> });
    }

    openConfirmDialog(category) {
        this.setState({deletedCategory:category , openConfirmDialog : true});
    }

    deleteCategory(){
        let deletedCategory = this.state.deletedCategory;
        if(deletedCategory != null){
            let headers = {
                'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
            }
            this.setState({loading: true},()=>{
                Axios.delete('api/categories/' + deletedCategory.id,{headers:headers})
                .then(res => {
                    this.setState({loading: false});
                    if(res.data.success){
                        const categories = this.props.categories.filter(item => item.id != deletedCategory.id)
                        this.props.setCategories(categories);
                        this.setState({deletedCategory:null , openConfirmDialog : false});
                        CustomToast.success("Successfully deleted");
                    }else
                        CustomToast.error(res.data.message);
                })
                .catch(error=>{
                    this.setState({loading: false});
                    CustomToast.error("Something went wrong");
                })
            })
        }else{
            CustomToast.error("Category not found");
        }
    }


    render() {
        const columns = [
            {
                Header: 'Create Date',
                accessor: 'created_at',
                width: 300,
                Cell: (props) => {
                    return props.value.split('T')[0];
                },
                style: { textAlign: 'center' },
            },
            {
                Header: 'Name',
                accessor: 'name',
                width: 500,
                style: { textAlign: 'center' },
            },
            {
                Header: "",
                Cell: (props) => {
                    return (
                        <>
                            <IconButton size="small" className="btn-edit" onClick={this.openModal.bind(this, props.original)} aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton size="small" className="btn-delete" onClick={this.openConfirmDialog.bind(this, props.original)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    );
                },
                sortable: false
            }
        ]

        return (
            <>
                <div className="col-xs-12 col-md-12 col-sm-12 row align-items-center mb-1">
                    <div className="col-6 col-xl-5">
                        <h3>Categories</h3>
                    </div>
                    
                    <Button onClick={this.openModal.bind(this, null)} size="small" variant="contained" className="btn-edit" startIcon={<AddIcon />}>
                        Add Category
                    </Button>
                </div>

                <ReactTable
                    columns={columns}
                    data={this.props.categories}
                    defaultPageSize={10}
                    noDataText={"No categories found"}
                />

                <CustomModal
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    title={this.state.title}
                    content={this.state.content}
                />
                <ConfirmDialog open={this.state.openConfirmDialog}
                    onClose = {()=> this.setState({openConfirmDialog:false})} 
                    deleteAction = {this.deleteCategory}/>

                <Spinner loading={this.state.loading}/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCategories : (categories)=> {
            dispatch(categoryAction.setCategories(categories))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);