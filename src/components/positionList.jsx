import { useState, useEffect } from 'react';
import styles from './../styles/positionList.module.css';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [showMarginWarning, setShowMarginWarning] = useState(false);
  const fetchData = async () => {
    let response = await (
      await fetch(`https://api-fxtrade.oanda.com/v3/accounts/${process.env.REACT_APP_ACCOUNT_ID}/positions`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OANDA_BEARER}`,
        },
      })
    ).json();
    let accountSummary = await (
      await fetch(`https://api-fxtrade.oanda.com/v3/accounts/${process.env.REACT_APP_ACCOUNT_ID}/summary`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OANDA_BEARER}`,
        },
      })
    ).json();
    accountSummary = accountSummary.account;
    response = response.positions.map(x => {
      return {
        instrument: x.instrument,
        direction: x.long.units > Math.abs(x.short.units) ? 'long' : parseInt(x.short.units) !== 0 ? 'short' : '-',
        pl: x.unrealizedPL,
        units: x.long.units > Math.abs(x.short.units) ? x.long.units : Math.abs(x.short.units),
      };
    });
    setPositions([...response]);
    setShowMarginWarning(parseFloat(accountSummary.marginUsed) > 0.9 * parseFloat(accountSummary.marginCloseoutNAV));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getColor = input => {
    if (input >= 0 || input === 'long') return '#82ca9d';
    return '#ff6666';
  };
  return (
    <div className={styles.container}>
      {showMarginWarning && <div className={styles.marginText}>High Margin!</div>}
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Profit</th>
            <th>Direction</th>
            <th>Trades</th>
          </tr>
        </thead>
        <tbody>
          {positions.filter(x => x.direction !== '-').length > 0 ? (
            positions
              .filter(x => x.direction !== '-')
              .map(x => (
                <tr key={x.instrument}>
                  <td>{x.instrument.replace('_', '/')}</td>
                  <td style={{ color: getColor(x.pl) }}>{x.pl}</td>
                  <td style={{ color: getColor(x.direction) }}>{x.direction}</td>
                  <td>{x.units / 1000}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td></td>
              <td>No</td>
              <td>open</td>
              <td>positions</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PositionList;
