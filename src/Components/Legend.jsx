export const ScoreField = ({ myScore, visitedScore }) => {
  //Simple Update of text dependend of myScore-state and visitedScore-state
  let sehen = "";
  if (visitedScore == 1) {
    sehen = "Du hast " + visitedScore + " Sehenswürdigkeit besucht";
  } else {
    sehen = "Du hast " + visitedScore + " Sehenswürdigkeiten besucht";
  }

  let score = "";
  if (myScore == 1) {
    score = "Du hast " + myScore + " Münze";
  } else {
    score = "Du hast " + myScore + " Münzen";
  }

  return (
    <div id="legend">
      <b>Dein Score</b>
      <br />
      {/*Amount of Coins user collects*/}
      {score}
      <br />
      {/*Amount of Attraction user visits*/}
      {sehen}
    </div>
  );
};
