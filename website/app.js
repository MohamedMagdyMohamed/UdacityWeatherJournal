/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '48687b1f0e51231060260cbd3c10dfc8&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    updateUi(allData);
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

function updateUi(allData) {
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
}
