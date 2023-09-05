import React, { Component } from "react";

import portfolioItem from "./portfolio-item";
import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor(){
        super();
        console.log("Portfolio Container is rendered");
    }
    render() {
        return (
            <div>
                <h2>Portfolio items go here...</h2>
                <PortfolioItem />
            </div>
        );
    }
}
