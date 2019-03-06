import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './home.scss';
import { formatMoney } from '../../utils/assetUtils';

class PackageComponent extends Component {
  launchLandingPage(){
    window.open(this.props.details.targetUrl,"_blank");
  }

  addToWishList(e) {
    e.stopPropagation();
    console.log('Add to wishlist');
  }

  render() {
    let packageDetail = this.props.details;
    return (
      <div className={`${styles.packageContainer}`}>
        <div className={styles.details}>
          <h1>{packageDetail.name}</h1>
          <p className={styles.pSmall}>
            {packageDetail.description}
          </p>

          <p className={`mt-5 ${styles.price}`}>
            <span className={`mr-1 ${styles.priceBefore}`}>Offer Price: </span>
            <span className={`mr-5 ${styles.priceNow}`}>
              {formatMoney(packageDetail.price.offer_price)}
            </span>
            <strike style={{ color: 'red' }}>
              <span className={`${styles.priceBefore}`}>
                Price: {formatMoney(packageDetail.price.actual_price)}
              </span>
            </strike>
          </p>

          <p className={`mt-4 ${styles.price}`}>
            <span className={`mr-1 ${styles.priceBefore}`}>You Save: </span>
            <span className={styles.priceNow}>
              {packageDetail.price.save_amount} ({packageDetail.price.save_percentage}% Off){' '}
            </span>
          </p>
        </div>

        <div className={styles.featureImage} style={{ backgroundImage: `url(${packageDetail.imageUrl}) `}} 
          onClick={() => this.launchLandingPage()}  aria-hidden>
        </div>
      </div>
    );
  }
}

PackageComponent.propTypes = {
  details: PropTypes.object
};

export default PackageComponent;