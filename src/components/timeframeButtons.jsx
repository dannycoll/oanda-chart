import React from "react";

const TimeframeButtons = (props) => (
  <div className="timeFrameButtons">
    <button autoFocus onClick={() => props.onClick("5min_balances")}>
      5 min
    </button>
    <button onClick={() => props.onClick("10min_balances")}>10 min</button>
    <button onClick={() => props.onClick("30min_balances")}>30 min</button>
    <button onClick={() => props.onClick("1hr_balances")}>1 hr</button>
    <button onClick={() => props.onClick("1day_balances")}>1 day</button>
    <button onClick={() => props.onClick("1week_balances")}>1 week</button>
  </div>
);

export default TimeframeButtons;
