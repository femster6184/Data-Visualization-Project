// Creating the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
  
  //Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

//get colors for depth
function getColor(airQ) {
    if (airQ >= 500) {
        return "#500000";
    } else if (airQ >= 300) {
        return "#874411";
    } else if (airQ >= 200) {
        return "#c99b2c";
    } else if (airQ >= 150) {
        return "#eecc4f";
    } else if (airQ >= 100) {
        return "#fff444";
    } else if (airQ >= 50) {
        return "#98ff0c";
    }
}


d3.csv('CSVs/GlobalWeatherRepository-Darrick.csv', function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
    }

        L.circleMarker([data["latitude"], data["longitude"]], {
          radius: 5,
          color: getColor(data["air_quality"]),
          fillOpacity: 1
        })
        .bindPopup(`<h3>Country: ${data["county"]}, Location: ${data["locationName"]}, Air Quality PM2.5: ${data["air_quality"]}</h3>`)
        .addTo(myMap);
    });

    
// create the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var airQ = [50, 100, 150, 200, 300, 500];
    
        for (var i=0; i<airQ.length; i++){
        
        div.innerHTML +=
       "<i style='background: " + getColor(airQ[i] + 1) + "'></i> " +
       airQ[i] + (airQ[i + 1] ? "&ndash;" + airQ[i + 1] + "<br>" : "+");
    }   
    return div; 
    };
    
    legend.addTo(myMap);
;