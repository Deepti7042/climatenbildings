import './App.css';
import CanadaMap from './Maps/CanadaMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';
import data from '../src/Heatmap/filtered_heatmap_data.json';
import BarGraph from './BarChart/CanadaTemp Barchart';
import LineChartWithDropdown from './LineChart/LineChart';
import sampleData from './LineChart/canada_energy_data.json';
import HeatmapTimeSeries from './TimeSeries/TimeHeatMap';
import CirclePackChartIframe from './htmlCodeFile';

function App() {
  return (
    <div className="App">
      <h1 className="main-heading" style={{color:'black'}}>Dashboard - Climate Data Visualization And Building Adaptation In Canada</h1>
      <hr/>
      <div className="content-container outer-container">
        <h2>World Map Displaying Weather Detail of Cities in Canada</h2>
        <CanadaMap/>
      </div>
      <hr/>
      <div className="content-container outer-container">
        <h2>Displaying Weather Details in Various Province of Canada for Several Years</h2>
        <BarGraph/>
      </div>
      <hr/>
      <div className="content-container outer-container">
        <h2>Displaying Building Internal Data during Various Weather Scenarios</h2>
        <LineChartWithDropdown data={sampleData} />
      </div>
      <hr/>
      <div className="content-container outer-container">
        <h2>Displaying Correlation between various Weather and Infrastructure Factors</h2>
        <HeatmapCorrelationData data={data}/>
      </div>
      <hr/>
      <div className="content-container outer-container">
        <h2>Displaying Weather Details in Cities of Canada During A Range of Years</h2>
        <HeatmapTimeSeries/>
      </div>
      <hr/>
      <div className="content-container outer-container">
        <h2>Circle Pack Chart- Energy Consumption Trends in Canada Cities (ZoomIn / ZoomOut)</h2>
        <h4>(View Details Below)</h4>
        <CirclePackChartIframe/>
      </div>
    </div>
  );
}

export default App;
