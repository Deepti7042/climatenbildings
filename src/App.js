import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import CanadaTempBar from './BarChart/CanadaTemp Barchart';
import RadialStackedBarChart from './BarChart/RadicalStackedChart';
import CorrelationHeatmap from './Heatmap/CorrelationHeatMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';
import data from '../src/Heatmap/filtered_heatmap_data.json'

function App() {
  return (
    <div>
      <CanadaTempBar/>
      <CanadaMap/>
      <HeatmapCorrelationData data={data}/>
    </div>
  );
}

export default App;
