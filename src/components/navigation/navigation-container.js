import React from 'react';
import {NavLink} from 'react-router-dom';

const NavigationContainer = (props) =>{
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/about" activeClassName="nav-link-active">About</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        {false ? <NavLink to="/add_post" activeClassName="nav-link-active">Add Post</NavLink> : null}
                    </div>
                </div>
                <div className="right-side">
                    Daroch
                </div>

            </div>
        );
    }
    export default NavigationContainer;
