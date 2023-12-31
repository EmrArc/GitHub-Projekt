import { AttractionMark } from "./AttractionMarker";
import { CollectMark } from "./CollectMarker";
import { useState, useEffect, useMemo, useRef } from "react";
import { Circle, Marker, Popup } from "react-leaflet";
import { JobMarker } from "./JobMarkers";
import L from "leaflet";

const svgURL = {
  mapIconUrl: `<?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="50" height="50">
  <path style="fill:#D8D8D8;" d="M256,264.828c-12.359,0-23.834-1.766-34.428-4.414l16.772,233.931
    C239.228,504.055,246.29,512,256,512c9.71,0,16.772-7.945,17.655-17.655l16.772-233.931
    C279.835,263.945,268.359,264.828,256,264.828"/>
  <path style="fill:#48A0DC;" d="M388.414,132.414C388.414,59.145,329.269,0,256,0S123.586,59.145,123.586,132.414
    S182.731,264.828,256,264.828S388.414,205.683,388.414,132.414"/>
  <g>
    <path style="fill:#FCFCFC;" d="M256,132.414c-19.421,0-35.31-15.89-35.31-35.31s15.89-35.31,35.31-35.31s35.31,15.89,35.31,35.31
      S275.421,132.414,256,132.414z M256,79.448c-9.71,0-17.655,7.945-17.655,17.655s7.945,17.655,17.655,17.655
      c9.71,0,17.655-7.945,17.655-17.655S265.71,79.448,256,79.448z"/>
    <path style="fill:#FCFCFC;" d="M300.138,203.034c-5.297,0-8.828-3.531-8.828-8.828v-26.483c0-19.421-15.89-35.31-35.31-35.31
      s-35.31,15.89-35.31,35.31v26.483c0,5.297-3.531,8.828-8.828,8.828c-5.297,0-8.828-3.531-8.828-8.828v-26.483
      c0-29.131,23.834-52.966,52.966-52.966c29.131,0,52.966,23.834,52.966,52.966v26.483
      C308.966,199.503,305.434,203.034,300.138,203.034z"/>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  </svg>
  `,
  mapIconColor: "#cc756b",
  mapIconColorInnerCircle: "#fff",
  pinInnerCircleRadius: 2,
};

const playerIcon = L.divIcon({
  html: L.Util.template(svgURL.mapIconUrl),
  className: "player-icon",
  iconAnchor: [25, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
});

//LocHandler handles all Marker Components

export const LocHandler = ({
  setMyScore,
  setQuestList,
  setVisitedScore,
  createdMarkerList,
}) => {
  //Starting Position of DragAndDrop Marker
  const [markerPos, setMarkerPos] = useState([50.941278, 6.958281]);

  useEffect(() => {
    //Set global state with current position
    window.currentPosition = markerPos;
  }, [markerPos]);
  //Drag And Drop Position State update
  const markerRef = useRef(null);
  const eventHandlers = useMemo(() => ({
    dragend() {
      if (markerPos != null) {
        const marker = markerRef.current;
        const { lat, lng } = marker.getLatLng();
        setMarkerPos([lat, lng]);
        console.log(markerPos);
      }
    },
  }));

  return (
    <div>
      {/*Create Drag And Drop Marker and update Position each 
        time its dragged to trigger 
        chain of stateUpdated dependend of markerPos state*/}
      <Marker
        position={markerPos}
        draggable={true}
        ref={markerRef}
        eventHandlers={eventHandlers}
        icon={playerIcon}
      >
        <Popup>Das Bist Du</Popup>
        <Circle center={markerPos} radius={100}></Circle>
      </Marker>
      {/*Create JobMarker with inputs from CreateJobMarkerComponents and markerPos state */}
      <JobMarker
        createdMarkerList={createdMarkerList}
        markerPos={markerPos}
      ></JobMarker>
      {/*Create AttractionMarker dependend of markerPos and json list*/}
      <AttractionMark
        from={markerPos}
        setQuestList={setQuestList}
        setVisitedScore={setVisitedScore}
      />
      {/*Create CollectMarker depenend of markerPos*/}
      <CollectMark
        my={markerPos}
        setMyScore={setMyScore}
        setMarkerPos={setMarkerPos}
      />
    </div>
  );
};
