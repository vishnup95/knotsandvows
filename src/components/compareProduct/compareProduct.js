import React, { Component } from "react";
// import Slider from "react-slick";
import { imagePath } from '../../utils/assetUtils';
import styles from './compareProduct.scss';
import PropTypes from 'prop-types';
// import CategoryCard from '../Card/cardCategory';
import { Col } from 'reactstrap';
import StarRating from '../../components/StarRating/starRating';


export default class CompareProduct extends Component {

    render() {
        return (
            <Col sm="4" className={styles.compareComponent}>
                <div className={styles.closeBtnSmall}>
                    <img src={imagePath('close-blank.svg')} alt="close button" aria-hidden />
                </div>
                <img src={imagePath('card_1_1.jpg')} className={styles.vendorImage} alt="Outline" />
                <div className={styles.vendrInfo}>
                    <h5>The Lalit Mumbai</h5>
                    <p>Andheri East, Mumbai</p>
                </div>
                <div className={styles.price}>
                    1,50,000 Min. <span>Charges per day</span>
                </div>
                <div className={styles.rating}>
                    <StarRating rating={'4'} size={'small'} />
                </div>
                <div className={styles.galleryWrap}>
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                    <img src={imagePath('card_1_1.jpg')} className={styles.galleryImage} alt="Outline" />
                </div>
                <div className={styles.removeBtn}>
                    Remove from wishlist
            </div>
            </Col>
        );
    }
}
CompareProduct.propTypes = {
    data: PropTypes.array,
    type: PropTypes.string,
    category: PropTypes.string,
    buttonAction: PropTypes.func
}; 