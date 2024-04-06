import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatmapCorrelationData = ({ data }) => { // Ensure `data` is passed as a prop
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = {top: 80, right: 25, bottom: 100, left: 200},
            width = 800 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;

      // Clear the existing SVG
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const myGroups = Array.from(new Set(data.map(d => d.row)));
      const myVars = Array.from(new Set(data.map(d => d.column)));

      const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);

      svg.append('g')
        .style('font-size', 12)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);

      svg.append('g')
        .style('font-size', 12)
        .call(d3.axisLeft(y).tickSize(0));

      const colorScale = d3.scaleLinear()
        .domain([-1, 1])
        .range(["blue", "red", "green"]);;

      const tooltip = d3.select(d3Container.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("min-width", "200px") // Set minimum width of the tooltip box
      .style("white-space", "nowrap");

      svg.selectAll()
        .data(data, d => d.row + ':' + d.column)
        .enter()
        .append('rect')
        .attr('x', d => x(d.row))
        .attr('y', d => y(d.column))
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', d => colorScale(d.value))
        .style('stroke-width', 4)
        .style('stroke', 'none')
        .style('opacity', 0.8)
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1);
              tooltip
              .style("opacity", 1)
              .html("Row: " + d.row + "<br>Column: " + d.column + "<br>Value: " + d.value)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY + 10) + "px");
          })
          .on("mousemove", function(event, d) {
            tooltip.style("left", (event.pageX + 10) + "px")
                   .style("top", (event.pageY - 15) + "px");
          })
          .on("mouseleave", function() {
            tooltip.style("opacity", 0);
          });     
    }
  }, [data]); // Rerender the component every time the data changes

  return <div id="my_dataviz" ref={d3Container}></div>;
};

export default HeatmapCorrelationData;
