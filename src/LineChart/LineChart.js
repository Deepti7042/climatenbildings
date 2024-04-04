import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LineChartWithDropdown = ({ data }) => {
  const d3Container = useRef(null);
  const [scenario, setScenario] = useState('low');

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 20, right: 90, bottom: 40, left: 90 },
            width = 1000 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

      const svg = d3.select(d3Container.current)
      svg.selectAll("*").remove(); // Clear SVG content before adding new elements

      const chartSvg = svg.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

      // Filter data based on the selected scenario
      const filteredData = data.filter(d => d.scenario === scenario);

      // Set the scales
      const xScale = d3.scaleLinear()
          .domain(d3.extent(filteredData, d => d.year))
          .range([0, width]);

      const yScale = d3.scaleLinear()
          .domain([0, d3.max(filteredData, d => Math.max(d.energyConsumption, d.hvacEfficiency, d.indoorAirQuality))])
          .range([height, 0]);

      // Add X axis
      chartSvg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

      // Add Y axis
      chartSvg.append("g")
          .call(d3.axisLeft(yScale));

      // Define line generator
      const line = d3.line()
          .x(d => xScale(d.year))
          .y(d => yScale(d.value));

      // Data keys
      const keys = ['energyConsumption', 'hvacEfficiency', 'indoorAirQuality'];

      // Colors for the lines
      const color = d3.scaleOrdinal()
          .domain(keys)
          .range(['#ff7f0e', '#2ca02c', '#17becf']);

      // Draw lines
      keys.forEach((key, index) => {
        chartSvg.append("path")
          .datum(filteredData.map(d => ({ year: d.year, value: d[key] })))
          .attr("fill", "none")
          .attr("stroke", color(key))
          .attr("stroke-width", 1.5)
          .attr("d", line);
      });

      // Draw legend
      const legend = chartSvg.selectAll(".legend")
          .data(keys)
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", (d, i) => `translate(${width - 100},${i * 20})`);

      legend.append("rect")
          .attr("x", 5)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", color);

      legend.append("text")
          .attr("x", 20)
          .attr("y", 5)
          .attr("dy", ".35em")
          .text(d => d);

      // Add axis titles
      chartSvg.append("text")
          .attr("text-anchor", "end")
          .attr("x", width/2)
          .attr("y", height + margin.top + 20)
          .text("Year");

      chartSvg.append("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-90)")
          .attr("y", -margin.left + 20)
          .attr("x", -margin.top)
          .text("Value");

    }
  }, [data, scenario]); // Redraw chart if data or scenario changes

  return (
    <>
      <select onChange={(e) => setScenario(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div ref={d3Container} />
    </>
  );
};

export default LineChartWithDropdown;

// Usage:
// <LineChartWithDropdown data={yourData} />
