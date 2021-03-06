import React, { useState, useEffect } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts';
import TimeframeButtons from './timeframeButtons';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = payload[0].payload.time;
    return (
      <div className="custom-tooltip">
        <p className="label">
          {date.toLocaleDateString('en-UK')} - {date.toLocaleTimeString('en-UK').substring(0, 5)}
        </p>
        <p className="balance-label">{`Balance : ${payload[0].payload.balance}`}</p>
        <p className="label">{`Open Trades : ${payload[0].payload.openTrades}`}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [percentDiff, setPercentDiff] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const fetchData = async timeframe => {
    setLoading(true);
    let response = await fetch(`https://zpwqlejamg.execute-api.eu-west-1.amazonaws.com/prod?tf=${timeframe}`, {
      mode: 'cors',
      headers: {},
    });
    response = await response.json();
    const prices = response.map(x => ({
      balance: x[0].toFixed(2),
      time: new Date(x[1] * 1000),
      openTrades: x[2],
    }));
    await setData(prices);
    setPercentDiff((((prices[prices.length - 1].balance - prices[0].balance) / prices[0].balance) * 100).toFixed(2));
    setLoading(false);
  };

  const formatDate = date => {
    return date.toLocaleTimeString('en-UK').substring(0, 5);
  };

  const filterData = async timeFrame => {
    setLoading(true);
    await setData([]);
    await fetchData(timeFrame);
    setLoading(false);
  };

  useEffect(() => {
    fetchData('5min_balances');
  }, []);

  const percentColour = percentDiff >= 0 ? '#82ca9d' : '#ff6666';

  return (
    <div className="chart">
      <TimeframeButtons onClick={filterData} />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <ResponsiveContainer width="95%" height="60%" className="chart">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPv" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="90%" stopColor="#82ca9d" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tick={{ fill: 'white', strokeWidth: 0.5 }}
                tickFormatter={formatDate}
                scale="time"
                domain={['dataMin', 'dataMax']}
                allowDataOverflow={false}
              />
              <YAxis
                type="number"
                domain={[dataMin => Math.floor(dataMin - 10), dataMax => Math.floor(dataMax + 10)]}
                tick={{ fill: 'white', strokeWidth: 0.5 }}
                scale="linear"
                tickCount={5}
              />
              <CartesianGrid strokeDasharray="5 5" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="basis" dataKey="balance" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="balance-info">
            <div>
              <h1>Initial - ???{data[0].balance}</h1>
            </div>
            <div>
              <h1 className="percentage" style={{ color: percentColour }}>
                P/L - {percentDiff}%
              </h1>
            </div>
            <div>
              <h1>Current - ???{data[data.length - 1].balance}</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
