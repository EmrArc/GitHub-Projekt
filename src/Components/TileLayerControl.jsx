import { useState } from "react";
import { TileLayer, LayersControl } from "react-leaflet";

export const TileControl = () => {
  //Set different Tile Layers
  //Tile Layers are different set of tiles which added together equals the mao
  //"Picture of the Map"
  //Internet Connection needed
  const layers = [
    {
      name: "Standard",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
      name: "NightMode",
      url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
    },
    {
      name: "White",
      url: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
    },
  ];
  return (
    <LayersControl position="bottomright">
      {layers.map((layer, index) => {
        return (
          <LayersControl.BaseLayer
            key={index}
            checked={index === 0 ? true : false}
            name={layer.name}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={layer.url}
            />
          </LayersControl.BaseLayer>
        );
      })}
    </LayersControl>
  );
};
