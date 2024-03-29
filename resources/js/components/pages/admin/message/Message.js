import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';
import CustomToast from '../../../../Utils/CustomToast';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Spinner from '../../../../Utils/Spinner';
import ConfirmDialog from '../../../../Utils/ConfirmDialog';
import hmacSHA512 from 'crypto-js/hmac-sha512';

class Message extends Component {

    constructor() {
        super();
        this.state = {
            messages: [],
            loading: false,
            openConfirmDialog: false,
            deletedMessage: null
        }

        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount() {
        let headers = { 
            'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
        }
        Axios.get('api/messages',{headers:headers})
            .then(res => {
                if(res.data.success)
                    this.setState({ messages: res.data.messages });
                else
                    this.setState({ messages: [] });
            })
    }

    openConfirmDialog(message) {
        this.setState({ deletedMessage: message, openConfirmDialog: true });
    }

    deleteMessage(message) {

        let deletedMessage = this.state.deletedMessage;
        if (deletedMessage != null) {
            let headers = { 
                'Authorization': localStorage.getItem(hmacSHA512('admin', 'k').toString())
            }
            this.setState({ loading: true }, () => {
                Axios.delete('api/messages/' + deletedMessage.id,{headers:headers})
                    .then(res => {
                        this.setState({ loading: false });
                        if (res.data.success) {
                            const messages = this.state.messages.filter(item => item.id != deletedMessage.id);
                            this.setState({deletedMessage:null , openConfirmDialog : false,  messages: messages });
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
            CustomToast.error("Message not found");
        }
    }


    render() {

        const columns = [
            {
                Header: 'Email',
                accessor: 'email',
                width: 250,
                style: { textAlign: 'center' },
            },
            {
                Header: 'Message',
                width: 650,
                Cell: (props) => {
                    let message = props.original;
                    return (
                        <div style={{ padding: "6px" }}>
                            <p>Name: {message.fname + " " + (message.lname == null ? "" : message.lname)}</p>
                            <p>Subject: {message.subject}</p>
                            <p>Message: {message.message}</p>
                        </div>
                    )
                }
            },
            {
                Header: "",
                Cell: (props) => {
                    return (
                        <>
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
                        <h3>Messages</h3>
                    </div>
                </div>
                <ReactTable
                    columns={columns}
                    data={this.state.messages}
                    defaultPageSize={10}
                    noDataText={"No messages found"}
                />
                <ConfirmDialog open={this.state.openConfirmDialog}
                    onClose={() => this.setState({ openConfirmDialog: false })}
                    deleteAction={this.deleteMessage} />

                <Spinner loading={this.state.loading} />
            </>
        );
    }
}

export default Message;