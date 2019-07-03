import React, { Component } from "react";
import styles from './home.scss';
import PropTypes from 'prop-types';
import { imagePath } from "../../utils/assetUtils";
import PlainCard from '../../components/Card/plainCard';
import CategoryCard from "../../components/Card/cardCategory";

export default class HorizontalScrollingCarousel extends Component {

  renderContent() {
    if (this.props.type === 'home') {
      return(
          this.props.data.map((ceremony, index) => {
            return(
                <div key={index} className={`${styles.verticalMultiItem} ${index%2 === 0  ? '' : styles.evenStyle}`} aria-hidden onClick={() => this.props.onSelect(ceremony)}>
                    <img className={styles.imageContainer}  style={{ backgroundImage: `url(${ceremony.thumb_image}) `}} alt="icon-default"
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
      );
    } else if (this.props.type === 'other_categories') {
      return(
        this.props.data.map((category, index) => {
          return(
            <div key={index} className={styles.plainCardContainer}>
              <PlainCard data={category}/>
            </div>
          );
        })
      )
    } else if (this.props.type === 'similar_ceremonies') {
      return(
        this.props.data.map((ceremony, index) => {
          return(
            <div key={index} className={styles.plainCardContainer}>
              <PlainCard data={ceremony} type="ceremonies"/>
            </div>
          );
        })
      )
    } else if (this.props.type === 'similar_vendors') {
      return(
        this.props.data.map((vendor, index) => {
          return(
            <div key={index} className={styles.plainCardTwo}>
              <CategoryCard data={vendor} type="ceremonies"/>
            </div>
          );
        })
      )
    }
  }

  render() {

    return (

      <div style={{width: 'calc(100% + 2rem)'}} className={styles.fullWidth}>
        <div className={styles.scrollingContainer}>
            {this.renderContent()}
        </div>
      </div>
    );
  }
}

HorizontalScrollingCarousel.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
  type: PropTypes.string,
  category: PropTypes.string
};

//type - home, other_categories