// Creating the map object
let myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });
  
  //Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

//get colors for air quality
function getColor(airQ) {
    if (airQ >= 300) {
        return "#490e4f";
    } else if (airQ >= 200) {
        return "#a60afa";
    } else if (airQ >= 150) {
        return "#c41e3a";
    } else if (airQ >= 100) {
        return "#f1c232";
    } else if (airQ >= 50) {
        return "#98ff0c";
    } else { 
        return "#35f8f2";
    }
}

//get average of air quality from multiple instance of same location
function getAvg(data)
{
    m = {};
    for( var i = 0; i<data[1].length; i++){
        if (m[data[1][i]]===undefined)
        { 
            m[data[1][i]]={count:0, value:0};
        }
        m[ data[1][i] ].value += data[2][i];
        m[ data[1][i] ].count++;
    }
    var meanData=[[],[],[],[],[]];
    for (var id in m)
    {
        meanData[1].push(id);
        meanData[4].push(Math.round(m[id].count!=0?m[id].value/m[id].count:0));
    }
    return meanData;
}

//remove dupes and create updated array
function removeDupes(data, mData) {
    for( var c = 0; c < mData[1].length; c++){    
        for( var i = 0; i<data[0].length; i++){
            if (mData[1][c] === data[1][i]){
                mData[0].push(data[0][i])
                mData[2].push(data[3][i])
                mData[3].push(data[4][i])
                break;
            }

        }
    }
    return mData;
}

//create markers
function createMarkers(nData){
    for( var i = 0; i<nData[1].length; i++) {

        L.circleMarker([nData[2][i], nData[3][i]], {
        radius: -2.1E-5*(nData[4][i])^2 + 0.05*(nData[4][i]) + 2,
        color: getColor(nData[4][i]),
        fillOpacity: 1
        })
        .bindPopup(`<h3>Country: ${nData[0][i]}, Location: ${nData[1][i]}, Air Quality PM10: ${nData[4][i]}</h3>`)
        .addTo(myMap);
    }

}

//imort Data
d3.json('static/js/weather_data.json').then(function(data) {
    var wData = [[],[],[],[],[]]

    for (var i = 0; i < Object.keys(data).length; i++) {
        wData[0].push(data[i]["Country"])
        wData[1].push(data[i]["Location Name"])
        wData[2].push(Number(data[i]["Air Quality PM10"]))
        wData[3].push(Number(data[i]["Latitude"]))
        wData[4].push(Number(data[i]["Longitude"]))
    }
    
    var mData = getAvg(wData)
    var nData = removeDupes(wData, mData)

    createMarkers(nData)
    
});
    
// create the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    var airQ = [0, 50, 100, 150, 200, 300];
    var label = ["Good","Moderate","Unhealthy for Sensistive Groups","Unhealthy","Very Unhealthy","Hazardous"]
    
        for (var i=0; i<airQ.length; i++){
        
            div.innerHTML +=
            "<i style='background: " + getColor(airQ[i]) + "'></i> " +
            airQ[i] + (airQ[i + 1] ? "&ndash;" + airQ[i + 1] + " " + label[i] + "<br>" : "+ " + label[i]);

        }   
    return div; 
    };
    
    legend.addTo(myMap);
;
