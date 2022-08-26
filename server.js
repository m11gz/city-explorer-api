'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

let data = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello there!');
});

app.get('/weather', (request, response, next) => {
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

app.get('*', (request, response) => {
  response.send('Oh, sorry. That is not found in our database.');
});

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
    this.highTemp = day.max_temp;
    this.lowTemp = day.low_temp;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
