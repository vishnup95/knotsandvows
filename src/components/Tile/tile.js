import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './tile.scss';

export default class Tile extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>Home page</h1>
        <h2>test data</h2>
      </div>
    );
  }
}

Tile.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};
