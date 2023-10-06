import React, { Component } from 'react';
import axios from 'axios';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            content: "",
            blog_status: "draft",
            featured_image: "",
            editMode: false,
            apiUrl: "https://daroch314.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
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
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        }).then(response => {
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
            <form className="blog-form-wrapper" onSubmit={this.handleFormSubmit}>
                <div className='two-column'>
                    <input 
                name="title"
                type="text"
                placeholder="Blog title"
                value={this.state.title}
                onChange={this.handleChangeBlogForm} />
                <select 
                className='select-element'
                name="blog_status"
                value={this.state.blog_status}
                onChange={this.handleChangeBlogForm}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                </div>
                <div className='two-column'><input 
                name="content"
                type="textarea"
                placeholder="Blog description"
                value={this.state.content}
                onChange={this.handleChangeBlogForm} />
                </div>
                <button className='btn' type='submit'>Save</button>

            </form>
        );
    }
}
