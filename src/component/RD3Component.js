import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear, scaleTime, scaleBand } from 'd3';

class RD3Component extends Component {
    constructor() {
        super();
        this.state = {
            dataset: {}
        }
    }

    loadData = () => {
        d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
            .then(data => {
                this.setState({
                    dataset: data.data
                });
                this.drawChart(this.state.dataset);
            });
    }

    componentDidMount() {
        this.loadData();
    }

    drawChart = (data) => {
        const width = 900;
        const height = 600;
        const margin = { top: 100, left: 15, bottom: 20, right: 150 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

        const tooltip = svg
            .append("text")
            .attr("id", "tooltip")
            .attr("opacity", 0)
            .attr("width", 50)
            .attr("height", 50);

        svg.append("text")
            .attr("id", "title")
            .attr("transform", "translate(100,0)")
            .attr("x", innerWidth / 2 - margin.right)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("United States GDP")

        const xScale = scaleTime()
            .domain([d3.min(data, (d) => {
                return new Date(d[0]);
            }), d3.max(data, (d) => {
                return new Date(d[0]);
            })])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d[1])])
            .range([innerHeight, 0]);

        const g = svg.append("g")
            .attr("transform", "translate(100, " + 10 + ")");

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")).ticks(20);

        g.append("g")
            .attr("id", "x-axis")
            .call(xAxis)
            .attr("transform", "translate(0," + (innerHeight) + ")")
            .append("text")
            .attr("x", innerWidth)
            .attr("dy", "4.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Date");

        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(",d"));

        g.append("g")
            .attr("id", "y-axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Gross Domestic Product");

        const barWidth = innerWidth / data.length - 1;


        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("data-date", (d, i) => { return d[0] })
            .attr("data-gdp", (d, i) => { return d[1] })
            .attr("y", (d) => yScale(d[1]))
            .attr("x", (d, i) => i * (barWidth + 1))
            .attr("width", barWidth + 1)
            .attr("height", (d) => innerHeight - yScale(d[1]))
            .attr("class", "bar")
            .on('mouseover', (d, i) => {
                tooltip
                    .attr("opacity", .9)
                    .attr("x", i * (barWidth) + margin.left)
                    .attr("y", innerHeight - 2 * margin.top - 40)
                    .html(d[0] + "\n$" + d[1]);
            });
    }
    render() {
        return (
            <div>
                <svg></svg>
            </div>
        )
    }
}

export default RD3Component;