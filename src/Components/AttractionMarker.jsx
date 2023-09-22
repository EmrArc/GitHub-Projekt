import { Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import attraction from "../geoData/koelnSehenswürdigkeiten.json";
import { Icon } from "leaflet";
import L from "leaflet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./style.css";

// Quest List:

const questList = [
  "Laufe 10 Kilometer",
  "Besuche 10 Sehenswürdigkeiten",
  "Sammel 10 Münzen",
];

//Icon Settings/Variables/Parameters <-------------------------

delete L.Icon.Default.prototype._getIconUrl;

const myCustomColourNear = "#5cf0f2";

const myCustomColourFar = "#828282";

const markerHtmlStylesNear = `
  background-color: ${myCustomColourNear};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const markerHtmlStylesFar = `
  background-color: ${myCustomColourFar};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const iconStyleNear = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStylesNear}" />`,
});

const iconStyleFar = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStylesFar}" />`,
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

//Icon Settings/Variables/Parameters <-------------------------

export const AttractionMark = (props) => {
  console.log(props);
  const point = [props.from[0], props.from[1]];
  //Creating AttractionMarkers via useMemo Hook
  //useMemo memorizes the values and only renders if these specific Values are changed
  const [tempFar, tempClose] = useMemo(() => {
    const far = new Array();
    const close = new Array();

    //Calculate distance and update State
    attraction.features.forEach((x, i) => {
      const distance = dist(point, [x.geometry.y, x.geometry.x]);
      if (distance < 101) {
        let points1 = {
          lat: x.geometry.y,
          long: x.geometry.x,
          id: x.attributes.objectid,
          name: x.attributes.name,
          adresse: x.attributes.adresse,
          stadtbezirk: x.attributes.stadtbezirk,
          stadtteil: x.attributes.stadtteil,
          stadtviertel: x.attributes.stadtviertel,
          plz: x.attributes.postleitzahl,
          ident: 0,
          quest: randomQuest(),
          completed: false,
        };
        close.push(points1);
      } else {
        let points2 = {
          lat: x.geometry.y,
          long: x.geometry.x,
          id: x.attributes.objectid,
          name: x.attributes.name,
          adresse: x.attributes.adresse,
          stadtbezirk: x.attributes.stadtbezirk,
          stadtteil: x.attributes.stadtteil,
          stadtviertel: x.attributes.stadtviertel,
          plz: x.attributes.postleitzahl,
          ident: 1,
          quest: randomQuest(),
          completed: false,
        };
        far.push(points2);
      }
    });

    //returns a list with Markers that are out of radius(far) and Markers inside the radius(close)
    return [far, close];
  }, [point?.[0], point?.[1]]);

  //Renders Attracktion Markers
  return (
    <div>
      {[
        tempClose.map((x, i) => {
          return (
            <Marker
              key={i}
              index={i}
              position={[x.lat, x.long]}
              icon={iconStyleNear}
            >
              <Popup>
                <Tabs>
                  <TabList>
                    <Tab>Sehenswürdigkeit</Tab>
                    <Tab>Quest</Tab>
                  </TabList>
                  <TabPanel key={1}>
                    <span>
                      Name : {x.name}
                      <br></br>
                    </span>
                    <span>
                      Adresse : {x.adresse}
                      <br></br>
                    </span>
                    <span>
                      Stadtbezirk: {x.stadtbezirk}
                      <br></br>
                    </span>
                    <span>
                      Stadtteil: {x.stadtteil}
                      <br></br>
                    </span>
                    <span>
                      Stadtviertel: {x.stadtviertel}
                      <br></br>
                    </span>
                    <span>
                      Längengrad: {x.lat}
                      <br></br>
                    </span>
                    <span>
                      Breitengrad: {x.long}
                      <br></br>
                    </span>
                  </TabPanel>
                  <TabPanel key={2}>
                    <p id="tab-quest-name">{x.quest}</p>
                    <button
                      disabled={x.completed}
                      onClick={(e) => {
                        props.setQuestList((current) => [...current, x.quest]);
                        x.completed = true;
                        props.setVisitedScore(
                          (currentScore) => currentScore + 1
                        );
                        //e.target.disabled = true;
                      }}
                    >
                      Quest abholen und Sehenswürdigkeit besuchen
                    </button>
                  </TabPanel>
                </Tabs>
              </Popup>
            </Marker>
          );
        }),
      ]}
      {[
        tempFar.map((x, i) => {
          return (
            <Marker key={i} position={[x.lat, x.long]} icon={iconStyleFar}>
              <Popup>Zu Weit Weg</Popup>
            </Marker>
          );
        }),
      ]}
    </div>
  );
};

//Calculate distance between two Points
function dist(from, to) {
  var fromLatLng = L.latLng(from);
  var toLatLng = L.latLng(to);

  var dis = fromLatLng.distanceTo(toLatLng);
  return dis;
}

//Add random Quest to QuestList
function randomQuest() {
  const random = Math.min(
    Math.floor(Math.random() * questList.length),
    questList.length - 1
  );

  return questList[random];
}
