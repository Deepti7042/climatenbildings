import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import data from './Canada_Temperature_Data.json'; // Assuming abc.json is in the same directory

const RadialStackedBarChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.results) return;

    const width = 600;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const keys = ['Tm', 'S', 'P'];
    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);

    const stack = d3.stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(data.results);

    const innerRadius = 50;
    const outerRadius = Math.min(width, height) / 2 - 40;

    const xScale = d3.scaleBand()
      .domain(data.results.map(d => d.Month))
      .range([0, 2 * Math.PI])
      .align(0);

    const yScale = d3.scaleRadial()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .range([innerRadius, outerRadius]);

    svg.append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', d => color(d.key))
      .selectAll('path')
      .data(d => d)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(d => yScale(d[0]))
        .outerRadius(d => yScale(d[1]))
        .startAngle(d => xScale(d.data.Month))
        .endAngle(d => xScale(d.data.Month) + xScale.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))
      .attr('transform', `translate(${margin.left},${margin.top})`);

  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default RadialStackedBarChart;
