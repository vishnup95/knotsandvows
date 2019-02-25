import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CardTitle,
    CardSubtitle,
    Card,
    CardImg,
    CardBody,
  } from 'reactstrap';
import styles from './card.scss';
import { formatMoney, imagePath } from '../../utils/assetUtils';

class CategoryCard extends Component {
    data = this.props.data;
    rating = Math.floor(parseFloat(this.data.rating) * 2) / 2;
    renderCardBody() {
        let halfstar = 0, fullstar = 0, emptystar = 0;
        if (this.rating * 2 % 2 === 0) {
            fullstar = this.rating;
            emptystar = 5 - this.rating;
        } else {
            halfstar = 1;
            fullstar = this.rating - 0.5;
            emptystar = 5 - (this.rating + 0.5);
        }

        return(
            <div> 
                <div className={styles.ratingContainer}>
                    <p className={`${styles.rating} mb-2`}>
                        <img src={imagePath('wishlist_unselected.svg')} className={styles.heartImg} alt="Unselected heart"/>
                    </p>

                    <p className={`${styles.rating} mb-1`}>
                        {Array(fullstar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar"/></span>;
                        })}
                        {Array(halfstar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('halfstar.svg')} className={styles.starImg} alt="Halfstar"/></span>;
                        })}
                        {Array(emptystar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('outline_star.svg')} className={styles.starImg} alt="Outline"/></span>;
                        })}
                    
                    </p>

                    <p className={styles.rating}>
                        {this.data.reviews_count} <span>Reviews</span> 
                    </p>
                </div>

                <CardTitle className={`mb-1 ${styles.cardTitleCat}`}>{this.data.name || 'Name(Default)'}</CardTitle>
                <CardSubtitle className={`mb-2 ${styles.cardText}`}>{this.data.city || 'City(Default)'}</CardSubtitle>
                <p className={`${styles.charges}`}>
                    <span>{formatMoney(this.data.service_price)}</span> Min Charges per Day
                </p>
            </div> 
        );
    }

    render() {
        return (
            <div>
                <Card className="mb-5" style={{backgroundColor: '#f7f7f7'}} onClick={this.props.buttonAction}>
                <CardImg
                    className={styles.cardImage}
                    top
                    width="100%"
                    src={this.data.pic_url || imagePath('card_1_1.jpg')}
                    alt="Card image cap"
                    onError={(e)=>{e.target.onerror = null; e.target.src=`${imagePath('card_1_1.jpg')}`}}
                />
                <CardBody>
                    {this.renderCardBody()}
                </CardBody>
                </Card>
            </div>
        );
    }
}

CategoryCard.propTypes = {
    data: PropTypes.object,
    buttonAction: PropTypes.func
};

export default CategoryCard;