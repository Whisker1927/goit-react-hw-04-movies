import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';
import T from 'prop-types';
import apiService from '../services/api-service';
import routes from '../services/routes';
import SearchMovies from '../components/SearcMovies';
import styles from '../styles/index.module.css';

const getQueryParamsFromProps = props =>
  qs.parse(props.location.search.slice(1));

export default class MoviesPage extends Component {
  static propTypes = {
    match: T.objectOf(T.any).isRequired,
    location: T.objectOf(T.any).isRequired,
    history: T.objectOf(T.any).isRequired,
  };

  state = {
    value: [],
  };

  componentDidMount() {
    const queryParams = getQueryParamsFromProps(this.props);
    if (!queryParams.query) {
      return;
    }

    apiService.searchMovies(queryParams.query).then(value => {
      this.setState({ value });
    });
  }

  componentDidUpdate(prevProps) {
    const { query: prevQuery } = getQueryParamsFromProps(prevProps);
    const { query: nextQuery } = getQueryParamsFromProps(this.props);

    if (prevQuery === nextQuery) {
      return;
    }

    apiService.searchMovies(nextQuery).then(value => {
      this.setState({ value });
    });
  }

  setSearchQuery = query => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  handleGoHomePage = () => {
    const { state } = this.props.location;
    const { history } = this.props;

    if (state) {
      this.props.history.push(state.from);
      return;
    }

    history.push(`${routes.HOME_PAGE}`);
  };

  render() {
    const { location, match } = this.props;
    const { value } = this.state;

    return (
      <div>
        <h2>Movies Catalog</h2>
        <SearchMovies onSearch={this.setSearchQuery} />
        <ul className={styles.list}>
          {value.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${match.url}/${movie.id}`,
                  state: { from: location },
                }}
              >
                {movie.name ? movie.name : movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
