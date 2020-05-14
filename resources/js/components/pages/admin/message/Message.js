import React, { Component } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Axios from 'axios';
import CustomToast from '../../../../Utils/CustomToast';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';



class Message extends Component {

    constructor(){
        super();
        this.state={
            messages: []
        }
    }

    componentDidMount(){
        Axios.get('api/messages')
        .then(res=>{
            this.setState({messages: res.data});
        })
    }

    deleteMessage(message){
        Axios.delete('api/messages/'+message.id)
        .then(res=>{
            const messages = this.state.messages.filter(item=> item.id != message.id);
            this.setState({messages: messages});
            CustomToast.success("Successfully deleted");
        })
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
                Cell: (props)=>{
                    let message = props.original;
                    return (
                        <div style={{padding:"6px"}}>
                            <p>Name: {message.fname+" "+ (message.lname==null?"":message.lname)}</p>
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
                            <IconButton size="small" className="btn-delete" onClick={this.deleteMessage.bind(this, props.original)} aria-label="delete">
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
            </>
        );
    }
}

export default Message;