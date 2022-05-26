import mainStyles from './../styles/main.module.css';

const ContentTabs = ({ setToShow }) => (
  <div className={mainStyles.buttonContainer}>
    <button onClick={() => setToShow('Chart')}>Chart</button>
    <button onClick={() => setToShow('Trades')}>Trades</button>
  </div>
);

export default ContentTabs;
