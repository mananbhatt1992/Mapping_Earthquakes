// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);


let airportData="https://raw.githubusercontent.com/mananbhatt1992/Mapping_Earthquakes/main/torontoRoutes.json"

let light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
 "Day Navigation" : light,
"Night Navigation": dark
};

let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark]
});
// Pass our map layers into our layers con
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    style : myStyle,
    onEachFeature: function(feature,layer) {
      console.log(layer)
      layer.bindPopup("<h2> Airline+ :" + feature.properties.airline + "</h2> <hr> <h3> Destination :"+ feature.properties.dst + "</h3>")
    }
  }).addTo(map);
});