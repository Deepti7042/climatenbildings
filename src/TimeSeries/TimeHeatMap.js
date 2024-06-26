// HeatmapTimeSeries.js
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsonData from './data_Data_random.json'; // Adjust the import path as needed

const HeatmapTimeSeries = () => {
  const svgRef = useRef();
  const [selectedYear, setSelectedYear] = useState('2015');
  const [weatherMetric, setWeatherMetric] = useState('Temperature');
  const data = jsonData.results;
  
  // Extract unique years and sort them to use in the slider and datalist
  const uniqueYears = Array.from(new Set(data.map(d => d.year))).sort();
  // Set the initial year to the latest year in the dataset
  useEffect(() => setSelectedYear(uniqueYears[2000]), [uniqueYears]);

  useEffect(() => {
    if (data && svgRef.current && selectedYear) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear SVG before drawing

      const margin = { top: 50, right: 20, bottom: 100, left: 60 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      const filteredData = data.filter(d => d.year <= selectedYear);

      // Setup scales - The domain needs to be adjusted based on your actual data
      const xScale = d3.scaleBand()
        .domain(filteredData.map(d => d.city))
        .rangeRound([0, width])
        .padding(0.05);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => +d[weatherMetric])])
        .range([height, 0]);

      const colorScale = d3.scaleSequential(d3.interpolateInferno)
        .domain([0, d3.max(filteredData, d => +d[weatherMetric])]);

      // Append SVG object to the body of the page
      const canvas = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add X axis
      canvas.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

      // Add Y axis
      canvas.append("g")
        .call(d3.axisLeft(yScale));

      // Add Bars
      canvas.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
          .attr("x", d => xScale(d.city))
          .attr("y", d => yScale(d[weatherMetric]))
          .attr("width", xScale.bandwidth())
          .attr("height", d => height - yScale(d[weatherMetric]))
          .attr("fill", d => colorScale(d[weatherMetric]));

      // Add axis labels and chart title
      svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 40)
        .text("City");

      svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 4)
        .attr("x", -margin.top - height / 2 + 20)
        .text(weatherMetric);

      svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text(`Yearly ${weatherMetric} by City up to ${selectedYear}`);
    }
  }, [selectedYear, weatherMetric, data]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
      <select value={weatherMetric} onChange={e => setWeatherMetric(e.target.value)} style={{
          padding: '10px 20px', // Makes the dropdown bigger and easier to click
          fontSize: '16px', // Increases the font size for better readability
          backgroundColor: '#f0f0f0', // A light grey background for a modern look
          borderColor: '#ccc', // Light grey border
          borderRadius: '5px', // Rounded corners for a softer look
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          cursor: 'pointer', // Changes the cursor to indicate it's clickable
          outline: 'none', // Removes the outline to avoid distraction
          margin: '10px', // Adds some space around the dropdown
          width: 'auto', // Adjust width as needed, 'auto' for content-based size
        }} >
            {['Temperature', 'Snowfall', 'precipitation'].map(metric => (
                <option key={metric} value={metric}>{metric}</option>
            ))}
        </select>
        <label>   </label>
        <label style = {{fontSize: '1.5em'}}>Year: </label>
        {/* <input
          type="range"
          min={uniqueYears[0]}
          max={uniqueYears[uniqueYears.length - 1]}
          value={selectedYear || 2010} // Set default value to 2010 if selectedYear is falsy
          onChange={e => setSelectedYear(parseInt(e.target.value))}
          list="year-ticks"
        /> */}
        <datalist id="year-ticks" style = {{fontSize: '1.5em', textDecoration: 'Bold'}}>
          {uniqueYears.map(year => <option key={year} value={year} />)}
        </datalist>
        <input type="range" min={Math.min(...uniqueYears)} max={Math.max(...uniqueYears)}
             value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} list="year-ticks"  
             style={{
              width: '50%', // Makes the slider take the full width of its container
              height: '25px', // Increases the height of the slider for better usability
              background: '#f0f0f0', // Changes the background color of the slider
              cursor: 'pointer', // Changes the cursor to indicate it's adjustable
              outline: 'none', // Removes the outline to make it blend better with the design
              marginTop: '20px', // Adds space above the slider
              marginBottom: '20px', // Adds space below the slider
            }} />
      </div>
      <svg ref={svgRef} width={960} height={600}></svg>
    </div>
  );
};

export default HeatmapTimeSeries;
