function drawBarPlot(idNum) {
    // Log a change
    console.log("Bar: " + idNum);

    // Just grab the one ID we want
    //var samplesFilter = data["app"].filter(item => item["cloud"] == idNum);
    // console.log(`samplesFilter length: ${samplesFilter.length}`);

    // get values into arrays
    //var sample_values = samplesFilter[0].sample_values;

    // Create an array of objects to sort so that all of the data is together
    var forecast = Object.values(data.cloud);
    var area = Object.values(data.location_name);
    

      // Trace1 for the Data
        let trace = {
        x: forecast,
        y: area,
        text: "Cloudiness",
        type: "bar",
        orientation: 'h'
    };
    // data
    var traceData = [trace];
    // Define the layout
    var layout = {
        title: "Cloudiness by City",
        yaxis: { title: "City" },
        xaxis: { title: "Scale"}
    };
    Plotly.newPlot("bar", traceData, layout);
}