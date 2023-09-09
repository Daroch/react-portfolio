import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";


export default class PortfolioContainer extends Component {
    constructor(){
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isloading: false,
            data: [
            { title: "Quip", category: "eCommerce", slug: "quip" },
            { title: "Eventbrite", category: "Scheduling", slug: "eventbrite" },
            { title: "Ministry Safe", category: "Enterprise", slug: "ministrysafe" },
            { title: "SwingAway", category: "eCommerce", slug: "swingaway" }
            ]
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({
          data: this.state.data.filter(item => {
            return item.category === filter;
          })
        });
    }

    portfolioItems() {
        return this.state.data.map(item => {
          return <PortfolioItem key={item.slug} title={item.title} slug={item.slug} url={"google.com"} />;
        });
    }

    render() {
        if(this.state.isloading){
            return <div>Loading....</div>;
        }
        return (
        <div>
            <h2>{this.state.pageTitle}</h2>

            <button onClick={() => this.handleFilter("eCommerce")}>
            eCommerce
            </button>
            <button onClick={() => this.handleFilter("Scheduling")}>
            Scheduling
            </button>
            <button onClick={() => this.handleFilter("Enterprise")}>
            Enterprise
            </button>

            {this.portfolioItems()}
        </div>
        );
    }
}
