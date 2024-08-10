var mapa = L.map('map').setView([10.020352264171915, -84.2101933427905], 17);

var marker = L.marker([10.020352264171915, -84.2101933427905]).addTo(mapa);

marker.bindPopup("Nuestra sucursal").openPopup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);