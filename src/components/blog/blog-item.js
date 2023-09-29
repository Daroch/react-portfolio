import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = props => {

    const {id, title, content, blog_status, featured_image} = props.item;
    return (
        <div>
            <Link to={`/blog/${id}` } >
                <h1>{title}</h1>
            </Link>
            <div>{content}</div>
            
        </div>
    );
}

export default BlogItem;
