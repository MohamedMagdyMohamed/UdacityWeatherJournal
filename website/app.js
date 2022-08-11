/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=48687b1f0e51231060260cbd3c10dfc8&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const zipQuery = '?zip=';

/**
 * Event listener to add function to existing HTML DOM element
 * 
 * Using getElementById to get the element https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * And addEventListener to add click event listener to the element https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
document.getElementById('generate').addEventListener('click', generate);

/**
 * Function called by event listener
 * 
 * Function to be called after the user clicked the button generate
 * Fetch the data from the OpenWeatherMap API the current weather using the zip code that the user enterd
 * and post this data to the server with the feelings that the user eneters to save it
 * and then fetch the current data from the server to update the ui with the latest data
 * 
 * Using getElementById to get the element https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * And value to get the string from the element https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataElement/value
 * And Promises chaining to chain the calls after each other https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining
 */
function generate() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // get the current weather then post it to the server with the fellings that the user enters and then get the data from the server and update the ui
    getWebApiData(zip) // fetch the data from the OpenWeatherMap API
        .then(function(data) {
            const object = {temp: data.main.temp, dt: data.dt, feelings: feelings};
            postData("/add", object); // post the data to the server
        }).then(() => {
            updateUI(); // get the data from the server and update the ui element with the latest data
        }).catch(() => { // catch and handle any error occur
            console.error("Error");
        });
}

/**
 * Function to GET Web API Data
 * 
 * Use async function to make the fetch call.
 * Using async-await to enable asynchronous and wait for the action to be finshed before moving to the next line https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * and fetch to be able to make a request https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @param {*} zip -> zip code entered by the user
 * @returns response data as json
 */
async function getWebApiData(zip) {
    const url = baseUrl + zipQuery + zip + apiKey;
    const response  = await fetch(url);
    return await response.json();
}

/**
 * Function to POST data
 * 
 * Post the data received from the weather endpoint and from the user input to the server
 * Using async-await to enable asynchronous and wait for the action to be finshed before moving to the next line https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * and fetch to be able to make a request https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * @param {*} url -> url endpoint to post the data to 
 * @param {*} data  -> the data to be post to the endpoint
 * @returns data get from post
 */
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects     
}

/**
 * Function to GET Project Data
 * 
 * Get the data from the server to be displayed to the user
 * Using async-await to enable asynchronous and wait for the action to be finshed before moving to the next line https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 * and fetch to be able to make a request https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
async function updateUI() {
    // Fetch the data from the server
    const request = await fetch('/all');
    // Transform into JSON
    const allData = await request.json();
    console.log("updateUI", allData);
    // Update the ui elemnts with the received data from the server
    updateUiElements(allData);
}

/**
 * Update the ui elements with the data retrieved from the server
 * 
 * Using getElementById to get the element https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * And innerHTML to set the html to the selected element https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 * @param {*} allData -> data to be displayed to the user after fetching it from the server
 */
function updateUiElements(allData) {
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = 'Temp : ' + Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = 'Feelings : ' + allData.feel;
    document.getElementById('date').innerHTML = 'Date : ' + allData.date;
}
