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
    }
    
    getPortfolioItems(){
        axios.get('https://daroch314.devcamp.space/portfolio/portfolio_items')
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
                    <h1><PortfolioForm /></h1>
                </div>
                <div className='rightside'>
                <PortfolioSidebarList data={this.state.portfolioItems}/>
                </div>
            </div>  
        );
    }
}
