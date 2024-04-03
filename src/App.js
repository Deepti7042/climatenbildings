import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import CanadaTempBar from './BarChart/CanadaTemp Barchart';
import RadialStackedBarChart from './BarChart/RadicalStackedChart';
import CorrelationHeatmap from './Heatmap/CorrelationHeatMap';
import HeatmapCorrelationData from './Heatmap/Heatmap';

function App() {
  return (
    <div>
      <CanadaTempBar/>
      <CanadaMap/>
      {/* <RadialStackedBarChart/> */}
      {/* <CorrelationHeatmap/> */}
      <HeatmapCorrelationData/>
    </div>
  );
}

export default App;
