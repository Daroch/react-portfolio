import React, { Component } from 'react';
import axios from 'axios';

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
        //console.log("SubmitForm", event);
        axios.post("https://daroch314.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);
            this.setState({
                title: "",
                content: "",
                blog_status: "draft",
                featured_image: ""
            });
        }).catch(error => {
            console.log("HnadleFormSubmit Error", error)
        });
        event.preventDefault();
    }
    
    buildForm() {
        let formData = new FormData();
      
        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);
      
        return formData;
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
                name="blog_status"
                type="text"
                value={this.state.blog_status}
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
