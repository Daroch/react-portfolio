import React, { Component } from 'react';
import PortfolioContainer from '../portfolio/portfolio-container';

export default class PortfolioManager extends Component {
    render() {
        return (
            <div className='portfolio-manager-wrapper'>
                <div className='leftside'>
                    <h1>Portfolio Manager...</h1>
                </div>
                <div className='rightside'>
                <PortfolioContainer />
                </div>
            </div>  
        );
    }
}
