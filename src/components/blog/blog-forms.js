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
    }

    handleChangeBlogForm(event) {
        console.log("handleChangeBlogForm", event);
    }
    render() {
        return (
            <form>
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

                <button>Save</button>
            </form>
        );
    }
}
