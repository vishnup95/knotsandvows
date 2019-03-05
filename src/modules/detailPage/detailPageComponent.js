import React, { Component } from 'react';
import style from './detailPageComponent.scss'
import { Row, Col, Modal } from 'reactstrap';
import MapComponent from '../../components/Map/map';
import * as actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as loginActions from '../../reducers/session/actions';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import ProductGallery from '../../modals/productGallery/GalleryModal';

const mapStateToProps = state => ({
    user: state.session.user,
    details: state.details.details,
    reviewsData: state.details.reviewsData,
    similarVendors: state.details.similarVendors
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});


class DetailPageComponent extends Component {
    constructor(props) {
        super(props);
        this.toggleGallery = this.toggleGallery.bind(this);

        this.state = {
            showGallery: false,
            vendor: '',
            category: ''
        };
    }

    toggleGallery = () => {
        this.setState({
            showGallery: !this.state.showGallery
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps == undefined) {
            return false;
        }

        if (this.state.vendor !== this.props.match.params.vendor_name) {
            this.updateUIData();
            window.scrollTo(0, 0);
        }
    }

    componentWillMount() {
        this.updateUIData();
    }

    updateUIData = () =>{

        console.log(this.props.match);
        let category = this.props.match.params.category_name;
        let vendor = this.props.match.params.vendor_name;
        this.setState({ vendor: vendor, category: category });
        this.props.dispatch(actions.fetchVendorDetails(category, vendor));
        this.props.dispatch(actions.fetchSimilarVendors(category, vendor));
        this.props.dispatch(actions.fetchReviews(category, vendor, 1));
    
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    addToWishlist = () => {
        if (this.props.user == null) {
            this.props.dispatch(loginActions.showLogin());
            return;
        }
    }

    renderAvailableArea = (availableArea) => {

        const availableAreas = availableArea.map((area, index) => {

            return <li className={style.selected} key={index}>{area.name} <br />
                <span>{area.seating_capacity} Seating | {area.type}</span>
            </li>
        });
        return availableAreas;
    }

    renderAminities = (amenities) => {

        const availableAmenities = amenities.map((amenity, index) => {

            return <li key={index}>{amenity.name}</li>

        });
        return availableAmenities;
    }

    renderPolicies = (policies) => {

        const termsAndPolicies = policies.map((policy, index) => {

            return <li className={style.selected} key={index}>{policy.name}</li>

        });
        return termsAndPolicies;
    }

    jumbotronData = (category) => {
        const jumbotronData =
        {
            title: 'Similar ' + category
        }
        return jumbotronData;
    }

    render() {
        let details = this.props.details;

        return (
            <div className={style.detailContainer}>
               {details && 
                 <div>
                    <div className={style.bgImage} style={{ background: "url(" + details.cover_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className={style.detailSection}>
                        <Row className={style.infoBox}>
                            <div>
                                <h3 >{details.name}</h3>
                                <p >{details.city} (<a href="/">View on Map</a>)</p>
                                <p >{details.address}</p>
                            </div>
                            <div>
                                star rating
                            {/* <div className={style.rating}>4.5/5 rating</div> */}
                                <div className={style.review}> {details.reviews_count} reviews</div>
                            </div>
                            <div className={style.viewBtnWrap}>
                                <button className={style.viewBtn} onClick={() => this.toggleGallery()}>View Gallery</button>
                            </div>
                        </Row>
                        <Row className={style.detailNav}>

                            <ul>
                                {details.about &&
                                    <li>About</li>
                                }
                                {details.available_areas && details.available_areas.length > 0 &&
                                    <li>Available Areas</li>
                                }
                                {details.amenities && details.amenities.length > 0 &&
                                    <li>Amenities</li>
                                }
                                {details.policies && details.policies.length > 0 &&
                                    <li>Policies</li>
                                }
                                {details.location && details.location.latitude && details.location.longitude &&
                                    <li>Direction</li>
                                }
                                <li>Reviews</li>
                                {details.gallery && details.gallery.length > 0 &&
                                    <li>Gallery ({details.gallery.length} Photos)</li>
                                }
                            </ul>

                            {/* <button className={style.transparentBtn}>Short List</button> */}
                        </Row>
                        <Row>
                            <Col md="7">
                                {details.about &&
                                    <Col md="12" className={style.detailSubSection}>
                                        <h3>About {details.name}</h3>
                                        <p>{details.about}</p>
                                    </Col>
                                }
                                {details.available_areas && details.available_areas.length > 0 &&
                                    <Col md="12" className={style.detailSubSection}>
                                        <h3>Available Areas ({details.available_areas.length})</h3>
                                        <ul className={style.selectableList}>
                                            {this.renderAvailableArea(details.available_areas)}
                                        </ul>

                                    </Col>
                                }

                                {details.amenities && details.amenities.length > 0 &&
                                    <Col md="12" className={style.detailSubSection}>
                                        <h3>Amenities</h3>
                                        <ul className={style.listWithIcon}>
                                            {this.renderAminities(details.amenities)}
                                        </ul>

                                    </Col>
                                }
                                {details.policies && details.policies.length > 0 &&
                                    <Col md="12" className={style.detailSubSection}>
                                        <h3>Policies</h3>
                                        <ul className={style.selectableList}>
                                            {this.renderPolicies(details.policies)}
                                        </ul>

                                    </Col>
                                }
                                {details.location && details.location.latitude && details.location.longitude &&
                                    <Col md="12" className={style.detailSubSection}>
                                        <h3>Direction</h3>
                                        <MapComponent lat={Number(details.location.latitude)} lng={Number(details.location.longitude)}></MapComponent>
                                    </Col>
                                }
                            </Col>
                            <Col md="5">
                                <Col md="12" className={`${style.detailSubSection} ${style.rightSection}`}>
                                    <Col md="12" className={`${style.rightSubSection} ${style.sectionBorder}`}>
                                        <h3>The Club</h3>
                                        <p className={style.venueDesc}>D N Nagar32, Cosmopolitan Education Society Marg,
Shanti Nagar, Andheri, Mumbai.</p>
                                    </Col>
                                    <Col md="12" className={`${style.rightSubSection} ${style.availableArea} ${style.sectionBorder}`}>
                                        <div>
                                            <h5>Ganga</h5>
                                            <p>225 Seating | Indoor Conference Hall</p>
                                        </div>
                                        <button className={style.editBtn}>Change</button>
                                    </Col>
                                    <Col md="12" className={`${style.rightSubSection} ${style.sectionBorder}`}>
                                        <Row>
                                            <Col xs="6" className={`${style.checkin}`}>
                                                <div>
                                                    <h5>Check In</h5>
                                                    <p>Evening</p>
                                                </div>
                                                <button className={style.editBtn}>Change</button>
                                            </Col>
                                            <Col xs="6" className={`${style.checkin}`}>
                                                <div>
                                                    <h5>Check Out</h5>
                                                    <p>Evening</p>
                                                </div>
                                                <button className={style.editBtn}>Change</button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className={`${style.checkin}  ${style.sessionWrap}`}>
                                                <div>
                                                    <h5>Session</h5>
                                                    <p>Evening</p>
                                                </div>

                                                <button className={style.editBtn}>Change</button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="12" className={style.rightSubSection}>
                                        <h5>Price for</h5>
                                        <p>Ganga | <span>225 Seating | Indoor Conference Hall</span></p>
                                        <p>Thu, 03 Jan 2019, Evening </p>
                                    </Col>
                                    <Col md="12" className={style.rightSubSection}>
                                        <Row className={style.priceWrap}>
                                            <Col>
                                                <div className={style.offerPrice}>
                                                    ₹1,35,000.00
                                            </div>
                                                {/* <div className={style.price}>
                                                ₹1,35,000.00
                                            <div className={style.offPercentage}><span>10</span>% OFF</div>
                                            </div> */}
                                            </Col>
                                            <Col>
                                                <p>
                                                    (Prices are exclusive of GST, to be collected at the hotel directly.)
                                            </p>
                                            </Col>
                                        </Row>

                                    </Col>
                                    <Col md="12" className={style.rightSubSection}>
                                        <button className={style.addToCart} onClick={this.addToWishlist}>Add to Wishlist</button>
                                    </Col>
                                    <Col md="12" className={style.rightSubSection}>
                                        {details.cancelation_policy_url &&
                                            <a href={details.cancelation_policy_url} >+ Cancellation policy</a>
                                        }
                                        {details.terms_and_condition_url &&
                                            <a href={details.terms_and_condition_url}>+Terms and Conditions</a>
                                        }
                                    </Col>
                                </Col>
                            </Col>
                        </Row>

                    </div>
                    <div>
                    </div>
                </div>
               }
                <Modal isOpen={this.state.showGallery} toggle={() => this.toggleGallery()} centered={true}>
                   <ProductGallery details={details} close={this.toggleGallery}></ProductGallery>

                </Modal>
                {details && this.props.similarVendors && this.props.similarVendors.length > 0 &&
                <JumbotronComponent data={this.jumbotronData(details.category_name)} items={this.props.similarVendors} cardType="category" bgcolor="#f8f8f8" category={this.state.category} />
                }
            </div>
        );
    }

}


DetailPageComponent.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    reviewsData: PropTypes.object,
    details: PropTypes.object,
    similarVendors: PropTypes.array,
    match: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPageComponent);