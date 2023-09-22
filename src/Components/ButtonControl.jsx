import { useEffect } from "react";
import L from "leaflet";

export const ControlButton = ({
  map,
  setQuestDialogOpen,
  setRaindrops,
  setSnowdrops,
  setCreateMarkerWindow,
}) => {
  //Create a Control over the Map using React-Leaflet function
  useEffect(() => {
    if (!map) return;
    //Adds Quest Button to open Quest Dialog
    const questListButton = L.Control.extend({
      options: {
        position: "topright",
      },
      onAdd: function () {
        //Create Button
        const btn = L.DomUtil.create("button", "notification");
        btn.textContent = "Quest 📋";
        btn.setAttribute(
          "style",
          "background-color: transparent; width: 100px; height: 100px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
        );
        //Scale Button on Mouse Over
        btn.onmouseover = function () {
          this.style.transform = "scale(1.3)";
        };
        btn.onmouseout = function () {
          this.style.transform = "scale(1)";
        };
        //Open Quest Dialog
        btn.onclick = function () {
          setQuestDialogOpen(true);
        };
        return btn;
      },
    });

    //Adds Regen Button to trigger Rain Animation
    const triggerRainAnimationButton = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        //Create Button
        const btn = L.DomUtil.create("button");
        btn.textContent = "Regen 💧";
        btn.setAttribute(
          "style",
          "background-color: transparent; width: 110px; height: 110px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
        );
        //Scale Button on Mouse Over
        btn.onmouseover = function () {
          this.style.transform = "scale(1.3)";
        };
        btn.onmouseout = function () {
          this.style.transform = "scale(1)";
        };
        //Open Quest Dialog
        btn.onclick = function () {
          setRaindrops(200);
          setSnowdrops(0);
        };
        return btn;
      },
    });

    //Adds Sun Button to turn off active animations (default/no Animation)
    const triggerDefault = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        //Create Button
        const btn = L.DomUtil.create("button");
        btn.textContent = "Sonne 🔅";
        btn.setAttribute(
          "style",
          "background-color: transparent; width: 110px; height: 110px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
        );
        //Scale Button on Mouse Over
        btn.onmouseover = function () {
          this.style.transform = "scale(1.3)";
        };
        btn.onmouseout = function () {
          this.style.transform = "scale(1)";
        };
        //Open Quest Dialog
        btn.onclick = function () {
          setRaindrops(0);
          setSnowdrops(0);
        };
        return btn;
      },
    });

    //Adds Snow Button to trigger Snow Animation
    const triggerSnowAnimationButton = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        //Create Button
        const btn = L.DomUtil.create("button");
        btn.textContent = "Schnee ⛄";
        btn.setAttribute(
          "style",
          "background-color: transparent; width: 110px; height: 110px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
        );
        //Scale Button on Mouse Over
        btn.onmouseover = function () {
          this.style.transform = "scale(1.3)";
        };
        btn.onmouseout = function () {
          this.style.transform = "scale(1)";
        };
        //Open Quest Dialog
        btn.onclick = function () {
          setSnowdrops(200);
          setRaindrops(0);
        };
        return btn;
      },
    });

    //Adds Create Marker Button
    const createMarkerButton = L.Control.extend({
      options: {
        position: "topright",
      },

      onAdd: function () {
        //Create Button
        const btn = L.DomUtil.create("button");
        btn.textContent = "Create Marker 🔧";
        btn.setAttribute(
          "style",
          "background-color: transparent; width: 110px; height: 110px; border: none; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;"
        );
        //Scale Button on Mouse Over
        btn.onmouseover = function () {
          this.style.transform = "scale(1.3)";
        };
        btn.onmouseout = function () {
          this.style.transform = "scale(1)";
        };
        //Open Quest Dialog
        btn.onclick = function () {
          setCreateMarkerWindow(true);
        };
        return btn;
      },
    });

    //Adds Button on the Map
    //React Leaflet Function
    map.addControl(new questListButton());
    map.addControl(new triggerRainAnimationButton());
    map.addControl(new triggerDefault());
    map.addControl(new triggerSnowAnimationButton());
    map.addControl(new createMarkerButton());
  }, [map]);

  return null;
};
