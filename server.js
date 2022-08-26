"use strict";
//Require
//In our servers, we have to use 'require' instead of import. Here we will the requirements for a server

// To create a server we bring in the express
const express = require("express");
const cors = require("cors");

// We need to bring in our .env file, so we'll use this after we run 'npm i dotenv:
require("dotenv").config();

// I need to bring in the data from the "weather.json" file with a "require".
// Now that I have a "ROUTE", I can "ROUTE" the data inside of the file,
// and use it in the server.
let data = require("./data/weather.json");

// USE
// Once we have required something, we have to use it. This is where we will assign the required file a variable. React does this in one step, express take 2: require and use. This is just how Express is.

// Once we have express, we must USE express
const app = express();
app.use(cors());

// Define PORT value - validate that our .env is working
const PORT = process.env.PORT || 3002;
// If the server is running on 3002, then I know that something is wrong in my .env file or how I'm importin the values from it

// ROUTES
// We will use this to access our endpoints

// Create a basic default route:
// app.get correletes to axios.get
// The first parameter is a URL in quotes
app.get("/Hello there!", (request, response) => {
  response.send("Hello there!!");
});

// Now I can "GET" the data from the file with the "app.get()",
// and that is how we "ROUTE". The name of it needs to be "/weather"
// according to the assignment.
app.get("/weather", (request, response, next) => {
  console.log(request.query.city_name);
  try {
    let cityQuery = request.query.city_name;
    console.log(cityQuery);
    let weatherObj = data.find(
      (city) => city.city_name.toLowerCase() === cityQuery.toLowerCase()
    );
    console.log(weatherObj.data);
    let selectedCity = weatherObj.data.map((day) => new Forecast(day));
    response.send(selectedCity);
  } catch (err) {
    next(err);
  }
});

// Catch all "Star" route
app.get("*", (request, response) => {
  response.send("Oh, sorry. That is not found in our database.");
});

// ERRORS
// Handles any errors

// CLASSES
// Now I need to create a Forecast class in order to render
// the date and description
class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
    this.highTemp = day.max_temp;
    this.lowTemp = day.low_temp;
  }
}

// LISTEN
// Start the server
// Listen is an express method. It takes in a Port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
