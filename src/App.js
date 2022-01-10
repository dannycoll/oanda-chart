import "./App.css";
import Chart from "./components/chart";
import AdSense from "react-adsense";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Chart />
      </header>
      <AdSense.Google client="ca-pub-6001071944606362" slot="1" />
    </div>
  );
}

export default App;
