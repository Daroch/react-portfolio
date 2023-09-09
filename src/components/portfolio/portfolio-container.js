import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";
import axios from 'axios';


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
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
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

    getPortfolioItems(){
        axios.get('https://daroch.devcamp.space/portfolio/portfolio_items')
            .then(response => {
            // handle success
            console.log(response);
            })
            .catch(error => {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
        });
    }
        
        render() {
        this.getPortfolioItems();
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
