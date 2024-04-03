import logo from './logo.svg';
import './App.css';
import CanadaMap from './Maps/CanadaMap';
import CanadaTempBar from './BarChart/CanadaTemp Barchart';

function App() {
  return (
    <div>
      <CanadaTempBar/>
      <CanadaMap/>
    </div>
  );
}

export default App;
