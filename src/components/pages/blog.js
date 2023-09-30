import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BlogItem from "../blog/blog-item";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
        blogItems: [],
        currentPage: 0,
        totalRecords: 0
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.activateInfiniteScroll();

  }

  activateInfiniteScroll() {
    window.onscroll = () => {
      //console.log("window.innerHeight", window.innerHeight);
      //console.log("document.documentElement.scrollTop", document.documentElement.scrollTop);
      //console.log("document.documentElement.offsetHeight", document.documentElement.offsetHeight);
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight-1
      ) {
        console.log("get more posts");
      }
    };
  
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    })
    axios.get('https://daroch314.devcamp.space/portfolio/portfolio_blogs',
    {withCredentials: true}
    ).then(response => {
      this.setState({
        totalRecords: response.data.meta.total_records
      })
        console.log('GetBlogItems', response);
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
    
    const blogRecords = this.state.blogItems.map(item => {
        return <BlogItem key={item.id} item={item} />
    });

    return (
      <div className='blog-container-wrapper'>
        <div className='blog-content-wrapper'>
          {blogRecords}
        </div>
      </div>
    );
  }
}

export default Blog;
