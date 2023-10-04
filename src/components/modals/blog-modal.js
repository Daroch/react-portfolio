import React, { Component } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(".app-wrapper");
import BlogForm from '../blog/blog-forms';

export default class BlogModal extends Component {
    constructor(props){
        super(props);

        this.customStyles = {
            content: {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.60)"
            }
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    }
    
    handleSuccessfulFormSubmission(blog) {
        //console.log("handleSuccessfulFormSubmission", blog);
        this.props.handleSuccessfulNewBlogSubmission(blog);
    }
    render() {
        return (
            <div>
                <ReactModal
                style={this.customStyles} 
                isOpen={this.props.modalIsOpen} 
                onRequestClose={() => {
                    this.props.handleModalClose()
                    }}>
                    <BlogForm handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                    handleModalClose={this.props.handleModalClose} />
                </ReactModal>
            </div>
        );
    }
}
