import React, { Component } from 'react';
import styles from './home.scss';
import { formatMoney } from '../../utils/assetUtils';

class PackageComponent extends Component {
  render() {
    return (
      <div className={`${styles.packageContainer}`}>
        <div className={styles.details}>
          <h1>Emerald Package</h1>
          <p className={styles.pSmall}>
            The Silver Package is designed to be all inclusive. It covers
            everything couples could possibly need on your wedding day, from a
            resident pianist to entertain your guests on arrival, a bridal suite
            and two guest rooms for the wedding night.
          </p>

          <p className={`mt-5 ${styles.price}`}>
            <span className={`mr-1 ${styles.priceBefore}`}>Offer Price: </span>
            <span className={`mr-5 ${styles.priceNow}`}>
              {formatMoney(1600000)}
            </span>
            <strike style={{ color: 'red' }}>
              <span className={`${styles.priceBefore}`}>
                Price: {formatMoney(1600000)}
              </span>
            </strike>
          </p>

          <p className={`mt-4 ${styles.price}`}>
            <span className={`mr-1 ${styles.priceBefore}`}>You Save: </span>
            <span className={styles.priceNow}>
              {formatMoney(1600000)} (15% Off){' '}
            </span>
          </p>
        </div>

        <div className={styles.featureImage} />
      </div>
    );
  }
}

export default PackageComponent;
