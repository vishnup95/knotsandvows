import React, { Component } from "react";
// import { imagePath } from '../../utils/assetUtils';
import styles from './reviews.scss';
import PropTypes from 'prop-types';
import StarRating from '../StarRating/starRating';

export default class ReviewItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let review = this.props.review
        return (
            <div className={styles.reviewItem}>
                <div className={styles.reviewUser}>{review.name}</div>
                <div className={styles.reviewRating}>
                <StarRating rating={String(review.rating)} size={'small'} /><span>{review.rating}</span>

                {/* <img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /> <span>{review.rating}</span> */}
                </div>
                <div className={styles.reviewText}>{(review.review === '' || review.review === 'null') ? 'No review' : review.review}</div>
            </div>
        )
    }
}

ReviewItem.propTypes = {
    review: PropTypes.object,
};