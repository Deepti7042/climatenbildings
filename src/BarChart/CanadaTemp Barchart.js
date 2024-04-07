import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import rawData from './data_Data_random.json';

const BarGraph = () => {
  const d3Container = useRef(null);
  const [variable, setVariable] = useState('Temperature'); // Default to temperature
  const [data, setData] = useState([]); // State to hold the prepared data

  useEffect(() => {
    if (rawData && rawData.results) {
      const preparedData = rawData.results.map(d => ({
        group: `${d.province_name}`, // Combining Year and Province to make each bar unique
        value: +d[variable], // Convert string to number
      }));
      setData(preparedData);
    }
  }, [variable]);

  useEffect(() => {
    if (data.length > 0 && d3Container.current) {
      const margin = { top: 30, right: 30, bottom: 150, left: 60 },
            width = 800 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Tooltip
      const tooltip = d3.select(d3Container.current)
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('pointer-events', 'none'); // Ensure the tooltip does not interfere with mouse events

      // X axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.group))
        .padding(0.2);
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.value)])
        .range([height, 0]);
      svg.append('g')
        .call(d3.axisLeft(y));

      // Bars
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.group))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', '#69b3a2')
        .on('mouseover', function(event, d) {
          tooltip.style('opacity', 1);
          tooltip.html(`Group: ${d.group} <br> Value: ${d.value}`)
                 .style('left', `${event.pageX}px`)
                 .style('top', `${event.pageY - 28}px`);
        })
        .on('mouseout', function() {
          tooltip.style('opacity', 0);
        });
    }
  }, [data]); // Redraw the graph when data changes

  return (
    <div>
      <button onClick={() => setVariable('Temperature')}
      style={{
        padding: '10px 20px', // Makes the button bigger
        fontSize: '16px', // Increases the font size for better readability
        backgroundColor: 'Black', // A green background for a positive action
        color: 'white', // Text color
        border: 'none', // Removes the default border
        borderRadius: '5px', // Rounded corners for a modern look
        cursor: 'pointer', // Changes the cursor to indicate it's clickable
        margin: '5px', // Adds some space around the button
        transition: 'background-color 0.3s', // Smooth transition for hover effect
      }}>
        Temperature</button>
      <button onClick={() => setVariable('Snowfall')}
      style={{
        padding: '10px 20px', // Makes the button bigger
        fontSize: '16px', // Increases the font size for better readability
        backgroundColor: 'Black', // A green background for a positive action
        color: 'white', // Text color
        border: 'none', // Removes the default border
        borderRadius: '5px', // Rounded corners for a modern look
        cursor: 'pointer', // Changes the cursor to indicate it's clickable
        margin: '5px', // Adds some space around the button
        transition: 'background-color 0.3s', // Smooth transition for hover effect
      }}>
       Snowfall</button>
      <button onClick={() => setVariable('precipitation')}
      style={{
        padding: '10px 20px', // Makes the button bigger
        fontSize: '16px', // Increases the font size for better readability
        backgroundColor: 'Black', // A green background for a positive action
        color: 'white', // Text color
        border: 'none', // Removes the default border
        borderRadius: '5px', // Rounded corners for a modern look
        cursor: 'pointer', // Changes the cursor to indicate it's clickable
        margin: '5px', // Adds some space around the button
        transition: 'background-color 0.3s', // Smooth transition for hover effect
      }}>
      Precipitation</button>
      <div id="my_dataviz" ref={d3Container}></div>
    </div>
  );
};

export default BarGraph;
