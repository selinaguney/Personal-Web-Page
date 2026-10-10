// ==========================================
// OPENLAYERS MAP - MAJOR LAKES OF TÜRKİYE
// ==========================================

const openLayersMap = new ol.Map({

    target: "openlayers-map",

    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                wrapX: false
            })
        })
    ],

    view: new ol.View({

        // Türkiye centered
        center: ol.proj.fromLonLat([
            35.0,
            39.0
        ]),

        zoom: 6,

        // Prevent repeating world map
        extent: ol.proj.transformExtent(
            [-180, -85, 180, 85],
            "EPSG:4326",
            "EPSG:3857"
        )

    })

});


// ==========================================
// MAJOR LAKES
// ==========================================

const lakes = [

    { name: "Lake Van", lat: 38.64, lng: 42.82 },
    { name: "Tuz Lake", lat: 38.75, lng: 33.35 },
    { name: "Lake Beyşehir", lat: 37.75, lng: 31.50 },
    { name: "Lake Eğirdir", lat: 38.05, lng: 30.85 },
    { name: "Lake Burdur", lat: 37.73, lng: 30.18 }

];


// ==========================================
// CREATE LAKE FEATURES
// ==========================================

const lakeFeatures = lakes.map(function(lake) {

    return new ol.Feature({

        geometry: new ol.geom.Point(
            ol.proj.fromLonLat([
                lake.lng,
                lake.lat
            ])
        ),

        name: lake.name

    });

});


// ==========================================
// VECTOR SOURCE
// ==========================================

const lakeSource = new ol.source.Vector({

    features: lakeFeatures,
    wrapX: false

});


// ==========================================
// LAKE MARKER STYLE
// ==========================================

const lakeStyle = new ol.style.Style({

    image: new ol.style.Circle({

        radius: 9,

        fill: new ol.style.Fill({
            color: "rgba(30, 144, 255, 0.75)"
        }),

        stroke: new ol.style.Stroke({
            color: "white",
            width: 2
        })

    })

});


// ==========================================
// LAKE VECTOR LAYER
// ==========================================

const lakeLayer = new ol.layer.Vector({

    source: lakeSource,

    style: lakeStyle,

    // Markers appear from zoom level 6
    minZoom: 5

});


// ==========================================
// ADD LAKES TO MAP
// ==========================================

openLayersMap.addLayer(lakeLayer);