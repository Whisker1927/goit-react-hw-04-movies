import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
import apiService from '../services/api-service';
import routes from '../services/routes';

export default class HomePage extends Component {
  static propTypes = {
    match: T.objectOf(T.any).isRequired,
    location: T.objectOf(T.any).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies = () => {
    const showTrendingMovies = this.props.match.params;

    apiService.getTrending(showTrendingMovies).then(movies => {
      this.setState({ movies });
    });
  };

  render() {
    const { movies } = this.state;
    const { location } = this.props;

    return (
      <div>
        <h1>Trending Today</h1>
        <div className="ui middle aligned list">
          {movies.map(movie => (
            <div className="item" key={movie.id}>
              <Link
                to={{
                  pathname: `${routes.MOVIES}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.original_title || movie.original_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
