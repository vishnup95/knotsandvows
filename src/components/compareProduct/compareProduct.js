import React, { Component } from "react";
import { imagePath } from '../../utils/assetUtils';
import styles from './compareProduct.scss';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import StarRating from '../../components/StarRating/starRating';
import { connect } from 'react-redux';
import * as actions from '../../modules/detailPage/actions';
import { getDataFromResponse, formatMoney } from "../../utils/utilities";

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
            return <img src={image.image} key={index} className={styles.galleryImage} alt="gallery" /> 
        });
         return images;
    }
    render() {
        var vendor = this.props.data;
        console.log(vendor);
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
                    {formatMoney(vendor.price.format_price)} <span>{vendor.charge_type}</span>
                </div>
                <div className={styles.rating}>
                    <StarRating rating={String(vendor.rating)} size={'small'} />
                </div>
                
                {this.state.gallery && this.state.gallery.length > 0 &&
                <div className={styles.galleryWrap}>
                    {this.renderGallery(this.state.gallery)}
                </div>
                }
                <div className={styles.removeBtn} onClick={() => this.props.removeAction(vendor)} aria-hidden>
                    Remove from wishlist
                </div>
            </Col>
        );
    }
}
CompareProduct.propTypes = {
    data: PropTypes.object,
    removeAction: PropTypes.func,
    dispatch: PropTypes.func
}; 

export default connect(
    mapDispatchToProps
)(CompareProduct);
