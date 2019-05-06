import React, { Component } from 'react';
import styles from './noResult.scss';
import { imagePath } from '../../utils/assetUtils';

class NoResultComponent extends Component {
    render() {
        return (
            <div className={styles.noResultContainer}>
                <img src={imagePath('no-result.svg')} alt="no result found" />
                <p>It’s not a match made in heaven.</p>
                <p className={styles.centerP}>Talk to our experts to solve your problem. Call +91 703 218 8007</p>
            </div>
        );
    }
}

export default NoResultComponent;