import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import buildingData from './'

// Assuming `buildingData` is the array containing your JSON objects
const buildingData = [
  // ... Add your JSON data objects here
];

const BuildingFactorsLineChart = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (buildingData.length && d3Container.current) {
      const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

      // Append the svg object to the body of the page
      const svg = d3.select(d3Container.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

      // Group the data: one array for each province
      const sumstat = d3.group(buildingData, d => d.province);

      // Define the scales
      const x = d3.scaleBand()
            .domain(Array.from(sumstat.keys()))
            .range([0, width])
            .padding([0.2]);

      const y = d3.scaleLinear()
            .domain([d3.min(buildingData, d => d.year), d3.max(buildingData, d => d.year)])
            .range([height, 0]);

      // Add X axis
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      svg.append("g")
        .call(d3.axisLeft(y).ticks(5));

      // Color palette
      const color = d3.scaleOrdinal(d3.schemeTableau10);

      // Draw the line
      sumstat.forEach((values, key) => {
        svg.append("path")
          .datum(values.sort((a, b) => a.year - b.year)) // sort values by year
          .attr("fill", "none")
          .attr("stroke", color(key))
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(d => x(d.province))
            .y(d => y(d.year))
          );
      });

      // Add a title
      svg.append("text")
          .attr("x", width / 2)
          .attr("y", margin.top)
          .attr("text-anchor", "middle")
          .style("font-size", "20px")
          .text("Building Factors Over Years by Province");

      // Add a legend (if desired)
      // ...
    }
  }, [buildingData]);

  return <div ref={d3Container} />;
};

export default BuildingFactorsLineChart;
