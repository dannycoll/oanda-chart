import React from "react";

const TimeframeButtons = (props) => (
  <div className="timeFrameButtons">
    <button autoFocus onClick={() => props.onClick("5 min")}>
      5 min
    </button>
    <button onClick={() => props.onClick("10 min")}>10 min</button>
    <button onClick={() => props.onClick("30 min")}>30 min</button>
    <button onClick={() => props.onClick("1 hr")}>1 hr</button>
    <button onClick={() => props.onClick("1 day")}>1 day</button>
    <button onClick={() => props.onClick("1 week")}>1 week</button>
  </div>
);

export default TimeframeButtons;
