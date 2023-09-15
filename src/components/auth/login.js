import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("Handle Change", event);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("Handle Submit", this.state.email, this.state.password);
        axios.post(
            "https://api.devcamp.space/sessions",
            {
                client: {
                    email: this.state.email,
                    password: this.state.password
                }
            },
            {withCredentials: true}
        )
        .then(response => {
            console.log("response",response);
        })
        .catch(error =>{
            console.log("error", error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Login to Access DashBoard</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Your email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    />
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="Your password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                    />
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
