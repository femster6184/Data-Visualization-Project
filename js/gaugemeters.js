function buildGaugeChart(airQ) {
    
        
    // Set up the trace for the gauge chart
    let wfreq = {
        value: airQ,
        domain: {x: [0,1], y: [0,1]},
        title: {
            text: "<b>Air Quality</b>",
            font: {color: "black", size: 16}
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [0,500], tickmode: "linear", tick0: 50, dtick: 50},
            bar: {color: "black"},
            steps: [
                {range: [0, 50], color: "rgba(255, 0, 0, 0.9)"},
                {range: [50, 100], color: "rgba(225, 50 , 200, .9)"},
                {range: [150, 200], color: "rgba(195, 75, 175, .9)"},
                {range: [200, 250], color:  "rgba(165, 100, 150, .9)"},
                {range: [250, 300], color:  "rgba(135, 50, 250, .9)"},
                {range: [300, 350], color: "rgba(105, 100, 200, .9)"},
                {range: [350,400], color: "rgba(75, 150, 175, .9)"},
                {range: [400,450], color:  "rgba(45, 200, 150, .9)"},
                {range: [450,500], color: "rgba(20, 225, 125, 0.9)"},
            ]
        } 
    };

    // Set up the Layout
    let layout = {
        width: 400, 
        height: 400,
        margin: {t: 0, b:0}
    };

    // Call Plotly to plot the gauge chart
    Plotly.newPlot("gauge1", [wfreq], layout)

};
