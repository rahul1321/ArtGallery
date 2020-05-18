import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/ControlPoint';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ImagePopup from './ImagePopup';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';
import CustomModal from '../../../../Utils/CustomModal';
import CustomToast from '../../../../Utils/CustomToast';
import Spinner from '../../../../Utils/Spinner';
import ConfirmDialog from '../../../../Utils/ConfirmDialog';
import hmacSHA512 from 'crypto-js/hmac-sha512';

class Image extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            open: false,
            title: '',
            content: '',
            loading: false,
            openConfirmDialog: false,
            deletedImage: null
        }

        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount() {
        Axios.get('/api/images')
            .then(res => {
                if (res.data.success)
                    this.setState({ images: res.data.images });
                else
                    this.setState({ images: [] });
            });
    }


    editImageRow(image) {
        var data = [...this.state.images];
        var index = data.findIndex(obj => obj.id === image.id);
        data[index] = image;
        this.setState({ images: data });
    }

    addImageRow(image) {
        this.setState({
            images: [...this.state.images, image]
        });
    }

    openConfirmDialog(image) {
        this.setState({ deletedImage: image, openConfirmDialog: true });
    }

    deleteImage(image) {
        let deletedImage = this.state.deletedImage;
        if (deletedImage != null) {
            let headers = {
                'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
            }
            this.setState({ loading: true }, () => {
                Axios.delete('api/images/' + deletedImage.id, { headers: headers })
                    .then(res => {
                        this.setState({ loading: false });
                        if (res.data.success) {
                            const images = this.state.images.filter(item => item.id != deletedImage.id)
                            this.setState({ deletedImage: null, openConfirmDialog: false, images: images });
                            CustomToast.success("Successfully deleted");
                        } else
                            CustomToast.error(res.data.message);
                    })
                    .catch(error => {
                        this.setState({ loading: false });
                        CustomToast.error("Something went wrong");
                    })
            })
        } else {
            CustomToast.error("Image not found");
        }
    }

    openModal(image) {
        if (image != null) //Edit
            this.setState({ open: true, title: "Edit Image", content: <ImagePopup editImageRow={this.editImageRow.bind(this)} image={image} onClose={() => this.setState({ open: false })} /> });
        else
            this.setState({ open: true, title: "Create Image", content: <ImagePopup addImageRow={this.addImageRow.bind(this)} image={image} onClose={() => this.setState({ open: false })} /> });
    }


    render() {

        const columns = [
            {
                Header: 'Title',
                accessor: 'title',
                style: { textAlign: 'center' },
            },
            {
                Header: 'Category',
                accessor: 'name',
                width: 250,
                style: { textAlign: 'center' },
            },
            {
                Header: 'Image',
                accessor: 'image',
                width: 350,
                style: { textAlign: 'center' },
                Cell: (props) => {
                    var src = '/images/' + props.value;
                    return (
                        <a href={src} target='_blank'>
                            <img style={{ width: '75px', maxHeight: '55px' }} src={src} />
                        </a>

                    );
                },

            },
            /* {
                Header: 'Description',
                accessor: 'description',
                style: { textAlign: 'center' },
            }, */
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
        ];

        return (
            <>

                <div className="col-xs-12 col-md-12 col-sm-12 row align-items-center mb-1">
                    <div className="col-6 col-xl-5">
                        <h3>Images</h3>
                    </div>

                    <Button onClick={this.openModal.bind(this, null)} size="small" variant="contained" className="btn-edit" startIcon={<AddIcon />}>
                        Add Image
                    </Button>
                </div>

                <ReactTable
                    columns={columns}
                    data={this.state.images}
                    defaultPageSize={10}
                    noDataText={"No Images found"}
                />

                <CustomModal
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    title={this.state.title}
                    content={this.state.content}
                />

                <ConfirmDialog open={this.state.openConfirmDialog}
                    onClose={() => this.setState({ openConfirmDialog: false })}
                    deleteAction={this.deleteImage} />

                <Spinner loading={this.state.loading} />
            </>
        );
    }
}

export default Image;
