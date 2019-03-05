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
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const mapDispatchToProps = dispatch => ({
    dispatch
});
class CategoryCard extends Component {

    navigateTo(route) {
        this.props.dispatch(push(route));
        window.scrollTo(0, 0);
    }

    renderCardBody() {
        let rating = Math.floor(parseFloat(this.props.data.rating) * 2) / 2;
        let halfstar = 0, fullstar = 0, emptystar = 0;
        if (rating * 2 % 2 === 0) {
            fullstar = rating;
            emptystar = 5 - rating;
        } else {
            halfstar = 1;
            fullstar = rating - 0.5;
            emptystar = 5 - (rating + 0.5);
        }

        return (
            <div>
                <div className={styles.ratingContainer}>
                    <p className={`${styles.rating} mb-2`}>
                        <img src={imagePath('wishlist_unselected.svg')} className={styles.heartImg} alt="Unselected heart" />
                    </p>

                    <p className={`${styles.rating} mb-1`}>
                        {Array(fullstar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('fullstar.svg')} className={styles.starImg} alt="Fullstar" /></span>;
                        })}
                        {Array(halfstar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('halfstar.svg')} className={styles.starImg} alt="Halfstar" /></span>;
                        })}
                        {Array(emptystar).fill().map((key, index) => {
                            return <span key={index}><img src={imagePath('outline_star.svg')} className={styles.starImg} alt="Outline" /></span>;
                        })}

                    </p>

                    <p className={styles.rating}>
                        {this.props.data.reviews_count} <span>Reviews</span>
                    </p>
                </div>

                <CardTitle className={`mb-1 ${styles.cardTitleCat}`}>{this.props.data.name || 'Name(Default)'}</CardTitle>
                <CardSubtitle className={`mb-2 ${styles.cardText}`}>{this.props.data.city || 'City(Default)'}</CardSubtitle>
                <p className={`${styles.charges}`}>
                    <span>{formatMoney(this.props.data.price.service_price)}</span> Min Charges per Day
                </p>
            </div>
        );
    }

    handleCardClick = () => {
        this.navigateTo(`/${this.props.category}/${this.props.data.page_name}`);
    }

    render() {
        return (
            <div>
                <Card className="mb-5" style={{ backgroundColor: '#f7f7f7' }} onClick={this.handleCardClick}>
                    <CardImg
                        className={styles.cardImage}
                        top
                        width="100%"
                        src={this.props.data.pic_url || imagePath('card_1_1.jpg')}
                        alt="Card image cap"
                        onError={(e) => { e.target.onerror = null; e.target.src = `${imagePath('card_1_1.jpg')}` }}
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
    buttonAction: PropTypes.func,
    dispatch: PropTypes.func,
    category: PropTypes.string
};

export default connect(
    mapDispatchToProps
)(CategoryCard);