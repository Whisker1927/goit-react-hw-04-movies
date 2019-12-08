import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import T from 'prop-types';
import apiService from '../services/api-service';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import styles from '../styles/index.module.css';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: T.objectOf(T.any).isRequired,
    location: T.objectOf(T.any).isRequired,
    history: T.objectOf(T.any).isRequired,
  };

  state = {
    movie: '',
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { movieId } = this.props.match.params;
    apiService
      .fetchMoviesDetails(movieId)
      .then(movie => this.setState({ movie }));
  };

  onGoBack = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
      return;
    }

    this.props.history.push('/movies');
  };

  render() {
    const { movie } = this.state;
    const {
      match: { url, path, params },
    } = this.props;
    const {
      location: { state },
    } = this.props;
    const date = new Date(movie.release_date);
    return (
      <div>
        <button type="button" className={styles.button} onClick={this.onGoBack}>
          Back to Movies
        </button>
        <div className={styles.movieDetails}>
          {movie && (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                width="320"
              />
              <div className={styles.description}>
                <div>
                  <h3 className={styles.title}>{movie.title}</h3>
                  <h4 className={styles.title}>({date.getFullYear()})</h4>
                </div>
                <p>User Score: {movie.vote_average * 10}%</p>
                <div>
                  <h4>Overview</h4>
                  <p>{movie.overview}</p>
                </div>
                <div>
                  <h4>Genres</h4>
                  <p>
                    {movie.genres.map(item => (
                      <span className="item" key={item.id}>
                        {item.name}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <NavLink
          className={styles.link}
          exact
          activeClassName="active"
          to={{
            pathname: `${url}/cast`,
            state: { ...state },
          }}
        >
          Cast
        </NavLink>
        <NavLink
          className={styles.link}
          exact
          activeClassName="active"
          to={{
            pathname: `${url}/reviews`,
            state: { ...state },
          }}
        >
          Reviews
        </NavLink>

        <Route
          path={`${path}/cast`}
          render={props => <Cast {...props} movieId={Number(params.movieId)} />}
        />
        <Route
          path={`${path}/reviews`}
          render={props => (
            <Reviews {...props} movieId={Number(params.movieId)} />
          )}
        />
      </div>
    );
  }
}
