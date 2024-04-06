import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import energyData from './weather_and_building_data.json'; // Import the hierarchical data

const BubbleChart = () => {
  const d3Container = useRef(null);
  const width = 928;
  const height = 928;

  useEffect(() => {
    if (energyData && d3Container.current) {
      // Remove any existing content
      d3.select(d3Container.current).selectAll("*").remove();

      const color = d3.scaleLinear()
          .domain([-1, 5])
          .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
          .interpolate(d3.interpolateHcl);

      // Create root from the hierarchical data
      const root = d3.hierarchy(energyData)
          .sum(d => d.value) // Here the size of each leave is given in the 'value' field in input data
          .sort((a, b) => b.value - a.value);

      // Create the pack layout
      const pack = d3.pack()
          .size([width - 2, height - 2])
          .padding(3);

      const svg = d3.select(d3Container.current)
          .append('svg')
          .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
          .attr('width', width)
          .attr('height', height)
          .attr('style', "max-width: 100%; height: auto; background: white; cursor: pointer;");

      // Pack the data
      const rootPacked = pack(root);

      let focus = rootPacked;
      let view;

      // Bind data to the nodes (circles and labels)
      const node = svg.append("g")
          .selectAll("circle")
          .data(rootPacked.descendants().slice(1))
          .join("circle")
          .attr("class", d => d.children ? "node" : "node node--leaf")
          .attr("fill", d => d.children ? color(d.depth) : "white")
          .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

      const label = svg.append("g")
          .style("font-size", "12px")
          .attr("pointer-events", "none")
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(rootPacked.descendants())
          .join("text")
          .style("fill-opacity", d => d.parent === rootPacked ? 1 : 0)
          .style("display", d => d.parent === rootPacked ? "inline" : "none")
          .text(d => d.data.name);

      zoomTo([rootPacked.x, rootPacked.y, rootPacked.r * 2]);

      function zoomTo(v) {
          const k = width / v[2];

          view = v;

          label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
          node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
          node.attr("r", d => d.r * k);
      }

      function zoom(event, d) {
          focus = d;

          const transition = svg.transition()
              .duration(event.altKey ? 7500 : 750)
              .tween("zoom", d => {
                  const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                  return t => zoomTo(i(t));
              });

          label
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(transition)
              .style("fill-opacity", d => d.parent === focus ? 1 : 0)
              .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
              .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
      }
    }
  }, []);

  return (
    <div ref={d3Container}></div>
  );
};

export default BubbleChart;
