
const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
}
const csvUrl = 'assets/data/locs.csv';

let travers = 0;
// --------------------------------------------------------------------


var aoiLayer = L.geoJSON(states, {
    style: styleAoi,
    onEachFeature: onEachAoi,
});


var markers = L.layerGroup();

var map = L.map('map', {
    maxBounds: aoiLayer.getBounds(),
    maxBoundsViscosity: 1.0,
    layers: [basemapCarto, aoiLayer, markers]
});
map.options.minZoom = 4;
map.fitBounds(aoiLayer.getBounds());
var baseLayers = {
    'Carto': basemapCarto,
    'Google': googleTerrain,
    'Street': Esri_WorldStreetMap,
};


var marker_geojson = { "type": "FeatureCollection" }

fetchText(csvUrl).then(text => {
    let pois = d3.csvParse(text);
    // console.log(pois);
    let features = [];

    for (i = 0; i < pois.length; i++) {
        if(pois[i].latlon=='')
            continue;
        let latlng = pois[i].latlon.split(',')
        let feature = {
            "type": "Feature",
            "properties": {
                "id": pois[i].sl                ,
                "name": pois[i].name,
                "address": pois[i].address,
                "phone": pois[i].phone
            },
            "geometry": { "type": "Point", "coordinates": [parseFloat(latlng[1]), parseFloat(latlng[0])] }
        };
        features.push(feature);
    }
    marker_geojson.features = features;

    // console.log(marker_geojson);

    L.geoJSON(marker_geojson, {
        style: styleAoi,
        onEachFeature: onEachMarker,
    }).addTo(markers);

});

var overlays = {
    'States': aoiLayer,
    'Locations': markers
};

var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

L.easyButton('fa-home fa-lg', function () {
    map.fitBounds(aoiLayer.getBounds());
}).addTo(map);

