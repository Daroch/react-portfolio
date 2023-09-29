import React, { Component } from 'react';
import axios from 'axios';

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {}
        }
    }

    getBlogItem() {
        axios.get(`https://daroch314.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
        ).then(response => {
            console.log('getBlogItem', response);
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        }).catch(error => {
            console.log('Error   getBlogItem', error);
        });
    }

    componentDidMount() {
        this.getBlogItem();
    }

    render() {
        const {id, title, content, featured_image_url, blog_status} = this.state.blogItem;
        return (
            <div className='blog-container-wrapper'>
                <div className='blog-content-wrapper'>
                    <h1>{title}</h1>
                    <div className='featured-image'>
                        <img src={featured_image_url} />
                    </div>
                    <div className='content'>
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}
