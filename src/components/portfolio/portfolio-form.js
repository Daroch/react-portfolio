import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            url: "",
            category: "eCommerce",
            position: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        }

        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig =this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
    }

    componentConfig() {
        return {
          iconFiletypes: [".jpg", ".png"],
          showFiletypeIcon: true,
          postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }
    
    handlerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        //console.log("Submit event", event);
        axios.post("https://daroch314.devcamp.space/portfolio/portfolio_items",
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
            console.log("Form submitted", response);
        }).catch(error => {
            console.log("error on Portfolio Submit Form", error);
        })
        event.preventDefault();
    }

    buildForm() {
        let formData = new FormData();
      
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);

        return formData;
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                        type="text"
                        name="name"
                        placeholder="Project Name"
                        value={this.state.name}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="url"
                        placeholder="Project Url"
                        value={this.state.url}
                        onChange={this.handlerChange}
                        />
                    </div>
                    <div>
                        <select
                        name="category"
                        value={this.state.category}
                        onChange={this.handlerChange}
                        >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handlerChange}
                        />
                    </div>
                    <div>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Project Description"
                        value={this.state.description}
                        onChange={this.handlerChange}
                        />
                    </div>
                    <div className="image-ploader">
                        <DropzoneComponent
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        >
                            
                        </DropzoneComponent>
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}
