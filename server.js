'use strict';

const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const weatherHandler = require('./weather.js');
const moviesHandler = require('./movies');

require('dotenv').config();

// let data = require('./data/weather.json')

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello there!');
});

app.get('/weather', weatherHandler);
app.get('/movies', moviesHandler);

// app.get('/weather', async (request, response, next) => {
//   console.log(request.query.city_name);
//   try {
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let urlWeather = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lon}&units=I&days=3`;
//     let weatherObj = await axios.get(urlWeather);
//     let selectedCity = weatherObj.data.data.map((day) => new Forecast(day));
//     response.send(selectedCity);
//   } catch (err) {
//     next(err);
//   }
// });

app.get('*', (request, response) => {
  response.send('Oh, sorry. That is not found in our database.');
});

// class Forecast {
//   constructor(day) {
//     this.description = day.weather.description;
//     this.date = day.datetime;
//     this.highTemp = day.max_temp;
//     this.lowTemp = day.low_temp;
//   }
// }

// app.use((err, req, res, next) => {
//   console.log(err.message);
//   res.status(500).send(err.message);
// });

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
