import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';
import data from '../src/Heatmap/filtered_heatmap_data.json'
import BarGraph from './BarChart/CanadaTemp Barchart';

function App() {
  return (
    <div>
      <BarGraph/>
      <CanadaMap/>
      <HeatmapCorrelationData data={data}/>
    </div>
  );
}

export default App;
