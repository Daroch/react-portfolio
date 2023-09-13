import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class NavigationContainer  extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav_link_active">Home</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/about" activeClassName="nav_link_active">About</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/contact" activeClassName="nav_link_active">Contact</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/blog" activeClassName="nav_link_active">Blog</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        {false ? <NavLink to="/add_post" activeClassName="nav_link_active">Add Post</NavLink> : null}
                    </div>
                </div>
                <div className="right-side">
                    Daroch
                </div>

            </div>
        );
    }
}
