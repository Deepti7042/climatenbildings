import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LineChartWithDropdown = ({ data }) => {
  const d3Container = useRef(null);
  const tooltipRef = useRef(null); // Ref for the tooltip
  const [scenario, setScenario] = useState('low');

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 20, right: 20, bottom: 70, left: 90 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      // Clear previous SVG
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const filteredData = data.filter(d => d.scenario === scenario);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(filteredData, d => d.year))
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => Math.max(d.energyConsumption, d.hvacEfficiency, d.indoorAirQuality))])
        .range([height, 0]);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

      svg.append('g')
        .call(d3.axisLeft(yScale));

      // Prepare the line generators
      const lineGenerator = key => d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d[key]));

      const keys = ['energyConsumption', 'hvacEfficiency', 'indoorAirQuality'];
      const color = d3.scaleOrdinal().domain(keys).range(['#ff7f0e', '#2ca02c', '#17becf']);

      keys.forEach((key, index) => {
        svg.append("path")
          .datum(filteredData)
          .attr("fill", "none")
          .attr("stroke", color(key))
          .attr("stroke-width", 1.5)
          .attr("d", lineGenerator(key));
      });

      // Tooltip functionality
      const tooltip = d3.select(tooltipRef.current);
      svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .style('opacity', 0)
        .on('mousemove', function(event) {
          const mouse = d3.pointer(event);
          const mouseYear = Math.round(xScale.invert(mouse[0]));
          const nearestData = data.find(d => d.year === mouseYear && d.scenario === scenario);
          
          if (nearestData) {
            tooltip
              .style('opacity', 1)
              .html(`Year: ${mouseYear}<br/>` +
                    keys.map(key => `${key}: ${nearestData[key]}`).join('<br/>'))
              .style('left', `${event.pageX + 15}px`)
              .style('top', `${event.pageY}px`);
          }
        })
        .on('mouseout', function() {
          tooltip.style('opacity', 0);
        });
    }
  }, [data, scenario]);

  return (
    <>
      <select onChange={(e) => setScenario(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div ref={d3Container}></div>
      <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', opacity: 0, backgroundColor: 'white', border: 'solid 1px black', padding: '5px', borderRadius: '5px', pointerEvents: 'none', zIndex: 1 }}></div>
    </>
  );
};

export default LineChartWithDropdown;
