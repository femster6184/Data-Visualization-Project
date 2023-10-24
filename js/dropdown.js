
function init() {
       
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    
    // Use D3 to get sample names and populate the drop-down selector
    
        // Set a variable for the sample names
        let questions = [];
        questions.push("How does air quality differ by location?");
        questions.push("How do latitude and longitude affect temperature and wind speed?");
        questions.push("Do latitude and longitude affect precipitation frequency and magnitude?");
        questions.push("Does air quality affect levels of moon illumination?");
        console.log(questions)
        questions.forEach(x => {dropdownMenu.append("option").text(x)
        });
    }
        init()