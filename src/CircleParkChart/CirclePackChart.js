// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import './CirclePackChart.css';
// import flareData from './flare.json'; // Make sure this path matches where your JSON is located

// function CirclePackChart() {
//   const svgRef = useRef();
//   const infoRef = useRef();

//   useEffect(() => {
//     // The data is already imported, so directly use it
//     const rootData = d3.hierarchy(flareData)
//       .sum(d => d.value)
//       .sort((a, b) => b.value - a.value);
//     // Proceed with setting up the D3 chart using rootData
//     // This replaces your previous data fetching logic

//     const svg = d3.select(svgRef.current),
//           margin = 20,
//           diameter = +svg.attr("width"),
//           g = svg.append("g").attr("transform", `translate(${diameter / 2},${diameter / 2})`);

//     const color = d3.scaleLinear()
//       .domain([-1, 5])
//       .range(["#b2719d", "black", "#7b6888", "#6b486b"])
//       .interpolate(d3.interpolateHcl);

//     const pack = d3.pack()
//       .size([diameter - margin, diameter - margin])
//       .padding(2);

//     let focus = rootData,
//         nodes = pack(rootData).descendants(),
//         view = [focus.x, focus.y, focus.r * 2 + margin];

//     const circle = g.selectAll("circle")
//       .data(nodes)
//       .enter().append("circle")
//         .attr("class", d => d.parent ? d.children ? "node" : "node node--leaf" : "node node--root")
//         .style("fill", d => d.children ? color(d.depth) : null)
//         .on("click", function(event, d) {
//           if (focus !== d) {
//             zoomTo(d);
//             event.stopPropagation();
//           }
//         });

//     const zoomTo = (d) => {
//       const transition = d3.transition().duration(750).tween("zoom", () => {
//         const i = d3.interpolateZoom(view, [d.x, d.y, d.r * 2 + margin]);
//         return t => {
//           const k = diameter / i(t)[2];
//           circle.attr("transform", d => `translate(${(d.x - i(t)[0]) * k},${(d.y - i(t)[1]) * k})`);
//           circle.attr("r", d => d.r * k);
//         };
//       });
//     };

//     svg.style("background", color(-1)).on("click", () => zoomTo(focus));
//   }, []); // Dependency array is empty because we're not fetching data

//   return (
//     <>
//       <svg ref={svgRef} width="860" height="960"></svg>
//       <div ref={infoRef} id="info"></div>
//     </>
//   );
// }

// export default CirclePackChart;
