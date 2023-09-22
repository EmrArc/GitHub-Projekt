import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer } from "react-leaflet";
import { Icon } from "leaflet";
import { LocHandler } from "./LocationHandler";
import { TileControl } from "./TileLayerControl";
import "leaflet/dist/leaflet.css";
import { ControlButton } from "./ButtonControl";
import "./style.css";
import { LottieTrigger } from "./ReactLottie";
import { ScoreField } from "./Legend";
import { QuestDialogWindow } from "./QuestDialog";
import { RainAnimation } from "./Rain";
import { SnowAnimation } from "./Snow";
import { CreateMarkerDialog } from "./CreateJobMarker";

const Map = () => {
  //Map state
  const [map, setMap] = useState(null);

  //paramStates
  //Score-state increments when collecting a coin
  const [myScore, setMyScore] = useState(0);

  //Boolean-states triggers new windows when true
  const [scoreUp, setScoreUp] = useState(false);
  const [isCreateMarkerWindowOpen, setCreateMarkerWindow] = useState(false);
  const [isQuestDialogOpen, setQuestDialogOpen] = useState(false);

  //List-state gets updated with quests or marker created from CreateMarker Component
  const [questList, setQuestList] = useState([]);
  const [createdMarkerList, setCreatedMarkerList] = useState([]);

  //visitedScore-state increments when visting a attraction
  const [visitedScore, setVisitedScore] = useState(0);

  //RainAnimation-state passing how many raindrops on screen (either 0 or 200)
  const [raindrops, setRaindrops] = useState(0);
  //SnowAnimation-state passing how many snowdrops on screen (either 0 or 200)
  const [snowdrops, setSnowdrops] = useState(0);

  //Map default position
  const position = [50.941278, 6.958281];

  useEffect(() => {
    const scoreElement = document.getElementById("lottie");
    if (myScore > 0) {
      //Show Lottie Animation
      scoreElement.style.display = "flex";
      setScoreUp(true);
      // play level up sound
      //(TODO maybe)
      //Show Lottie Animation for 1 seconds
      setTimeout(() => {
        scoreElement.style.display = "none";
        scoreElement.className = "";
        setScoreUp(false);
      }, 1000 * 1);
    }
  }, [myScore]);

  //renders all Components
  return (
    <div>
      <MapContainer
        //Map Setting
        whenCreated={setMap}
        className="map"
        center={position}
        zoom={500}
        style={{ height: window.innerHeight, width: "100%" }}
        //attributionControl={false}
        //doubleClickZoom={false}
        //zoomControl={false}
        //scrollWheelZoom = {false}
      >
        {/* React-Leaflet Elemente */}
        <ControlButton
          map={map}
          setQuestDialogOpen={setQuestDialogOpen}
          setRaindrops={setRaindrops}
          setSnowdrops={setSnowdrops}
          setCreateMarkerWindow={setCreateMarkerWindow}
        />
        <TileControl />
        {/*Location and Marker Handler. All Markers are created in this Component and Subcomponents */}
        <LocHandler
          setMyScore={setMyScore}
          setQuestList={setQuestList}
          setVisitedScore={setVisitedScore}
          createdMarkerList={createdMarkerList}
        />
      </MapContainer>
      {/*OVERLAY ELEMENTE/EXTERNAL STATES*/}
      <ScoreField myScore={myScore} visitedScore={visitedScore}></ScoreField>
      {/*Lottie Animation */}
      <div id="lottie">{scoreUp && <LottieTrigger></LottieTrigger>}</div>
      {/*QuestWindow*/}
      <QuestDialogWindow
        isQuestDialogOpen={isQuestDialogOpen}
        setQuestDialogOpen={setQuestDialogOpen}
        questList={questList}
      />
      {/*Animations*/}
      <RainAnimation raindrops={raindrops} />
      <SnowAnimation snowdrops={snowdrops} />
      {/*CreateMarkerWindow Component*/}
      <CreateMarkerDialog
        isCreateMarkerWindowOpen={isCreateMarkerWindowOpen}
        setCreateMarkerWindow={setCreateMarkerWindow}
        setCreatedMarkerList={setCreatedMarkerList}
        createdMarkerList={createdMarkerList}
      />
    </div>
  );
};

//Export this Component to App.jsx
export default Map;
