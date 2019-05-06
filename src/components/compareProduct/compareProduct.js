import React, { Component } from "react";
import { imagePath } from '../../utils/assetUtils';
import styles from './compareProduct.scss';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import StarRating from '../../components/StarRating/starRating';
import { connect } from 'react-redux';
import * as actions from '../../modules/detailPage/actions';
import * as wishlistActions from '../../modules/wishlist/actions';
import { getDataFromResponse, formatMoney, getChargeType } from "../../utils/utilities";

const mapStateToProps = state => ({
    wishlistId: state.wishlist.current.wishlist_id,
});


const mapDispatchToProps = dispatch => ({
    dispatch
});

 class CompareProduct extends Component {

    state = {
        gallery : []
    }

    componentWillMount() {
        this.props.dispatch(actions.fetchVendorGallery(String(this.props.data.vendor_id))).then((respose) => {
            if(getDataFromResponse(respose) == null){
                this.setState({gallery: respose.data.data.gallery})
            }
         })
    }

    renderGallery = (gallery) => {
        const images = gallery.map((image, index) => {
            return(
                <Col md="6" className="p-1" key={index}>
                    <img src={image.image} className={styles.galleryImage} alt="gallery" /> 
                </Col>
            );           
        });
        return <Row className="m-0">{images}</Row>;
    }

    removeFromWishList(vendor) {
        let params = {
            vendor_id: this.props.data.vendor_id,
            wishlist_id: this.props.wishlistId,
            category_id: this.props.categoryId,
        };

        this.props.dispatch(wishlistActions.removeFromWishlist(params));
        this.props.removeAction(vendor);
    }

    render() {
        var vendor = this.props.data;
        return (
            <Col xs="6" sm="4" className={styles.compareComponent}>
                <div className={styles.closeBtnSmall}>
                    <img src={imagePath('close-blank.svg')} alt="close button" aria-hidden onClick={() => this.props.removeAction(vendor)}/>
                </div>
                <img src={this.props.data.pic_url || imagePath('card_1_1.jpg')} className={styles.vendorImage} alt="Outline"
                 onError={(e) => { e.target.onerror = null; e.target.src = `${imagePath('card_1_1.jpg')}` }} />
                <div className={styles.vendorInfo}>
                    <h5>{vendor.name}</h5>
                    <p>{vendor.city}</p>
                </div>
                <div className={styles.price}>
                    {formatMoney(vendor.price.format_price)} <span>{getChargeType(vendor.format_price,vendor.charge_type)}</span>
                </div>
                <div className={styles.rating}>
                    <StarRating rating={String(vendor.rating)} size={'small'} />
                </div>
                
                {this.state.gallery && this.state.gallery.length > 0 &&
                <div className={styles.galleryWrap}>
                    {this.renderGallery(this.state.gallery)}
                </div>
                }
                <div className={styles.removeBtn} onClick={() => this.removeFromWishList(vendor)} aria-hidden>
                    Remove from wishlist
                </div>
            </Col>
        );
    }
}
CompareProduct.propTypes = {
    data: PropTypes.object,
    removeAction: PropTypes.func,
    dispatch: PropTypes.func,
    wishlistId: PropTypes.number,
    categoryId: PropTypes.number
}; 

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompareProduct);
