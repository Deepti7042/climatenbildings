import React from 'react';

function CirclePackChartIframe() {
  // Construct the URL path to your HTML file located in the public directory
  const iframeUrl = `${process.env.PUBLIC_URL}/CirclePackChart.html`;

  // Optional: Styles for the iframe
  const iframeStyle = {
    width: '100%', // Example width
    height: '1000px', // Example height, adjust as needed
    border: 'none' // Removing the default iframe border
  };

  // Return an iframe in your component
  return <iframe src={iframeUrl} style={iframeStyle} title="Circle Pack Chart"></iframe>;
}

export default CirclePackChartIframe;
