import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
        blogItems: []
    }

    this.getBlogItems = this.getBlogItems.bind(this)
;  }

  getBlogItems() {
    axios.get('https://daroch314.devcamp.space/portfolio/portfolio_blogs',
    {withCredentials: true}
    ).then(response => {
        //console.log('GetBlogItems', response);
        this.setState({
            blogItems: response.data.portfolio_blogs
        })
    }).catch(error => {
        console.log('Error getBlogItems', error);
    });
  }

  componentWillMount() {
    this.getBlogItems();
  }
  render() {
    return (
      <div>
        <div>
            <h2>List of post</h2>
        </div>
        <div>
          <Link to="/about">Read more about myself</Link>
        </div>
      </div>
    );
  }
}

export default Blog;
