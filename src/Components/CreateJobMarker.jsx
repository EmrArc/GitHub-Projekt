import { useState } from "react";
export const CreateMarkerDialog = ({
  setCreatedMarkerList,
  isCreateMarkerWindowOpen,
  setCreateMarkerWindow,
  createdMarkerList,
}) => {
  const [tempList, setTempList] = useState({});

  //changes values for each input
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setTempList({ ...tempList, [event.target.name]: value });
    console.log(tempList);
  };

  //prevents reloading the page after clicking "Hinzufügen" button
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  function handleConsole() {}
  return (
    //renders Window with input options
    <div>
      {isCreateMarkerWindowOpen && (
        <div id="create-marker-dialog">
          <h4>Erstelle ein Dynamischen Marker</h4>
          <form className="form" onSubmit={handleSubmit}>
            <label className="left">Längengrad :</label>
            <input
              //Longitude Input
              className="right"
              name="long"
              type="number"
              step="0.01"
              min="0"
              max="20"
              onChange={(event) => handleChange(event)}
            ></input>
            <br></br>
            <label className="left">Breitengrad :</label>
            <input
              //Latitude Input
              className="right"
              name="lat"
              type="number"
              step="0.01"
              min="0"
              max="20"
              onChange={(event) => handleChange(event)}
            ></input>
            <br></br>
            <label className="left">Autor :</label>
            <input
              //Author input
              className="right"
              name="autor"
              onChange={(event) => handleChange(event)}
            ></input>
            <br></br>
            <label className="left">Questbeschreibung :</label>
            <input
              className="right"
              name="quest"
              onChange={(event) => handleChange(event)}
            ></input>
          </form>

          <button
            //Create Marker with inputs
            className="create-marker-dialog-create"
            onClick={() => {
              setCreatedMarkerList((current) => [...current, tempList]);
              setCreateMarkerWindow(false);
            }}
          >
            Hinzufügen
          </button>
          <br></br>
          <button
            //close Window
            className="create-marker-dialog-close"
            onClick={() => {
              setCreateMarkerWindow(false);
              handleConsole();
            }}
          >
            Schließen
          </button>
        </div>
      )}
    </div>
  );
};

//Test
//Breitengrad 50.9408 Längengrad 6.975 Köln Messe Deutz Location
