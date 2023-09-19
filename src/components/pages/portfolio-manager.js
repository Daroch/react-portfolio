import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();
        this.state = {
            portfolioItems: []
        };

        this.handleSuccesfulFormSubmission = this.handleSuccesfulFormSubmission.bind(this);
        this.handleSubmissionError = this.handleSubmissionError.bind(this);
    }

    handleSuccessfulFormSubmission(portfolioItem) {
        this.setState({
          portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
      }

    handleSubmissionError(error) {
        console.log('handleSubmissionError', error);
    }

    getPortfolioItems(){
        axios.get('https://daroch314.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc')
            .then(response => {
                // handle success
                console.log(response);
                this.setState({
                        portfolioItems: [...response.data.portfolio_items]
                })
            })
            .catch(error => {
                // handle error
                console.log("Error with getPortfolioItems", error);
            })
            .finally(function () {
            // always executed
        });
    }

    componentDidMount(){
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='leftside'>
                    <h1><PortfolioForm 
                    handleSuccesfulFormSubmission={this.handleSuccesfulFormSubmission}
                    handleSubmissionError={this.handleSubmissionError}
                    /></h1>
                </div>
                <div className='rightside'>
                <PortfolioSidebarList data={this.state.portfolioItems}/>
                </div>
            </div>  
        );
    }
}
