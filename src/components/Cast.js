import React, { Component } from 'react';
import T from 'prop-types';
import shortid from 'shortid';
import apiService from '../services/api-service';
import styles from '../styles/index.module.css';

class Cast extends Component {
  static propTypes = {
    movieId: T.number.isRequired,
    match: T.objectOf(T.any).isRequired,
  };

  state = {
    cast: [],
  };

  componentDidMount() {
    this.fetchMovieCast();
  }

  fetchMovieCast = () => {
    const { movieId } = this.props.match.params;

    apiService.getCastById(movieId).then(cast => {
      this.setState({ cast });
    });
  };

  render() {
    const { cast } = this.state;
    return (
      <section className={styles.cast}>
        {cast && (
          <ul className={styles.actors}>
            {cast.map(item => (
              <li key={shortid.generate()}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.profile_path}`}
                  alt="actor_photo"
                  width="100"
                />
                <p className={styles.nameActor}>
                  ACTOR
                  <br />
                  {item.name}
                </p>
                <p className={styles.nameActor}>
                  Movie character __ {item.character}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default Cast;
