import React, { Component } from 'react';
import T from 'prop-types';
import apiService from '../services/api-service';
import styles from '../styles/index.module.css';

class Reviews extends Component {
  static propTypes = {
    movieId: T.number.isRequired,
    match: T.objectOf(T.any).isRequired,
  };

  state = {
    reviews: [],
  };

  componentDidMount() {
    this.fetchMovieReviewes();
  }

  fetchMovieReviewes = () => {
    const { movieId } = this.props.match.params;

    apiService.getReviewById(movieId).then(reviews => {
      this.setState({ reviews });
    });
  };

  render() {
    const { reviews } = this.state;

    return (
      <div className={styles.reviews}>
        {reviews && (
          <ul className={styles.list}>
            {reviews.map(item => (
              <li key={item.id}>
                <h3>Author: {item.author}</h3>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Reviews;
