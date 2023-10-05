import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
        blogItems: [],
        currentPage: 0,
        totalCount: 0,
        isLoading: true,
        blogModalIsOpen: false
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll',this.onScroll,false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
  }

  handleSuccessfulNewBlogSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    })
  }
  
  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    });
  }

  handleModalClose() {
    //console.log("handlemodalclose");
    this.setState({
      blogModalIsOpen: false
    })
  }

 onScroll() {
    //console.log("window.innerHeight", window.innerHeight);
    //console.log("document.documentElement.scrollTop", document.documentElement.scrollTop);
    //console.log("document.documentElement.offsetHeight", document.documentElement.offsetHeight);
    if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount){
      return;
    }
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      console.log("get more posts");
      this.getBlogItems();
    }
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

  componentDidMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    
    const blogRecords = this.state.blogItems.map(item => {
        return <BlogItem key={item.id} item={item} />
    });

    return (
      <div className='blog-container-wrapper'>
        <div className="new-blog-link">
          <a onClick={this.handleNewBlogClick}>New Blog</a>
        </div>
        <BlogModal modalIsOpen={this.state.blogModalIsOpen}
        handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
        getBlogItems={this.getBlogItems}
        handleModalClose={this.handleModalClose}
        />
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
