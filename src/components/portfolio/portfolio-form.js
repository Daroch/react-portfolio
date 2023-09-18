import React, { Component } from 'react';

export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            url: "",
            category: "",
            position: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        }

        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div>
                <form>
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
                        name="description"
                        placeholder="Project Description"
                        value={this.state.description}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="url"
                        placeholder="Project Url"
                        value={this.state.url}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={this.state.category}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="thumb_image"
                        placeholder="Image Url"
                        value={this.state.thumb_image}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="banner_image"
                        placeholder="Banner"
                        value={this.state.banner_image}
                        onChange={this.handlerChange}
                        />
                        <input
                        type="text"
                        name="logo"
                        placeholder="Logo"
                        value={this.state.logo}
                        onChange={this.handlerChange}
                        />
                    </div>
                    <div><button type='submit'>Save</button></div>
                </form>
            </div>
        );
    }
}
