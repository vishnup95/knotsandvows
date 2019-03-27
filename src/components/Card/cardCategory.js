import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CardTitle,
    CardSubtitle,
    Card,
    CardImg,
    CardBody,
    UncontrolledTooltip
} from 'reactstrap';
import styles from './card.scss';
import { formatMoney, imagePath } from '../../utils/assetUtils';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { isLoggedIn } from '../../utils/utilities';
import * as loginActions from '../../reducers/session/actions'

const mapDispatchToProps = dispatch => ({
    dispatch
});
class CategoryCard extends Component {
    state = {
        isChecked: false,
        isWishList: false
    }
    navigateTo(route) {
        this.props.dispatch(push(route));
        window.scrollTo(0, 0);
    }

    addToWishList = (e) => {
        if (!isLoggedIn()) {
            this.props.dispatch(loginActions.showLogin());
        } else {
            this.setState({ isWishList: !this.state.isWishList });
        }
        e.stopPropagation();
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
                        <img src={imagePath(this.state.isWishList ? 'wishlist_selected.svg' : 'wishlist_unselected.svg')} className={styles.heartImg}
                            alt="Unselected heart" onClick={(e) => this.addToWishList(e)} aria-hidden id={`WishListTooltip${this.props.id}`} />
                        <UncontrolledTooltip placement="right" target={`WishListTooltip${this.props.id}`}>
                            {this.state.isWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </UncontrolledTooltip>
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
                        {this.props.data.reviews_count}&nbsp;<span>Reviews</span>
                    </p>
                </div>

                <CardTitle className={`mb-1 ${styles.cardTitleCat}`}>{this.props.data.name || 'Name(Default)'}</CardTitle>
                <CardSubtitle className={`mb-2 ${styles.cardText}`}>{this.props.data.city || 'City(Default)'}</CardSubtitle>
                <p className={`${styles.charges}`}>
                    <span>{formatMoney(this.props.data.price.service_price)}</span> {this.props.data.charge_type}
                </p>
            </div>
        );
    }

    handleCardClick = () => {
        this.navigateTo(`/${this.props.category}/${this.props.data.page_name}`);
    }
    selectCard = (e) => {
        this.setState({ isChecked: !this.state.isChecked });
        e.stopPropagation();
    }
    render() {
        return (
            <div>
                <Card className={`${styles.categoryCard} ${this.props.type === 'carousel' ? styles.carouselCard : ''}`} onClick={this.handleCardClick}>
                    {
                        this.props.isWishlist &&
                        <div>
                            <div className={`${styles.addIcon} ${styles.cardIcon}`}></div>
                            <div className={`${styles.deleteIcon} ${styles.cardIcon}`}></div>
                            <div className={`${styles.viewIcon} ${styles.cardIcon}`}>2</div>
                        </div>
                    }

                    <CardImg
                        className={styles.cardImage}
                        top
                        width="100%"
                        src={this.props.data.pic_url || imagePath('card_1_1.jpg')}
                        alt="Card image cap"
                        onError={(e) => { e.target.onerror = null; e.target.src = `${imagePath('card_1_1.jpg')}` }}
                    />
                    {/* <div className={styles.cardImage} style={{ background: "url(" + this.props.data.pic_url + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></div> */}
                    <CardBody className={styles.categoryBody} style={{ backgroundColor: '#f7f7f7' }}>
                        {this.renderCardBody()}
                    </CardBody>
                    {
                        this.props.isCompare &&
                        <div className={styles.compareMask}>
                            <span onClick={(e) => this.selectCard(e)} className={`${styles.checkbox} ${this.state.isChecked ? styles.checked : ''}`} aria-hidden></span>
                        </div>
                    }
                </Card>
            </div>
        );
    }
}

CategoryCard.propTypes = {
    data: PropTypes.object,
    buttonAction: PropTypes.func,
    dispatch: PropTypes.func,
    category: PropTypes.string,
    type: PropTypes.string,
    isCompare: PropTypes.bool,
    id: PropTypes.number,
    isWishlist: PropTypes.bool
};

export default connect(
    mapDispatchToProps
)(CategoryCard);