import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { useState, useEffect } from "react";

const Chart = () => {
  const [data, setData] = useState([]);
  const [percentDiff, setPercentDiff] = useState(0.0);

  const fetchData = async () => {
    let response = await fetch(
      "https://zpwqlejamg.execute-api.eu-west-1.amazonaws.com/prod",
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    const prices = response.map((x) => ({
      balance: x[0].toFixed(2),
      time: new Date(x[1]*1000).toLocaleTimeString("en-UK"),
    }));
    console.log(prices);
    setData(prices);
    setPercentDiff((((prices[prices.length-1].balance/prices[0].balance) -1)*100).toFixed(2));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const percentColour = percentDiff >= 0 ? '#82ca9d' : '#ff6666';
  return (
    <div className="chart">
      {data.length > 0 && (
        <AreaChart width={900} height={250} data={data}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{stroke: 'white', strokeWidth: 0.5}}/>
          <YAxis type="number" domain={['dataMin-10', 'dataMax+10']} tick={{stroke: 'white', strokeWidth: 0.5}} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="basis"
            dataKey="balance"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      )}
      <h1 className="percentage" style={{color: percentColour}}>{percentDiff}%</h1>
    </div>
  );
};

export default Chart;
