import { Marker, Circle, Popup } from "react-leaflet";
import React, { useState, useEffect, useRef } from "react";
import L, { popup } from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@turf/turf";
import "react-tabs/style/react-tabs.css";
import "./style.css";
import audio from "../static/Audio/Single-Coin-Drop.mp3";

//Icon/CSS Settings/Variables/Parameters <-------------------------

const svgURL = {
  mapIconUrl: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xml:space="preserve">
  <desc>Created with Fabric.js 1.7.22</desc>
  <defs>
  </defs>
  <g transform="translate(128 128) scale(0.72 0.72)" style="">
    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
    <circle cx="45" cy="45" r="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
    <circle cx="45" cy="45" r="37.5" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(211,135,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
    <path d="M 32.028 54.529 l 12.106 12.106 c 0.478 0.478 1.252 0.478 1.73 0 L 57.96 54.539 c 0.477 -0.477 0.478 -1.25 0.002 -1.728 l -3.343 -3.357 c -0.477 -0.479 -1.252 -0.48 -1.731 -0.002 L 45.86 56.47 c -0.475 0.474 -1.244 0.477 -1.722 0.006 l -7.14 -7.027 c -0.484 -0.476 -1.262 -0.467 -1.735 0.02 l -3.247 3.342 C 31.55 53.291 31.555 54.056 32.028 54.529 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    <path d="M 32.028 35.471 l 12.106 -12.106 c 0.478 -0.478 1.252 -0.478 1.73 0 L 57.96 35.461 c 0.477 0.477 0.478 1.25 0.002 1.728 l -3.343 3.357 c -0.477 0.479 -1.252 0.48 -1.731 0.002 L 45.86 33.53 c -0.475 -0.474 -1.244 -0.477 -1.722 -0.006 l -7.14 7.027 c -0.484 0.476 -1.262 0.467 -1.735 -0.02 l -3.247 -3.342 C 31.55 36.709 31.555 35.944 32.028 35.471 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    <path d="M 23.365 45.864 l 3.355 3.355 c 0.478 0.478 1.252 0.478 1.73 0 l 3.352 -3.352 c 0.478 -0.478 0.478 -1.252 0 -1.73 l -3.355 -3.355 c -0.478 -0.478 -1.252 -0.478 -1.73 0 l -3.353 3.353 C 22.887 44.612 22.887 45.386 23.365 45.864 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    <path d="M 40.781 45.865 l 3.355 3.355 c 0.478 0.478 1.252 0.478 1.73 0 l 3.352 -3.352 c 0.478 -0.478 0.478 -1.252 0 -1.73 l -3.355 -3.355 c -0.478 -0.478 -1.252 -0.478 -1.73 0 l -3.353 3.353 C 40.303 44.613 40.303 45.388 40.781 45.865 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
    <path d="M 58.196 45.865 l 3.355 3.355 c 0.478 0.478 1.252 0.478 1.73 0 l 3.352 -3.352 c 0.478 -0.478 0.478 -1.252 0 -1.73 l -3.355 -3.355 c -0.478 -0.478 -1.252 -0.478 -1.73 0 l -3.353 3.353 C 57.719 44.613 57.719 45.388 58.196 45.865 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,67); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
  </g>
  </g>
  </svg>`,
  mapIconColor: "#cc756b",
  mapIconColorInnerCircle: "#fff",
  pinInnerCircleRadius: 2,
};

const coinIcon = L.divIcon({
  html: L.Util.template(svgURL.mapIconUrl),
  className: "coin-icon animate__animated animate__flash animate__infinite",
  iconAnchor: [25, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
});

//Icon/CSS Settings/Variables/Parameters <-------------------------

//Global MarkerID
//Needed for removing CollectMarkers
let markerId = 0;

//Function Calculate first set of Collect Markers (5 Markers total)
//Creates a Polygon based on location and the radius/boundaries(100)
//CollectMarkers spawn in the Polygon
const calculateAndSetNewResult = (location) => {
  var circle = new L.Circle([location[0], location[1]], { radius: 100 });
  var poly = L.PM.Utils.circleToPolygon(circle, 60);
  var bounds = poly.getBounds();
  var southWest = bounds.getSouthWest();
  var northEast = bounds.getNorthEast();
  var lngSpan = northEast.lng - southWest.lng;
  var latSpan = northEast.lat - southWest.lat;
  var allPoints = new Array(5);
  for (let i = 0; i < 5; i++) {
    let points = {
      lat: southWest.lat + latSpan * Math.random(),
      lng: southWest.lng + lngSpan * Math.random(),
      typeOf: "Collect",
      id: markerId++,
    };
    allPoints.push(points);
  }

  //returns first set of CollectMarkers
  return allPoints;
};

//Function adds CollectMarkers to coords list based on position and radius
const calculateAndAddPoint = (location, list) => {
  //Overwrite location with current position from global state to avoid a bad reference to an old position
  location = window.currentPosition;
  var circle = new L.Circle([location[0], location[1]], { radius: 100 });
  var poly = L.PM.Utils.circleToPolygon(circle, 60);
  var bounds = poly.getBounds();
  var southWest = bounds.getSouthWest();
  var northEast = bounds.getNorthEast();
  var lngSpan = northEast.lng - southWest.lng;
  var latSpan = northEast.lat - southWest.lat;
  let point = {
    lat: southWest.lat + latSpan * Math.random(),
    lng: southWest.lng + lngSpan * Math.random(),
    typeOf: "Collect",
    id: markerId++,
  };
  //Returns the initial List with a new point (CollectMarker) added
  return [...list, point];
};

export const CollectMark = (props) => {
  const [coords, setCoords] = useState(calculateAndSetNewResult(props.my, 1));
  const popupElRef = useRef(null);

  //Handless removing and adding Marker in coords list with 10 seconds delay
  function handleRemove(id) {
    popupElRef.current._close();
    //Removes CollectMarker of the current List
    setCoords((list) => list.filter((item) => item.id !== id));
    //Increment myScore State
    props.setMyScore((currentScore) => currentScore + 1);

    setTimeout(() => {
      //Wait 10 seconds before spawning a new CollectMarker
      setCoords((list) => calculateAndAddPoint(props.my, list));
      console.log(props.my);
      console.log("jetztz");
    }, 10000);
  }

  //Create Audio Object
  const playAudio = () => {
    new Audio(audio).play();
  };

  //Renders All markers
  return (
    <div>
      {coords.map((coord, index) => {
        //Checks distance to Collectmarkers and renders.
        //Distance check is in the return and not a function, because the render stays nearly the same.
        //Button gets diabled if distance condition is not true.
        const a = L.latLng([coord.lat, coord.lng]);
        const b = L.latLng(props.my);

        const distance = a.distanceTo(b);
        const isFarAway = distance > 100;
        const buttonDisabled = isFarAway ? "disabled" : undefined;

        return (
          <Marker
            position={[coord.lat, coord.lng]}
            key={"marker: " + coord.id}
            icon={coinIcon}
          >
            <Popup ref={popupElRef}>
              <button
                disabled={buttonDisabled}
                onClick={() => {
                  handleRemove(coord.id);
                  playAudio();
                }}
              >
                Sammeln
              </button>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};
