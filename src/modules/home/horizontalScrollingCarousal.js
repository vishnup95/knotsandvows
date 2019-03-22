import React, { Component } from "react";
import styles from './home.scss';
import PropTypes from 'prop-types';
import { imagePath } from "../../utils/assetUtils";


export default class HorizontalScrollingCarousel extends Component {

  render() {

    return (

      <div style={{width: 'calc(100% + 2rem)'}} className={styles.fullWidth}>
        <div className={styles.scrollingContainer}>
            {
                this.props.ceremonies.map((ceremony, index) => {
                    return(
                        <div key={index} className={`${styles.verticalMultiItem} ${index%2 === 0  ? '' : styles.evenStyle}`} aria-hidden onClick={() => this.props.onSelect(ceremony)}>
                            <img className={styles.imageContainer}  style={{ backgroundImage: `url(${ceremony.thumb_image}) `}} alt=""
                            onError={(e)=>{e.target.onerror = null; e.target.src=imagePath('card_2_1.jpg')}}></img>

                            <div className={styles.detailContainer}>
                              <div className={styles.handle}></div>
                              <h3>{ceremony.ceremony_name}</h3>
                              <p className={styles.pdetail}>{ceremony.short_description}</p>
                              <p className={styles.pmore}>View more...</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
      </div>
    );
  }
}

HorizontalScrollingCarousel.propTypes = {
  ceremonies: PropTypes.array,
  onSelect: PropTypes.func
};