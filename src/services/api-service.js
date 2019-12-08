const apiKey = 'c297c19c2e8522b6413b995ef0a34ee4';
const getTrending = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey} `,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });
};
const searchMovies = query => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query} `,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });
};
const fetchMoviesDetails = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey} `,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .catch(err => {
      throw err;
    });
};
const getCastById = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey} `,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.cast)
    .catch(err => {
      throw err;
    });
};
const getReviewById = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey} `,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('not found');
    })
    .then(data => data.results)
    .catch(err => {
      throw err;
    });
};

export default {
  getTrending,
  searchMovies,
  fetchMoviesDetails,
  getCastById,
  getReviewById,
};
