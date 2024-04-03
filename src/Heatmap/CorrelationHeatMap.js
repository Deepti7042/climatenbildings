import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './corrected_heatmap_data.json'; // Adjust the path as necessary

const Heatmap = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      // Assuming `data` is an array of objects where each object has `row`, `column`, and `value`
      // You might need to preprocess your JSON data to fit this format

      const margin = {top: 80, right: 25, bottom: 30, left: 200},
            width = 1550 - margin.left - margin.right,
            height = 950 - margin.top - margin.bottom;

      // Clear the existing SVG
      d3.select(d3Container.current).select('svg').remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Extract row and column names
      const myGroups = Array.from(new Set(data.map(d => d.row)));
      const myVars = Array.from(new Set(data.map(d => d.column)));

      const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);

      svg.append('g')
        .style('font-size', 15)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select('.domain').remove();

      const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);

      svg.append('g')
        .style('font-size', 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select('.domain').remove();

      const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1, 100]); // Adjust according to your data range

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
        .style('fill', d => myColor(d.value))
        .style('stroke-width', 4)
        .style('stroke', 'none')
        .style('opacity', 0.8);
        // Add tooltip functionality as needed
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div id="my_dataviz" ref={d3Container}></div>
  );
};

export default Heatmap;
