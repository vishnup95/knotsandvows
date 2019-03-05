import React, { Component } from "react";
import { imagePath } from '../../utils/assetUtils';
import styles from './reviews.scss';
import PropTypes from 'prop-types';

export default class ReviewItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let review = this.props.review
        return (
            <div className={styles.reviewItem}>
                <div className={styles.reviewUser}>{review.name}</div>
                <div className={styles.reviewRating}><span><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /></span>{review.rating}</div>
                <div className={styles.reviewText}>{review.review}</div>
            </div>
        )
    }
}

ReviewItem.propTypes = {
    review: PropTypes.object,
};