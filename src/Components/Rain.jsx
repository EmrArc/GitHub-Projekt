import React from "react";
import ReactRain from "react-rain-animation";
import "./style.css";

export const RainAnimation = ({ raindrops }) => {
  console.log(raindrops);
  //Trigger Rain animation if snowdrops state changes (numeric Value)
  return (
    <div id="drop">
      <ReactRain numDrops={raindrops} />;
    </div>
  );
};
