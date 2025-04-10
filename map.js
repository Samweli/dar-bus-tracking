var map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    noWrap: true,
    minZoom: 2
}).setView([-6.824085, 39.269514], 12);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// Show bus routes
var busRouteFeatures = busRoutes.features;
var busRoutesFeatureGroup = L.featureGroup().addTo(map);

var busIconGreen = L.icon({
    iconUrl: 'img/minibus_green.svg',
    iconSize: [20, 20], // size of the icon
});

var busIconOrange = L.icon({
    iconUrl: 'img/minibus_orange.svg',
    iconSize: [20, 20], // size of the icon
});

var count = 0;

function addRoute(feature) {
    var polyline = L.polyline([], {
        color: "#3282c4",
        weight: 2,
        opacity: 0.8
    }).addTo(busRoutesFeatureGroup);

    var busMarker = L.marker([0, 0], {
        icon: busIconOrange
    }).addTo(map);
    $(".route-count").css("color", "#ff9433");

    busMarker.bindPopup(String(feature.properties.route_id));
    count += 1;

    var j = 0;
    add();

    function add() {
        point = L.latLng(
            feature.geometry.coordinates[j][1],
            feature.geometry.coordinates[j][0])

        busMarker.setLatLng(point);
        if (j == 15) {
            busMarker.setIcon(busIconGreen);
            $(".route-count").css("color", "#3282c4");
        }

        polyline.addLatLng(point);
        if (++j < feature.geometry.coordinates.length) setTimeout(add, 50);
    }
}

var i = 1;

var speed = 5000;

function addRoutes() {
    addRoute(busRouteFeatures[i]);
    $(".route-count").text(" " + i);

    if (i > 1) {
        speed -= 2000;
    };
    if (speed < 150) {
        speed = 150
    }
    console.log(speed);
    if (++i < busRouteFeatures.length) setTimeout(addRoutes, speed);
}



// Explore function
function explore() {
    $(".fill-darkblue").toggleClass("intro")
}

// Init
$(".js-explore").click(function() {
    explore();
    addRoutes();
});
