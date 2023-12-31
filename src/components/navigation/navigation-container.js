import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {NavLink} from 'react-router-dom';

const NavigationContainer = (props) =>{
    const dinamycLink = (route,Linktext) => {
        return(
            <div className="nav-link-wrapper">
                <NavLink to={route} activeClassName="nav-link-active">{Linktext}</NavLink>
            </div>
        )
    }

    const handleSignOut = () => {
        axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response => {
            if (response.status === 200){
                props.history.push("/");
                props.handleSuccesfulLogout();
            }
            return response.data;
        }).catch(error => {
            console.log("Error User SignOut", error);
        })
    }
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
                
                {props.loggedInStatus === "LOGGED_IN" ? dinamycLink("/portfolio-manager","Portfolio Manager") : null}
                <div className="nav-link-wrapper">
                    {false ? <NavLink to="/add_post" activeClassName="nav-link-active">Add Post</NavLink> : null}
                </div>
            </div>
            <div className="right-side">
                <div>Daroch</div>
                <div>
                    {props.loggedInStatus === "LOGGED_IN" ? <a onClick={handleSignOut}>
                    <FontAwesomeIcon icon="sign-out-alt" />
                    </a> : null}
                </div>
            </div>

        </div>
    );
}
export default withRouter(NavigationContainer);
