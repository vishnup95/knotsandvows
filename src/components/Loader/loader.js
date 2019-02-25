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
                Loading...

                    <div className={styles.innerImage}>
                    </div>
                </div>

            </div>
        );
    }
}
export default LoaderComponent;
