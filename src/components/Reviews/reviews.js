import React, { Component } from "react";
import { imagePath } from '../../utils/assetUtils';
import styles from './reviews.scss';
import PropTypes from 'prop-types';
// import { Col } from 'reactstrap';

export default class Reviews extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data, 'rrrrrrrrrrrrrrr');

        return (
            <div>
                <div className={styles.reviewHeader}>Reviews <span>({this.props.data.total_review_count})</span></div>
                {
                    this.props.data.results.map((item, index) => {
                        return (
                            <div key={index} className={styles.reviewItem}>
                                <div className={styles.reviewUser}>{item.name}</div>
                                <div className={styles.reviewRating}><span><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /></span>{item.rating}</div>
                                <div className={styles.reviewText}>{item.review}</div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
Reviews.propTypes = {
    data: PropTypes.object,
};