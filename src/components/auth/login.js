import React, { Component } from 'react';

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
        console.log("Change State", event);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("Submit Form", event);
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
