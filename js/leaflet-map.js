
// ==========================================
// LEAFLET MAP - VISITED PROVINCES
// ==========================================

// CREATE MAP
const map = L.map("leaflet-map", {
    worldCopyJump: false,
    maxBounds: [
        [-90, -180],
        [90, 180]
    ],
    maxBoundsViscosity: 1.0
}).setView([39.0, 35.0], 6);


// OPENSTREETMAP BASEMAP
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors",
        noWrap: true
    }
).addTo(map);


// DEFAULT VISITED PROVINCES
const defaultVisitedProvinces = [
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


// LOAD SAVED VISITS
const savedProvinces = localStorage.getItem("visitedProvinces");

let visitedProvinces;

try {
    const parsed = savedProvinces === null
        ? null
        : JSON.parse(savedProvinces);

    visitedProvinces = Array.isArray(parsed)
        ? parsed
        : [...defaultVisitedProvinces];
} catch (error) {
    visitedProvinces = [...defaultVisitedProvinces];
}

let provinceLayer;

const homeProvince = "Ankara";

if (!visitedProvinces.includes(homeProvince)) {
    visitedProvinces.push(homeProvince);
    localStorage.setItem(
        "visitedProvinces",
        JSON.stringify(visitedProvinces)
    );
}

// UPDATE COUNTER
function updateCounter() {
    const counter = document.getElementById("visited-count");

    if (counter) {
        counter.textContent = visitedProvinces.length;
    }
}

// Show initial count immediately
updateCounter();


// PROVINCE STYLE
function provinceStyle(feature) {
    const provinceName = feature.properties.il_adi;

    if (provinceName === homeProvince) {
    return {
        color: "#5DADE2",
        weight: 2,
        fillColor: "#89CFF0",
        fillOpacity: 0.65
    };
}

    if (visitedProvinces.includes(provinceName)) {
        return {
            color: "palevioletred",
            weight: 2,
            fillColor: "palevioletred",
            fillOpacity: 0.35
        };
    }

    return {
        color: "#666",
        weight: 1,
        fillColor: "#ffffff",
        fillOpacity: 0.05
    };
}


// ADD OR REMOVE A VISIT
function toggleProvince(provinceName) {

    if (visitedProvinces.includes(provinceName)) {
        visitedProvinces = visitedProvinces.filter(
            name => name !== provinceName
        );
    } else {
        visitedProvinces.push(provinceName);
    }

    localStorage.setItem(
        "visitedProvinces",
        JSON.stringify(visitedProvinces)
    );

    provinceLayer.setStyle(provinceStyle);

    updateCounter();
}


// LOAD PROVINCE BOUNDARIES
fetch("data/turkiye_iller.geojson")
    .then(response => {
        if (!response.ok) {
            throw new Error("GeoJSON could not be loaded");
        }
        return response.json();
    })
    .then(data => {

        provinceLayer = L.geoJSON(data, {

            style: provinceStyle,

            onEachFeature: function(feature, layer) {

                const provinceName = feature.properties.il_adi;

                layer.on("click", function(event) {

                    if (provinceName === homeProvince) {
                        L.popup()
                            .setLatLng(event.latlng)
                            .setContent("<h3>🏠 Ankara</h3><p>I Live Here</p>")
                            .openOn(map);

                        return;
                    }

                    const isVisited =
                        visitedProvinces.includes(provinceName);

                    const popupContent = document.createElement("div");

                    const title = document.createElement("h3");
                    title.textContent = provinceName;

                    const button = document.createElement("button");
                    button.textContent = isVisited
                        ? "Remove Visit"
                        : "I've Visited";

                    button.className = "visit-button";

                    button.addEventListener("click", function() {
                        toggleProvince(provinceName);
                        map.closePopup();
                    });

                    popupContent.appendChild(title);
                    popupContent.appendChild(button);

                    L.popup()
                        .setLatLng(event.latlng)
                        .setContent(popupContent)
                        .openOn(map);
                });
            }

        }).addTo(map);

        updateCounter();

    })
    .catch(error => {
        console.error("GeoJSON could not be loaded:", error);
    });
