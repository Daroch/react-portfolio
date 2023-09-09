import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class NavigationContainer  extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                {false ? <NavLink to="/add_post">Add Post</NavLink> : null}
            </div>
        );
    }
}
