export const QuestDialogWindow = ({
  isQuestDialogOpen,
  setQuestDialogOpen,
  questList,
}) => {
  //Updates Window when a new questList state updates with a quest(from AttractionMark Component)
  console.log(isQuestDialogOpen);
  return (
    <div>
      {isQuestDialogOpen && (
        <div id="quest-dialog">
          <h1>QuestDialog</h1>
          <ul>
            {questList.map((quest, i) => {
              return <li key={i}>{quest + " Fortschritt 0 / 10"}</li>;
            })}
          </ul>
          <button
            onClick={() => {
              setQuestDialogOpen(false);
            }}
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
};
