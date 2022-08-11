// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, listening);
/**
 * Callback to debug
 */
function listening(){
    console.log(`server running on localhost: ${port}`); 
}

// Initialize all route with a callback function
app.get('/all', getrequestListener);

/**
 * Callback function to complete GET '/all'
 * 
 * Send the projectData to the caller
 * 
 * @param {*} req request object received fromt the endpoint
 * @param {*} res response object send to the one who calles this request
 */
function getrequestListener(req, res) {
    res.send(projectData);
}

// Post Route
app.post('/add', addProjectData);

/**
 * re-intialize the projectData with the request data and send the data to teh caller
 * 
 * @param {*} req request object received fromt the endpoint
 * @param {*} res response object send to the one who calles this request
 */
function addProjectData(req, res) {
    console.log(req.body);
    // re-intialize the projectData with the request data
    projectData = {
        temp: req.body.temp,
        date: req.body.dt,
        feel: req.body.feelings
    };
    // re-send the project data
    res.send(projectData);
}
