import React, { Component } from "react";
import { Link } from "react-router-dom";

class Blog extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
            List of post
        </div>
        <div>
          <Link to="/about">Read more about myself</Link>
        </div>
      </div>
    );
  }
}

export default Blog;
