import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import jsonData from './data_climate.json'; // Ensure this path matches your file structure

const HeatmapTime = () => {
  const [selectedYear, setSelectedYear] = useState('2015');
  const [weatherMetric, setWeatherMetric] = useState('Temperature');
  const svgRef = useRef();
  const data = jsonData.results.filter(d => d.year === selectedYear);

  // Extract unique years for the y-axis
  const uniqueYears = Array.from(new Set(jsonData.results.map(d => d.year))).sort();
  // Extract unique provinces for the x-axis
  const uniqueProvinces = Array.from(new Set(jsonData.results.map(d => d.province_name))).sort();
  const metrics = ['Temperature', 'Snowfall', 'Precipitation'];

  useEffect(() => {
    if (data && svgRef.current) {
      const margin = { top: 60, right: 0, bottom: 100, left: 50 },
            width = 650 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

      const svg = d3.select(svgRef.current)
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

      // Adjust xScale to map unique provinces
      const xScale = d3.scaleBand()
                       .range([0, width])
                       .domain(uniqueProvinces)
                       .padding(0.05);

      // Adjust yScale to map unique years
      const yScale = d3.scaleBand()
                       .range([height, 0])
                       .domain(uniqueYears)
                       .padding(0.05);

      // Define the color scale
      const colorScale = d3.scaleQuantile()
                           .domain([0, d3.max(data, (d) => +d[weatherMetric])])
                           .range(d3.schemeBlues[9]);

      // Draw rectangles for the heatmap
      svg.selectAll(".cell")
         .data(data)
         .enter().append("rect")
         .attr("x", (d) => xScale(d.province_name))
         .attr("y", (d) => yScale(d.year))
         .attr("width", xScale.bandwidth())
         .attr("height", yScale.bandwidth())
         .style("fill", (d) => colorScale(d[weatherMetric]));

      // Add x-axis
      svg.append("g")
         .attr("transform", `translate(0,${height})`)
         .call(d3.axisBottom(xScale))
         .selectAll("text")
         .attr("transform", "rotate(-65)")
         .style("text-anchor", "end");

      // Add y-axis
      svg.append("g")
         .call(d3.axisLeft(yScale));

      // Optional: Add title, legend, and any other additional elements here
    }
  }, [selectedYear, weatherMetric]);

  return (
    <div>
      <h2>Dynamic Heatmap</h2>
      <label>Year: </label>
      <input type="range" min={Math.min(...uniqueYears)} max={Math.max(...uniqueYears)}
             value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} />
      <select value={weatherMetric} onChange={(e) => setWeatherMetric(e.target.value)}>
        {metrics.map(metric => (<option key={metric} value={metric}>{metric}</option>))}
      </select>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default HeatmapTime;
