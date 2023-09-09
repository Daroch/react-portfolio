import React, { Component } from 'react';
import moment from "moment/moment";

import NavigationContainer from './navigation/navigation-container';
import PortfolioDetails from './portfolio/portfolio-details';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/home';
import Blog from './pages/blog';
import Contact from './pages/contact';
import About from './pages/about';
import NoMatch from './pages/no-match';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Daroch React Portfolio</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div><Router>
          <div>
            <NavigationContainer />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              <Route exact path="/portfolio/:slug" component={PortfolioDetails} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
