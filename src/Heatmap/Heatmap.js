import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import filteredData from './filtered_heatmap_data.json'; // Ensure the path is correct

const HeatmapCorrelationData = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (filteredData && d3Container.current) {
      const margin = {top: 80, right: 25, bottom: 100, left: 200},
            width = 950 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;

      // Clear the existing SVG
      d3.select(d3Container.current).select('svg').remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Extract row and column names
      const myGroups = Array.from(new Set(filteredData.map(d => d.row)));
      const myVars = Array.from(new Set(filteredData.map(d => d.column)));

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

      const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1, 100]);

      svg.selectAll()
        .data(filteredData, d => d.row + ':' + d.column)
        .enter()
        .append('rect')
        .attr('x', d => x(d.row))
        .attr('y', d => y(d.column))
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', d => myColor(d.value))
        .style('stroke-width', 4)
        .style('stroke', 'none')
        .style('opacity', 0.8);
    }
  }, []); // Dependency array is empty, so this effect runs only once

  return (
    <div id="my_dataviz" ref={d3Container}></div>
  );
};

export default HeatmapCorrelationData;
