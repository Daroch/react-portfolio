import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor(){
        super();
        console.log("Portfolio Container is rendered");
    }
    portfolioItems(){
        const data=["Frodo","Gandalf","Legolas","Aragorn"];
        return data.map(item => {
            return <PortfolioItem title={item}/>
        })
    }
    render() {
        return (
            <div>
                <h2>Portfolio items go here...</h2>
                {this.portfolioItems()}
            </div>
        );
    }
}
