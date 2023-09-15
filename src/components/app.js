import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import NavigationContainer from './navigation/navigation-container';
import PortfolioDetails from './portfolio/portfolio-details';
import Auth from './pages/auth';


import Home from './pages/home';
import Blog from './pages/blog';
import Contact from './pages/contact';
import About from './pages/about';
import NoMatch from './pages/no-match';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
    this.handleSuccesfulLogin = this.handleSuccesfulLogin.bind(this);
    this.handleUnSuccesfulLogin = this.handleUnSuccesfulLogin.bind(this);
  }

  handleSuccesfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccesfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              <Route exact path="/portfolio/:slug" component={PortfolioDetails} />
              <Route 
                path="/auth" 
                render={props => (
                  <Auth 
                    {...props} 
                    handleSuccesfulLogin={this.handleSuccesfulLogin} 
                    handleUnSuccesfulLogin={this.handleUnSuccesfulLogin}
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
