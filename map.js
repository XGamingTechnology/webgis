// Prevent
// $(document).ready(function () {
// Deklarasi Variabel URL
let url = {
  openStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  googleSat: "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  vectorUrl: "http://localhost:8090/iserver/services/map-administrasi/rest/maps/Bandung",
  rtrw: "http://localhost:8090/iserver/services/map-RTRW_2/rest/maps/RTRW",
  url1: "http://localhost:8090/iserver/services/data-administrasi/rest/data",
  ortofoto: "http://localhost:8090/iserver/services/map-smtiles-Blok1/rest/maps/Blok1",
};

let ortofoto = L.supermap.tiledMapLayer(url.ortofoto, {
  attribution: '&copy; <a href="">Orthofoto</a> contributors',
  transparent: true,
  wrap: true,
  prjCoordSys: { epsgCode: 3857 },
});

let googleSat = L.tileLayer(url.googleSat, {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  transparent: true,
  prjCoordSys: { epsgCode: 3857 },
});

// Variabel Basemap Untuk Layer Control
let openStreetMap = L.tileLayer(url.openStreetMap, {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

// Variabel Basemap Untuk Layer Control

// Varibael Vektor RTRW
// let rtrw = L.supermap.tiledMapLayer(url.rtrw, {
//   prjCoordSys: { epsgCode: 3857 },
//   onEachFeature: function (feature, layer) {
//     layer.bindPopup("<table class='table'>" + "<tr><th>Id</th><td>" + feature.properties.ID + "</td></tr>" + "<tr><th>Nama</th><td>" + feature.properties.RTRW + "</td></tr>" + "</table>");
//   },
// });

// let rtrw = L.tileLayer.betterWmsRTRW(url.rtrw, {
//   prjCoordSys: { epsgCode: 3857 },
// });

// menginisialisasi Peta pada div dengan id map
var map = L.map("map", {
  maxZoom: 20,
}).setView([-6.84, 107.74], 12);

var layerHasilQuery = [];
// var pointgeo2 = [];
// console.log(pointgeo2);

// variabel vektor untuk layer control
// let ortofoto = L.supermap.tiledMapLayer(url.ortofoto, { prjCoordSys: { epsgCode: 3857 } });

let administrasi = L.supermap.tiledMapLayer(url.vectorUrl, { prjCoordSys: { epsgCode: 3857 } });
let rtrw = L.supermap.tiledMapLayer(url.rtrw, { prjCoordSys: { epsgCode: 3857 } });
// variabel basemap untuk keterangan di layer control
let basemap = {
  OSM: openStreetMap,
  GOOGLE: googleSat,
  Orto: ortofoto,
};

// Basemap Awal Saat halaman dimuat
L.tileLayer(url.googleSat, {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  transparent: true,
  prjCoordSys: { epsgCode: 3857 },
});

// variabel untuk marker cluster
let markers = L.markerClusterGroup();
let dataPointTest = [];
// function untuk mengambil data dari iserver
async function getPoint(url) {
  try {
    const { data } = await axios.get(url);
    // if (data) {
    //   dataPointTest.push(data);
    // }

    // Menambahkan data point ke cluster group
    markers.addLayer(L.marker([data.geometry.points[0].y, data.geometry.points[0].x]).bindPopup(`${data.fieldNames[7]}: ${data.fieldValues[7]}<br>${data.fieldNames[12]}: ${data.fieldValues[12]}`));
    if (data) data;
  } catch (error) {
    // console.log(error);
  }
}

// let rtrw = new L.GeoJSON.AJAX("http://localhost:8090/iserver/services/data-RTRW_2/rest/data/feature/0-0-0.json", {}).addTo(map);

// let rtrw = new L.LayerGroup();

async function getRTRW(url) {
  try {
    const { data } = await axios.get(url);
    // console.log(data);
    // rtrw.addLayer(L.polygon([data.geometry.points[0].x, data.geometry.points.y], { prjCoordSys: { epsgCode: 3857 } }));
    // L.geoJson(data).addTo(map);
    // console.log(data.geometry.coordinates[0][4]);
    // let latlngs = [[11971900.96, -777880.05]];
    // console.log(latlngs);
    // let polygon = L.polygon(latlngs, { color: "red", prjCoordSys: { epsgCode: 3857 } }).addTo(map);
    // map.fitBounds(polygon.getBounds());

    // rtrwtest = L.marker.pane([data.geometry.points[0].y, data.geometry.points[0].x]).bindPopup(`${data.fieldNames[7]}: ${data.fieldValues[7]}<br>${data.fieldNames[12]}: ${data.fieldValues[12]}`);
    // L.geoJSON(data, {
    //   style: function (feature) {
    //     switch (feature.properties.RTRW) {
    //       case "Pemukiman":
    //         return { color: "#ff0000" };
    //       case "Democrat":
    //         return { color: "#0000ff" };
    //     }
    //   },
    // }).addTo(map);
  } catch (error) {
    // console.log(error);
  }
}

// getRtrw("http://localhost:8090/iserver/services/data-RTRW/rest/data/datasources/DATA/datasets/RTRW/features/1.geojson");

// Pengulangan untuk penyesuaian url data point
for (let i = 1; i <= 425; i++) {
  let dataUrl = `http://localhost:8090/iserver/services/data-Sebaran-Asset/rest/data/feature/0-0-${i}.json`;

  dataPointTest.push(getPoint(dataUrl));
}

// Pengulangan untuk penyesuaian URL DATA RTRW
// for (let i = 1; i <= 61; i++) {
//   let dataUrl2 = `http://localhost:8090/iserver/services/data-RTRW_2/rest/data/feature/0-0-${i}.json`;
//   getRTRW(dataUrl2);
// }

// Variabel vektor data untuk cluster group
let vector = {
  administrasi: administrasi,
  points: markers,
  "RTRW Kota Bandung": rtrw,
  // orto: ortofoto,
};

// let ort = {
//   ortofoto2: ortofoto,
// };

// Menambahkan layer Markers cluster group ke map utama
// map.addLayer(markers);
// map.addLayer(rtrw);

// Menambahkan fitur control layer dan control vektor
L.control.layers(basemap, vector).addTo(map);
// Menambahkan fitur opactiy layer group
L.control
  .opacity(vector, basemap, {
    label: "Layers Opacity",
  })
  .addTo(map);
// });

map.on("click", function (e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  const point2 = new SuperMap.Geometry.Point(lat, lng);
  console.log(point2);

  query(point2);
});
function query(point2) {
  // let point = new SuperMap.Geometry.Point(107.613, -6.91);
  // let point = new SuperMap.Geometry.Point(lat, lng);
  point2 = L.point(point2.y, point2.x);
  console.log(point2, "ini dari function");
  var param = new SuperMap.QueryByGeometryParameters({
    queryParams: { name: "Administrasi@Polygon.1" },
    geometry: point2,
  });

  var urlMap = "http://localhost:8090/iserver/services/map-administrasi/rest/maps/Bandung";

  // if (checklayerctive === "administasi "){
  //   urlMap = "http://localhost:8090/iserver/services/map-administrasi/rest/maps/Bandung";
  // }
  // else(checklayerctive === "rdtr "){
  //   urlMap = "http://localhost:8090/iserver/services/map-administrasi/rest/maps/rdtr";
  // }

  L.supermap
    .queryService(urlMap) //url dari map service yang akan dicari
    .queryByGeometry(param, function (serviceResult) {
      var result = serviceResult.result;
      console.log("hasilnya ", result);
      //misal tampikan popup dari result
      console.log(result.recordsets[0].features.features[0].properties.KECAMATAN);

      var resultLayer = L.geoJSON(result.recordsets[0].features, {
        style: function (feature) {
          return {
            color: "#fff",
            weight: 0.1,
            fillColor: "#fff",
            fillOpacity: 0.5,
          };
        },
        onEachFeature: function (feature, layer) {
          var tampil = "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>";

          for (var k in result.recordsets[0].features.features[0].properties) {
            if (k !== "SmID") {
              tampil += "<tr><th style='width:30%;'>" + k + "</th>" + "<td>" + result.recordsets[0].features.features[0].properties[k] + "</td></tr>";
            }
          }
          tampil += "</table>";

          layer.bindPopup(tampil);
          // layer.on("click", function (e) {
          //   $("#feature-title").html("GARDU REDEB");
          //   $("#feature-info").html(tampil);
          //   $("#featureModal").modal("show");
          // });

          // layer.on({
          //   mouseover: function (e) {
          //     var layer = e.target;
          //     layer.setStyle({
          //       weight: 1,
          //       color: "#000",
          //       dashArray: "",
          //       fillColor: "#ff0000",
          //       fillOpacity: 0.8,
          //     });
          //     if (!L.Browser.ie && !L.Browser.opera) {
          //       layer.bringToFront();
          //     }
          //   },
          //   mouseout: function (e) {
          //     resultLayer.resetStyle(e.target);
          //   },
          // });
        },
      });

      if (layerHasilQuery.length > 0) {
        layerHasilQuery[0].remove();
        layerHasilQuery = [];
      }

      layerHasilQuery.push(resultLayer);
      map.addLayer(resultLayer);

      resultLayer.eachLayer(function (feature) {
        //geojson is the object which have your data

        feature.openPopup();
        console.log("open popup");
        // break;//exit loop once it opens the popup
      });

      // map.removeLayer(resultLayer);
      // resultLayer;
      //   administrasi.addLayer(resultLayer);
    });
}

// var zoom_bar = new L.Control.ZoomBar({position: 'topright'}).addTo(map);

// function getCenterAndZoom(){
//   console.log("Lat: "+map.getCenter().lat);
//   console.log("Lon: "+map.getCenter().lng);
//   console.log("Zoom: "+map.getZoom());
//   alert("Lat: "+map.getCenter().lat+"\nLon: "+map.getCenter().lng+"\nZoom: "+map.getZoom());
// }
//   L.supermap
//     .queryService("http://localhost:8090/iserver/services/map-administrasi/rest/maps/Bandung") //url dari map service yang akan dicari
//     .queryByGeometry(param, function (serviceResult) {
//       var result = serviceResult.result;
//       console.log("hasilnya ", result);
//       //misal tampikan popup dari result
//       console.log(result.recordsets[0].features.features[0].properties.KECAMATAN);
//       resultLayer = L.geoJSON(result.recordsets[0].features, {
//         onEachFeature: function (feature, layer) {
//           layer.bindPopup(`ID : ${result.recordsets[0].features.features[0].properties.SmID} <br> KECAMATAN : ${result.recordsets[0].features.features[0].properties.KECAMATAN}`);
//         },
//         if(resultLayer) {
//           resultLayer.remove();
//         },
//       }).addTo(map);
//       resultLayer;
//     });
// }

// map.on("click", function (e) {
//   let lat = e.latlng.lat;
//   let lng = e.latlng.lng;
//   let point = new SuperMap.Geometry.Point(lat, lng);
//   console.log(point);
//   query(point);
// });
// // query();
// function query(point) {
//   // let point = new SuperMap.Geometry.Point(107.613, -6.91);
//   // let point = new SuperMap.Geometry.Point(lat, lng);
//   point = L.point(point.y, point.x);
//   console.log(point, "ini dari function2");
//   var param = new SuperMap.QueryByGeometryParameters({
//     queryParams: { name: "RTRW@RTRW_2.1" },
//     geometry: point,
//   });

//   L.supermap
//     .queryService("http://localhost:8090/iserver/services/map-RTRW_2/rest/maps/RTRW") //url dari map service yang akan dicari
//     .queryByGeometry(param, function (serviceResult) {
//       var result = serviceResult.result;
//       console.log("hasilnya ", result);
//       //misal tampikan popup dari result
//       console.log(result.recordsets[0].features.features[0].properties.RTRW);
//       resultLayer = L.geoJSON(result.recordsets[0].features, {
//         onEachFeature: function (feature, layer) {
//           layer.bindPopup(`ID : ${result.recordsets[0].features.features[0].properties.SmID} <br> RTRW : ${result.recordsets[0].features.features[0].properties.RTRW}`);
//         },
//       }).addTo(map);
//       resultLayer;
//     });
// }

// function query() {
//   // let point = new SuperMap.Geometry.Point(107.613, -6.91);
//   // let point = new SuperMap.Geometry.Point(lat, lng);
//   point = L.point(107.613, -6.91);
//   console.log(point);
//   var param = new SuperMap.QueryByGeometryParameters({
//     queryParams: { name: "Adminsitrasi@Bandung.1" }, //ganti dengan nama layer @ nama map
//     geometry: point,
//   });

//   // var param = new SuperMap.QueryByGeometryParameters({
//   //   queryParams: { name: "Administrasi@Bandung" },
//   //   geometry: polygon,
//   // });
//   L.supermap.queryService(url2).queryByGeometry(param, function (serviceResult) {
//     var result = serviceResult.result;
//     resultLayer = L.geoJSON(result.recordsets[0].features).addTo(map);
//   });
// }

// L.geoJson;
// var pointgeo2 = new L.featureGroup(); //layer contain searched elements

// // function untuk mengambil data dari iserver
// async function getPoint2(url) {
//   try {
//     const { data } = await axios.get(url);
//     console.log(data, "data async2");

//     pointgeo2 = {
//       pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {
//           icon: L.divIcon({
//             className: properties.RUAS,
//             iconSize: L.point(16, 16),
//             html: feature.properties.amenity[0].toUpperCase(),
//           }),
//         }).bindPopup(feature.properties.amenity + "<br><b>" + feature.properties.name + "</b>");
//       },
//     };

//     // Menambahkan data point ke cluster group
//     // pointgeo2.addLayer(L.marker([data.geometry.points[0].y, data.geometry.points[0].x]).bindPopup(`${data.fieldNames[5]}: ${data.fieldValues[5]}<br>${data.fieldNames[12]}: ${data.fieldValues[12]}`));
//     // console.log(pointgeo2, "pin");
//   } catch (error) {}
// }
// let testData;

// for (let i = 1; i <= 20; i++) {
//   let dataUrl4 = `http://localhost:8090/iserver/services/data-JalanBandung/rest/data/feature/0-1-${i}.geojson`;
//   testData = getPoint2(dataUrl4);
//   getPoint2(dataUrl4);
// }

// var poiLayers = L.layerGroup();

// L.control
//   .search({
//     layer: poiLayers,
//     initial: false,
//     propertyName: "name",
//     buildTip: function (text, val) {
//       var type = val.layer.feature.properties.amenity;
//       return '<a href="#" class="' + type + '">' + text + "<b>" + type + "</b></a>";
//     },
//   })
//   .addTo(map);
console.log(markers);
var controlSearch = new L.Control.Search({
  position: "topright",
  layer: markers,
  initial: false,
  zoom: 12,
  marker: false,
});

map.addControl(controlSearch);
console.log(dataPointTest, "=======================");
