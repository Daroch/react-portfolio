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
            logo: "",
            editMode: false,
            apiUrl: "https://daroch314.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        }

        this.handlerChange = this.handlerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig =this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();

    }

    handleDeleteImage(imageType) {
        //console.log("Handle delete image", Imagetype);
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
            //console.log('deleteImage', response);
            this.setState({
                [`${imageType}_url`]: ""
            });
        }).catch(error => {
            console.log('deleteImage error', error);
        });
    }

    componentConfig() {
        return {
          iconFiletypes: [".jpg", ".png"],
          showFiletypeIcon: true,
          postUrl: "https://httpbin.org/post"
        };
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
          const {
            id,
            name,
            description,
            category,
            position,
            url,
            thumb_image_url,
            banner_image_url,
            logo_url
          } = this.props.portfolioToEdit;
    
          this.props.clearPortfolioToEdit();
    
          this.setState({
            id: id,
            name: name || "",
            description: description || "",
            category: category || "eCommerce",
            position: position || "",
            url: url || "",
            thumb_image_url: thumb_image_url || "",
            banner_image_url: banner_image_url || "",
            logo_url: logo_url || "",
            editMode: true,
            apiUrl: `https://daroch314.devcamp.space/portfolio/portfolio_items/${id}`,
            apiAction: "patch"
          });
        }
      }

    handleThumbDrop(){
        return {
            addedfile: file => this.setState({thumb_image: file})
        };
    }
    handleBannerDrop(){
        return {
            addedfile: file => this.setState({banner_image: file})
        };
    }
    handleLogoDrop(){
        return {
            addedfile: file => this.setState({logo: file})
        };
    }

    handlerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        //console.log("Submit event", event);
        //axios.post("https://daroch314.devcamp.space/portfolio/portfolio_items",
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
        .then(response => {
            if(this.state.editMode){
                this.props.handleEditFormSubmission();
            }else{
                this.props.handleNewFormSubmission(response.data.portfolio_item);
            }
            //console.log("Form submitted", response);
            [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                ref.current.dropzone.removeAllFiles();

            });


            this.setState({
                name: "",
                description: "",
                url: "",
                category: "eCommerce",
                position: "",
                thumb_image: "",
                banner_image: "",
                logo: "",
                editMode: false,
                apiUrl: "https://daroch314.devcamp.space/portfolio/portfolio_items",
                apiAction: "post"
            });
        })
        .catch(error => {
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
        if( this.state.thumb_image){
        formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
        if( this.state.banner_image){
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        if( this.state.logo){
            formData.append("portfolio_item[logo]", this.state.logo);
        }
        return formData;
      }

    render() {
        return (
                <form onSubmit={this.handleSubmit} className='portfolio-form-wrapper'>
                    <div className='two-column'>
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
                    <div className='two-column'>
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handlerChange}
                        />
                        <select
                        name="category"
                        value={this.state.category}
                        onChange={this.handlerChange}
                        className='select-element'
                        >
                            <option value="eCommerce">eCommerce</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>
                    <div className='one-column'>
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Project Description"
                        value={this.state.description}
                        onChange={this.handlerChange}
                        />
                    </div>
                    <div className="image-uploaders three-column">
                        {(this.state.editMode && this.state.thumb_image_url) 
                        ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.thumb_image_url} />
                            <div className="image-removal-link">
                                <a onClick={() => this.handleDeleteImage("thumb_image")}>
                                Remove image
                                </a>
                            </div>
                        </div>) 
                        : ( 
                        <DropzoneComponent
                        ref={this.thumbRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleThumbDrop()}
                        >
                            <div className='dz-message'>Thumbnail</div>
                        </DropzoneComponent>
                        )}

                        {(this.state.editMode && this.state.banner_image_url) 
                        ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.banner_image_url} />
                            <div className="image-removal-link">
                                <a onClick={() => this.handleDeleteImage("banner_image")}>
                                Remove image
                                </a>
                            </div>
                        </div>) 
                        : ( <DropzoneComponent
                        ref={this.bannerRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleBannerDrop()}
                        >
                            <div className='dz-message'>Banner</div>
                        </DropzoneComponent>
                        )}

                        {(this.state.editMode && this.state.logo_url)
                        ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.logo_url} />
                            <div className="image-removal-link">
                                <a onClick={() => this.handleDeleteImage("logo")}>
                                Remove image
                                </a>
                            </div>
                        </div>) 
                        : ( 
                        <DropzoneComponent
                        ref={this.logoRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleLogoDrop()}
                        >
                            <div className='dz-message'>Logo</div>
                        </DropzoneComponent>
                        )}
                    </div>
                    <div>
                        <button className='btn' type='submit'>Save</button>
                    </div>
                </form>
        );
    }
}
