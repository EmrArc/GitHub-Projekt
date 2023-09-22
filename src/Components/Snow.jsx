import ReactSnow from "react-snowfall";

export const SnowAnimation = ({ snowdrops }) => {
  //Trigger Snow animation if snowdrops state changes (numeric Value)
  console.log(snowdrops);
  return (
    <div
      style={{
        height: 400,
        width: 400,
        background: "#282c34",
        position: "absolute",
        zIndex: 492,
      }}
    >
      <ReactSnow
        color="blue"
        snowflakeCount={snowdrops}
        style={{ position: "fixed" }}
      />
    </div>
  );
};
