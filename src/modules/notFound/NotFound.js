import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './notFound.scss';
import { Link } from 'react-router-dom';
import { imagePath } from '../../utils/assetUtils';

export default class NotFound extends Component {

  render() {
    return (
      <div className={styles.notFoundContainer}>
        <img className={styles.image} src={imagePath('404.png')} alt="404" />
        <h2>We can’t seem to find the page you’re looking for.</h2>
        <Link to='/' className={styles.backButton}>Back to home page</Link>
      </div>
    );
  }
}

NotFound.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};
