import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';
import data from '../src/Heatmap/filtered_heatmap_data.json';
import BarGraph from './BarChart/CanadaTemp Barchart';
import LineChartWithDropdown from './LineChart/LineChart';
import sampleData from './LineChart/canada_energy_data.json';
import HeatmapTimeSeries from './TimeSeries/TimeHeatMap';

function App() {
  return (
    <div className="App">
      <h1 className="main-heading">Dashboard - Climate Data Visualization for Building Adaptation</h1>
      <div className="centered-component">
        <h2>Bar Graph</h2>
        <BarGraph/>
      </div>
      <hr/>
      <div className="centered-component">
        <h2>Canada Map</h2>
        <CanadaMap/>
      </div>
      <hr/>
      <div className="centered-component">
        <h2>Heatmap Correlation Data</h2>
        <HeatmapCorrelationData data={data}/>
      </div>
      <hr/>
      <div className="centered-component">
        <h2>Line Chart With Dropdown</h2>
        <LineChartWithDropdown data={sampleData} />
      </div>
      <hr/>
      <div className="centered-component">
        <h2>Heatmap Time Series</h2>
        <HeatmapTimeSeries/>
      </div>
    </div>
  );
}

export default App;
