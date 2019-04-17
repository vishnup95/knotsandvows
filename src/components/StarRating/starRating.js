import React, { Component } from 'react';
import styles from './starRating.scss';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';

class StarRating extends Component {
    render() {
        let rating = Math.floor(parseFloat(this.props.rating) * 2) / 2;
        let halfstar = 0, fullstar = 0, emptystar = 0;
        if (isNaN(rating) || rating == null){
            fullstar = 0;
            halfstar = 0;
            emptystar = 5;
        }else if (rating * 2 % 2 === 0) {
            fullstar = rating;
            emptystar = 5 - rating;
        } else {
            halfstar = 1;
            fullstar = rating - 0.5;
            emptystar = 5 - (rating + 0.5);
        }

        return (
            <div className={this.props.size === 'large' ? styles.large : styles.small}>
                {Array(fullstar).fill().map((key, index) => {
                    return <span key={index}><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /></span>;
                })}
                {Array(halfstar).fill().map((key, index) => {
                    return <span key={index}><img src={imagePath('halfstar.png')} className={styles.starImg} alt="Halfstar" /></span>;
                })}
                {Array(emptystar).fill().map((key, index) => {
                    return <span key={index}><img src={imagePath('outline_star.svg')} className={styles.starImg} alt="Outline" /></span>;
                })}
            </div>
        );
    }

}

StarRating.propTypes = {
    rating: PropTypes.string,
    size: PropTypes.string
};

export default StarRating;