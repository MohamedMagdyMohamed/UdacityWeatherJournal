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
function listening(){
    console.log(`server running on localhost: ${port}`); 
}

// Initialize all route with a callback function
app.get('/all', getrequestListener);

// Callback function to complete GET '/all'
function getrequestListener(req, res) {
    res.send(projectData);
}

// Post Route
app.post('/add', addProjectData);

function addProjectData(req, res) {
    console.log(req.body);
    projectData = req.body;
    res.send(projectData);
}
