// Draw the bar plot
function drawBarPlot(idNum) {
    // Log a change
    console.log("Bar: " + idNum);

    // Just grab the one ID we want
    var samplesFilter = data["app"].filter(item => item["cloud"] == idNum);
    // console.log(`samplesFilter length: ${samplesFilter.length}`);

    // get values into arrays
    var sample_values = samplesFilter[0].sample_values;

    // Create an array of objects to sort so that all of the data is together
    var forecast = [];
    var area = [];
    
    for (let i = 0; i < sample_values.length; i++) {
        row = sample_values[i];
        forecast.push(column.cloud);
        forecast.push(column.cities);
        }
      // Trace1 for the Data
        let trace = {
        x: cities,
        y: cloud,
        text: Cloudiness,
        type: "bar"
        orientation: 'h'
    };
    // data
    var traceData = [trace];
    // Define the layout
    var layout = {
        title: "Cloudiness by City",
        yaxis: { title: "Scale" },
        xaxis: { title: "City"}
    };
    Plotly.newPlot("bar", traceData, layout);
}
