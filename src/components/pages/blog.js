import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
        blogItems: [],
        currentPage: 0,
        totalCount: 0,
        isLoading: true
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.activateInfiniteScroll();

  }

  activateInfiniteScroll() {
    window.onscroll = c() => {
      console.log("window.innerHeight", window.innerHeight);
      console.log("document.doumentElement.scrollTop", document.documentElement.scrollTop);
      console.log("document.documentElement.offsetHeight", document.documentElement.offsetHeight);
      if(this.state.isLoading || this.state.blogItems.lenght === this.state.totalCount){
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight-1
      ) {
        console.log("get more posts");
        this.getBlogItems();
      }
    };
  
  }

  getBlogItems() {
    //debugger;
    this.setState({
      currentPage: this.state.currentPage + 1
    })
    
    axios.get(`https://daroch314.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
    {withCredentials: true}
    ).then(response => {
        console.log('GetBlogItems', response);
        this.setState({
            blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
            totalCount: response.data.meta.total_records,
            isLoading: false
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
        {this.state.isLoading ? 
        (<div className="content-loader">
          <FontAwesomeIcon icon="spinner" spin />
        </div>)
        : null}
      </div>
    );
  }
}

export default Blog;
