// ==========================================
// CITIES I HAVE VISITED
// ==========================================

const visitedCities = [
    { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
    { name: "Izmir", lat: 38.4237, lng: 27.1428 },
    { name: "Kocaeli", lat: 40.7654, lng: 29.9408 },
    { name: "Trabzon", lat: 41.0027, lng: 39.7168 },
    { name: "Rize", lat: 41.0255, lng: 40.5177 },
    { name: "Mugla", lat: 37.2153, lng: 28.3636 },
    { name: "Antalya", lat: 36.8969, lng: 30.7133 },
    { name: "Corum", lat: 40.5506, lng: 34.9556 },
    { name: "Mardin", lat: 37.3129, lng: 40.7350 },
    { name: "Duzce", lat: 40.8438, lng: 31.1565 },
    { name: "Bartin", lat: 41.6344, lng: 32.3375 },
    { name: "Eskisehir", lat: 39.7767, lng: 30.5206 },
    { name: "Kayseri", lat: 38.7225, lng: 35.4875 },
    { name: "Vienna", lat: 48.2082, lng: 16.3738 },
    { name: "Prague", lat: 50.0755, lng: 14.4378 }
];


// ==========================================
// CREATE LEAFLET MAP
// ==========================================

const map = L.map("leaflet-map", {
    worldCopyJump: false,

    maxBounds: [
        [-90, -180],
        [90, 180]
    ],

    maxBoundsViscosity: 1.0

}).setView([42.0, 27.0], 5);


// ==========================================
// OPENSTREETMAP BASEMAP
// ==========================================

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        noWrap: true
    }
).addTo(map);


// ==========================================
// RED FLAG ICON
// ==========================================

const flagIcon = L.divIcon({
    className: "flag-marker",
    html: "🚩",
    iconSize: [32, 32],
    iconAnchor: [8, 28]
});


// ==========================================
// CITY MARKERS
// ==========================================

const cityMarkers = L.layerGroup();

visitedCities.forEach(function(city) {

    const marker = L.marker(
        [city.lat, city.lng],
        {
            icon: flagIcon
        }
    );

    marker.addTo(cityMarkers);

});


// ==========================================
// SHOW / HIDE MARKERS ACCORDING TO ZOOM
// ==========================================

function updateMarkers() {

    const zoomLevel = map.getZoom();

    if (zoomLevel >= 5) {

        if (!map.hasLayer(cityMarkers)) {
            cityMarkers.addTo(map);
        }

    } else {

        if (map.hasLayer(cityMarkers)) {
            map.removeLayer(cityMarkers);
        }

    }
}


// Run once when the page opens
updateMarkers();


// Run every time zoom changes
map.on("zoomend", updateMarkers);

// ==========================================
// VISITED PROVINCES - GEOJSON
// ==========================================

const visitedProvinces = [
    "İstanbul",
    "İzmir",
    "Kocaeli",
    "Trabzon",
    "Rize",
    "Muğla",
    "Antalya",
    "Çorum",
    "Mardin",
    "Düzce",
    "Bartın",
    "Eskişehir",
    "Kayseri"
];


// Load province boundaries
fetch("data/turkiye_iller.geojson")
    .then(response => response.json())
    .then(data => {

        L.geoJSON(data, {

            style: function(feature) {

                const provinceName = feature.properties.il_adi;

                // Visited province
                if (visitedProvinces.includes(provinceName)) {

                    return {
                        color: "palevioletred",
                        weight: 2,
                        fillColor: "palevioletred",
                        fillOpacity: 0.20
                    };

                }

                // Provinces I have not visited
                return {
                    color: "transparent",
                    weight: 0,
                    fillOpacity: 0
                };
            },

            onEachFeature: function(feature, layer) {

                const provinceName = feature.properties.il_adi;

                if (visitedProvinces.includes(provinceName)) {

                }
            }

        }).addTo(map);

    })
    .catch(error => {
        console.error("GeoJSON could not be loaded:", error);
    });