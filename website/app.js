/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=48687b1f0e51231060260cbd3c10dfc8&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const zipQuery = '?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate() {
    const zip = document.getElementById('zip').value;

    getWebApiData(zip);
}

/* Function to GET Web API Data*/
const getWebApiData = async (zip) => {
    const url = baseUrl + zipQuery + zip + apiKey;

    const response  = await fetch(url);
    try {
        const data = await response.json();
        console.log("data", data);
    } catch (error) {
        console.log("error", error);
    }
}

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
