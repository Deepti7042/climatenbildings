import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';
import data from '../src/Heatmap/filtered_heatmap_data.json';
import BarGraph from './BarChart/CanadaTemp Barchart';
import MultiVariableLineChart from './LineChart/LineChart'; // Note: This import is duplicated and might not be used, consider removing if not needed
import LineChartWithDropdown from './LineChart/LineChart';
import sampleData from './LineChart/canada_energy_data.json';
import HeatmapTimeSeries from './TimeSeries/TimeHeatMap';
// import HeatmapTime from './TimeSeries/TimeSeries2'; // Commented out as it seems not to be used

function App() {
  return (
    <div className="App">
      <div className="centered-component"><BarGraph/></div>
      <hr/>
      <div className="centered-component"><CanadaMap/></div>
      <hr/>
      <div className="centered-component"><HeatmapCorrelationData data={data}/></div>
      <hr/>
      <div><LineChartWithDropdown data={sampleData} /></div>
      <hr/>
      <div className="centered-component"><HeatmapTimeSeries/></div>
    </div>
  );
}

export default App;
