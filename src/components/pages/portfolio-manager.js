import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {
    constructor() {
        super();
        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        };

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
        this.handleSubmissionError = this.handleSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this)
;    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleSuccessfulFormSubmission(portfolioItem) {
        this.setState({
          portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
      }

    handleSubmissionError(error) {
        console.log('handleSubmissionError', error);
    }

    handleDeleteClick(portfolioItem) {
        console.log('handleDeleteClick',portfolioItem);
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
        { withCredentials: true }
        )
        .then(response => {
            // handle success
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })
        })
        .catch(error => {
            // handle error
            console.log("Error deleting item", error);
        });
    }

    handleEditClick(portfolioItem) {
        console.log('handleUpdatelick',portfolioItem);
        //populate the form
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleSuccessfulDelete(portfolioItem) {
        this.setState({
          portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
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
                    handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                    handleSubmissionError={this.handleSubmissionError}
                    clearPortfolioToEdit={this.clearPortfolioToEdit}
                    portfolioToEdit={this.state.portfolioToEdit}
                    /></h1>
                </div>
                <div className='rightside'>
                <PortfolioSidebarList 
                data={this.state.portfolioItems}
                handleDeleteClick={this.handleDeleteClick}
                handleEditClick={this.handleEditClick}/>
                </div>
            </div>  
        );
    }
}
