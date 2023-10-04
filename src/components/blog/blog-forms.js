import React, { Component } from 'react';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            blog_status: "draft",
            featured_image: ""
        }

        this.handleChangeBlogForm = this.handleChangeBlogForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleChangeBlogForm(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        //console.log("handleChangeBlogForm", event);
    }

    handleFormSubmit(event) {
        console.log("SubmitForm", event);
        this.props.handleSuccessfulFormSubmission(this.state);
        event.preventDefault();
    }
    
    render() {
        return (
            <form className="form-wrapper" onSubmit={this.handleFormSubmit}>
                <input 
                name="title"
                type="text"
                placeholder="Title of your post"
                value={this.state.title}
                onChange={this.handleChangeBlogForm} />
                <input 
                name="content"
                type="textarea"
                placeholder="Content of your post"
                value={this.state.content}
                onChange={this.handleChangeBlogForm} />

                <button type='submit'>Save</button>
            </form>
        );
    }
}
