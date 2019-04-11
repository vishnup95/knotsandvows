import React, { Component } from "react";
// import Slider from "react-slick";
import { imagePath, formatMoney } from '../../utils/assetUtils';
import styles from './compareProduct.scss';
import PropTypes from 'prop-types';
// import action from '../../modules/detailPage/actions';
import { Col } from 'reactstrap';
import StarRating from '../../components/StarRating/starRating';


export default class CompareProduct extends Component {

    state = {
        gallery : []
    }

    componentWillMount() {
        //  this.props.dispatch(action.fetchVendorGallery(this.props.data.vendor_id));
    }
    render() {
        var vendor = this.props.data;
        return (
            <Col sm="4" className={styles.compareComponent}>
                <div className={styles.closeBtnSmall}>
                    <img src={imagePath('close-blank.svg')} alt="close button" aria-hidden />
                </div>
                <img src={this.props.data.pic_url || imagePath('card_1_1.jpg')} className={styles.vendorImage} alt="Outline"
                 onError={(e) => { e.target.onerror = null; e.target.src = `${imagePath('card_1_1.jpg')}` }} />
                <div className={styles.vendrInfo}>
                    <h5>{vendor.name}</h5>
                    <p>{vendor.city}</p>
                </div>
                <div className={styles.price}>
                    {formatMoney(vendor.price.minimum_price)} <span>{vendor.charge_type}</span>
                </div>
                <div className={styles.rating}>
                    <StarRating rating={vendor.rating} size={'small'} />
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
                <div className={styles.removeBtn} onClick={() => this.props.removeAction(vendor)} aria-hidden>
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
    removeAction: PropTypes.func
}; 
