import './App.css';
import Chart from './components/chart';
import PositionList from './components/positionList';
import ContentTabs from './components/ContentTabs';
import { useState } from 'react';
import styles from './styles/main.module.css';
function App() {
  const [toShow, setToShow] = useState('Chart');
  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.contentContainer}>
          {toShow === 'Chart' && <Chart />}
          {toShow === 'Trades' && <PositionList />}
        </div>
        <ContentTabs setToShow={setToShow} />
      </header>
    </div>
  );
}

export default App;
