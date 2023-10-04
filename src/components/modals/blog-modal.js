import React, { Component } from 'react';
import ReactModal from 'react-modal';

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
                    <h1>I'm a Modal</h1>
                </ReactModal>
            </div>
        );
    }
}
