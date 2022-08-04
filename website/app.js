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
    const feelings = document.getElementById('feelings').value;

    getWebApiData(zip).then(function(data) {
        postData("/add", {temp: data.main.temp, dt: data.dt, feelings: feelings});
    }).then(() =>
        updateUI()
    );
}

/* Function to GET Web API Data*/
const getWebApiData = async (zip) => {
    const url = baseUrl + zipQuery + zip + apiKey;

    const response  = await fetch(url);
    try {
        const data = await response.json();
        console.log("getWebApiData", data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    console.log("postData", newData);
    return newData;
  } catch(error) {
    console.log("error", error);
  }
};


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log("updateUI", allData);
    updateUiElements(allData);
    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

function updateUiElements(allData) {
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
}
