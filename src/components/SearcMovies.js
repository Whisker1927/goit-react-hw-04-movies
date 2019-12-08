import React, { Component } from 'react';
import styles from '../styles/index.module.css';

export default class SearchMovies extends Component {
  state = { value: '' };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={value}
          autoComplete="off"
          placeholder="Search  movies..."
          onChange={this.onChange}
        />
        <button type="submit" className={styles.button}>
          Search...
        </button>
      </form>
    );
  }
}
