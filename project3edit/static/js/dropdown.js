
function init() {
       
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    
    // Use D3 to get sample names and populate the drop-down selector
    
        // Set a variable for the sample names
        let questions = [];
        questions.push("Select Visualization");
        questions.push("How do latitude affect temperature and wind speed?");
        questions.push("Cloud cover by city");
        console.log(questions)
        questions.forEach(x => {dropdownMenu.append("option").text(x)
        });
    }
        init()

function buildScatterplot(temperature) {
console.log(data.latitude)
    latitude = Object.values(data.latitude);
	longitude = Object.values(data.longitude);
	temp = Object.values(data.temperature_fahrenheit);
                let scatter= {
                    x: latitude,
                    y: temp,
                    mode: "markers",
                    type: "scatter",
                    marker: {size:12}
        
                };
                //set up the chart layout
                let layout = {
                    title: "lattitude vs temperature"
                    
                };
        
                // Call Plotly to plot the bar chart
                Plotly.newPlot("scatter", [scatter], layout);
        
            }
    document.querySelector("#selDataset").onchange = function(){
        if (event.target.options.selectedIndex == 0) {
            document.querySelector("#scatter").innerHTML=""
        } else if (event.target.options.selectedIndex == 1) {
            buildScatterplot()
        } else if (event.target.options.selectedIndex == 2) {
            drawBarPlot()
        }
        
    }
