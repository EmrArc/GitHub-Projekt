import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

//Icon Settings/Variables/Parameters <-------------------------

const myCustomColourNear = "#5cf0f2";

const myCustomColourFar = "#2b2e33";

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

//Icon Settings/Variables/Parameters <-------------------------

export const JobMarker = ({ createdMarkerList, markerPos }) => {
  //Create JobMarker depending on markerPos and createdMarkerList (inputs from createJobMarker Component)
  const point = [markerPos[0], markerPos[1]];

  //Calculate tempFar, tempClose depending on distance between two points
  const [tempFar, tempClose] = useMemo(() => {
    const far = new Array();
    const close = new Array();
    console.log(createdMarkerList);
    createdMarkerList.forEach((x, i) => {
      const distance = dist(point, [x.lat, x.long]);
      if (distance < 101) {
        let points1 = {
          lat: x.lat,
          long: x.long,
          autor: x.autor,
          quest: x.quest,
        };
        close.push(points1);
      } else {
        let points2 = {
          lat: x.lat,
          long: x.long,
          autor: x.autor,
          quest: x.quest,
        };
        far.push(points2);
      }
    });

    return [far, close];
  });

  //render tempClose and tempFar and update when markerPos changes
  return (
    <div>
      {/**Renders Markers inside radius*/}
      {tempClose.map((coords, i) => {
        return (
          <Marker
            key={i}
            index={i}
            position={[coords.lat, coords.long]}
            icon={iconStyleNear}
          >
            <Popup>
              <span>Autor : {coords.autor}</span>
              <br />
              <span>Quest : {coords.quest}</span>
            </Popup>
          </Marker>
        );
      })}
      {/**Renders Markers outside radius*/}
      {[
        tempFar.map((x, i) => {
          return (
            <Marker
              key={i}
              index={i}
              position={[x.lat, x.long]}
              icon={iconStyleFar}
            >
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
