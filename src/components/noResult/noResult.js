import React, { Component } from 'react';
import styles from './noResult.scss';
import { imagePath } from '../../utils/assetUtils';

class NoResultComponent extends Component {
    render() {
        return (
            <div className={styles.noResultContainer}>
                <img src={imagePath('no-result.svg')} alt="no result found" />
                <p>No matching results found for your request</p>
                <p>Please try with another term.</p>
            </div>
        );
    }
}

export default NoResultComponent;