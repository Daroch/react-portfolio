import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import { Library, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSignOutAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import NavigationContainer from './navigation/navigation-container';
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetails from './portfolio/portfolio-details';
import Auth from './pages/auth';


import Home from './pages/home';
import Blog from './pages/blog';
import Contact from './pages/contact';
import About from './pages/about';
import NoMatch from './pages/no-match';

library.add(faTrash, faSignOutAlt, faEdit);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnsuccesfulLogin = this.handleUnsuccesfulLogin.bind(this);
    this.handleSuccesfulLogout = this.handleSuccesfulLogout.bind(this);
  }

  handleSuccesfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccesfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccesfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    })
    .then(response =>{
      console.log("logged in return", response);
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;
      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        console.log("You are logged");
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (loggedIn === false){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages(){
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ]
  }
  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer 
            loggedInStatus={this.state.loggedInStatus} 
            handleSuccesfulLogout={this.handleSuccesfulLogout}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              { this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route exact path="/portfolio/:slug" component={PortfolioDetails} />
              <Route 
                path="/auth" 
                render={props => (
                  <Auth 
                    {...props} 
                    handleSuccesfulLogin={this.handleSuccesfulLogin} 
                    handleUnsuccesfulLogin={this.handleUnsuccesfulLogin}
                    />
                )
              } />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
