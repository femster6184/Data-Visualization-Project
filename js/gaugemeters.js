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
                {range: [0, 50], color: "rgba(0, 255, 0, 0.9)"},
                {range: [50, 100], color: "rgba(30, 225 , 0, .9)"},
                {range: [100, 150], color: "rgba(60, 195 , 0, .9)"},
                {range: [150, 200], color: "rgba(90, 165, 0, .9)"},
                {range: [200, 250], color:  "rgba(120, 135, 0, .9)"},
                {range: [250, 300], color:  "rgba(150, 105, 0, .9)"},
                {range: [300, 350], color: "rgba(180, 75, 0, .9)"},
                {range: [350,400], color: "rgba(210, 50, 0, .9)"},
                {range: [400,450], color:  "rgba(225, 30, 0, .9)"},
                {range: [450,500], color: "rgba(255, 0, 0, 0.9)"},
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
function buildGaugeChart2(moon_ill) {
    
        
    // Set up the trace for the gauge chart
    let wfreq = {
        value: moon_ill,
        domain: {x: [0,1], y: [0,1]},
        title: {
            text: "<b>Moon Illumination</b>",
            font: {color: "black", size: 16}
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [0,100], tickmode: "linear", tick0: 25, dtick: 25},
            bar: {color: "black"},
            steps: [
                {range: [0, 25], color: "rgba(125, 125, 100, 0.9)"},
                {range: [25, 50], color: "rgba(50, 100 , 140, .9)"},
                {range: [50, 75], color: "rgba(60, 195 , 190, .9)"},
                {range: [75, 100], color: "rgba(178, 75, 100, .9)"},
                
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
    Plotly.newPlot("gauge2", [wfreq], layout)

};
