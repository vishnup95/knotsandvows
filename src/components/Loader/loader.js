import React, { Component } from 'react';
import styles from './loader.scss';

class LoaderComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.loaderWrap}>
                <div className={styles.outerImage}>
                    <div className={styles.loader} id="loader-6">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.loaderText}>Loading...</div>
                </div>

            </div>
        );
    }
}
export default LoaderComponent;
