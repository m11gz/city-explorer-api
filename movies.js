const axios = require('axios');

let getMovies = async (request, response, next) => {
  try {
    let title = request.query.title;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${title}`;
    let moviesObj = await axios.get(url);
    console.log(moviesObj.data);
    let selectedMovie = moviesObj.data.results.map(movie => new Movies(movie));
    response.status(200).send(selectedMovie);
  } catch(err) {
    next(err);
  }
};


class Movies {
  constructor(movies) {
    this.img = movies.poster_path?'https://image.tmdb.org/t/p/w500'+ movies.poster_path : ''; 
    this.overview = movies.overview; 
    this.title = movies.title;
    this.id = movies.id;
  }
}

module.exports = getMovies;
