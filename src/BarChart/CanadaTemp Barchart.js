import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import canadaTemperatureData from './Canada_Temperature_Data.json'; // Your path to the Canada temperature data JSON
import './CanadaTemperatureGraph.css';

const CanadaTemperatureGraph = () => {
    const ref = useRef();

    useEffect(() => {
        const margin = { top: 50, right: 20, bottom: 90, left: 70 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(ref.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const provinceDetails = {};
        canadaTemperatureData.results.forEach(d => {
            if (!provinceDetails[d.Prov]) {
                provinceDetails[d.Prov] = { total: 0, count: 0, stations: new Set() };
            }
            provinceDetails[d.Prov].total += d.Tm;
            provinceDetails[d.Prov].count += 1;
            provinceDetails[d.Prov].stations.add(d.Stn_Name);
        });

        const temperatureData = Object.keys(provinceDetails).map(key => ({
            Province: key,
            AverageTemperature: provinceDetails[key].total / provinceDetails[key].count,
            Stations: provinceDetails[key].stations.size
        }));

        const x = d3.scaleBand().range([0, width]).domain(temperatureData.map(d => d.Province)).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(temperatureData, d => d.AverageTemperature)]).range([height, 0]);

        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('x', width / 2)
            .attr('y', height + margin.top + 20)
            .text('Province');

        svg.append('text')
            .attr('text-anchor', 'end')
            .attr('transform', 'rotate(-90)')
            .attr('y', -margin.left + 20)
            .attr('x', -margin.top - height / 2 + 20)
            .text('Average Temperature (°C)');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', 0 - (margin.top / 2))
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('text-decoration', 'underline')
            .text('Average Temperature by Province');

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(d3.axisLeft(y));

        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip');

        svg.selectAll('.bar')
            .data(temperatureData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.Province))
            .attr('width', x.bandwidth())
            .attr('y', d => y(d.AverageTemperature))
            .attr('height', d => height - y(d.AverageTemperature))
            .attr('fill', 'steelblue')
            .on('mouseover', function (event, d) {
                tooltip.transition().duration(200).style('opacity', .9);
                tooltip.html(`Province: ${d.Province}<br/>Average Temp: ${d.AverageTemperature.toFixed(2)}°C<br/>Stations Reporting: ${d.Stations}`)
                    .style('left', (event.pageX) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function (d) {
                tooltip.transition().duration(500).style('opacity', 0);
            });
    }, []);

    return <svg ref={ref}></svg>;
};

export default CanadaTemperatureGraph;
