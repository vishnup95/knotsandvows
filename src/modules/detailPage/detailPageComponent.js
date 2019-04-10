import React, { Component } from 'react';
import style from './detailPageComponent.scss'
import { Row, Col, Modal, Form, Button } from 'reactstrap';
import MapComponent from '../../components/Map/map';
import * as actions from './actions';
import * as loginActions from '../../reducers/session/actions';
import * as talkToPlannerActions from '../../components/TalkToWeddingPlanner/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import ReviewItem from '../../components/Reviews/reviews';
import ReactPaginate from 'react-paginate';
import ProductGallery from '../../modals/productGallery/GalleryModal';
import StarRating from '../../components/StarRating/starRating';
import { imagePath, formatMoney } from '../../utils/assetUtils';
// import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';
import LoaderComponent from '../../components/Loader/loader';
import { isLoggedIn } from '../../utils/utilities';
import ShowMoreText from 'react-show-more-text';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import InputField from '../../components/InputField/inputField';
const mapStateToProps = state => ({
    user: state.session.user,
    details: state.details.details,
    detailsLoading: state.details.loading,
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
        this.dateRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();

        this.state = {
            showGallery: false,
            vendor: '',
            category: '',
            reviewPage: 1,
            email: '',
            phone: '',
            date: ''
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

    updateUIData = () => {

        let category = this.props.match.params.category_name;
        let vendor = this.props.match.params.vendor_name;
        this.setState({ vendor: vendor, category: category, reviewPage: 1 });
        this.props.dispatch(actions.fetchVendorDetails(vendor));
        this.props.dispatch(actions.fetchVendorGallery(vendor));
        this.props.dispatch(actions.fetchReviews(vendor, 1));
        this.props.dispatch(actions.fetchSimilarVendors(vendor));


    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    addToWishList = (e) => {
        if (!isLoggedIn()) {
            this.props.dispatch(loginActions.showLogin());
        }
        e.stopPropagation();
    }

    renderAvailableArea = (availableArea) => {

        const availableAreas = availableArea.map((area, index) => {

            return <li key={index}>{area.area_name} <br />
                <span>{area.seating_capacity} Seating | {area.type}</span>
            </li>
        });
        return availableAreas;
    }

    renderAminities = (amenities) => {

        const availableAmenities = amenities.map((amenity, index) => {

            return <li key={index} ><span className={style.listIcon} style={{ background: "url(" + amenity.amenity_icon + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></span>{amenity.amenity_name}</li>

        });
        return availableAmenities;
    }

    renderPolicies = (policies) => {

        const termsAndPolicies = policies.map((policy, index) => {

            return <li className={style.policy} key={index}><span>{policy.policy}</span></li>

        });
        return termsAndPolicies;
    }

    renderPackages = (packages) => {

        const packagesToRender = packages.map((item, index) => {

            return (
            <div className={style.pricesContainer} key={index}>
                <div className={style.item}>{item.name}<br/><span className={style.grey}>({item.charge_type})</span></div>
                <div className={style.itemPrice}>{formatMoney(item.price)} <br /><span className={style.grey}>GST extra</span></div>
            </div>
            )
        });
        return packagesToRender;
    }

    jumbotronData = (category) => {
        const jumbotronData =
        {
            title: 'Similar ' + category
        }
        return jumbotronData;
    }

    pageChangeHandler(data) {
        this.props.dispatch(actions.fetchReviews(this.state.vendor, data.selected + 1));
        this.setState({ reviewPage: data.selected + 1 });
    }

    sendDetailsToWeddingPlanner() {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let phone = this.phoneRef.current.validateFormInput(document.getElementById('phone'));
        let date = this.dateRef.current.validateFormInput(document.getElementById('date'));

        if (email && phone && date) {
            const params = {};
            params['email'] = this.state.email;
            this.state.date ? params['event_date'] = this.state.date : '';
            this.state.phone ? params['phone'] = this.state.phone : '';


            this.props.dispatch(talkToPlannerActions.postContactDetails(params));
        }
    }

    handleFormChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        let details = this.props.details;
        let reviewsData = this.props.reviewsData;
        let detailNavItems = [];
        if (details) {
            if (details.description) {
                detailNavItems.push("About");
            }
            if (details.availableareas && details.availableareas.length > 0) {
                detailNavItems.push("Available Areas");
            }
            if (details.amenities && details.amenities.length > 0) {
                detailNavItems.push("Amenities");
            }
            if (details.Policies && details.Policies.length > 0) {
                detailNavItems.push("Policies");
            }
            if (details.location && details.location.latitude && details.location.longitude) {
                detailNavItems.push("Direction");
            }
            if (reviewsData && reviewsData.results && reviewsData.results.length > 0) {
                detailNavItems.push("Reviews");
            }
            if (details.gallery && details.gallery.length > 0) {
                detailNavItems.push(`Gallery (${details.gallery.length} Photos)`);
            }
        }

        return (
            <div className={style.detailContainer}>
                {this.props.detailsLoading && <LoaderComponent />}
                {details &&
                    <div>
                        <div className={style.bgImage} style={{ background: "url(" + details.pic_url + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        </div>
                        <div className={style.detailSection}>
                            <Row className={style.infoBox}>
                                <div>
                                    <h3 >{details.name} <img src={imagePath('wishlist_unselected.svg')} className={style.heartImg} alt="Unselected heart" />
                                    </h3>
                                    <p >{details.city} (<a href="/">View on Map</a>)</p>
                                    <p >{details.address}</p>
                                </div>
                                <div className={style.infoSub}>
                                    <div className={style.ratingWrap}>
                                        {details.rating && <div>
                                            <StarRating rating={String(details.rating)} size={'large'} />
                                        </div>}
                                        <div className={style.review}> {details.reviews_count} Reviews</div>
                                    </div>
                                    <div className={style.viewBtnWrap}>
                                        <button className="primary-button" onClick={(e) => this.addToWishList(e)}>Add to wishlist</button>
                                        <button className={style.removeBtn}>Remove from wishlist</button>
                                    </div>
                                </div>
                            </Row>
                            <Row className={`${style.detailNav} tab-only`}>

                                <ul>
                                    {
                                        detailNavItems.map((item, index) => {
                                            return <li key={index}>{item}</li>
                                        })
                                    }
                                </ul>

                                {/* <button className={style.transparentBtn}>Short List</button> */}


                            </Row>
                            <Row className={`${style.detailNav} mobile-only`}>
                                <Col>
                                    <HorizontalSlider data={detailNavItems} type='basic' buttonAction={this.handleCategoryChange} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="7">
                                    {details.description &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <h3>About {details.name}</h3>
                                            <ShowMoreText
                                                lines={10}
                                                more='more'
                                                less='less'
                                            >{details.description}
                                            </ShowMoreText>
                                        </Col>
                                    }
                                    {details.availableareas && details.availableareas.length > 0 &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <h3>Available Areas ({details.availableareas.length})</h3>
                                            <ul className={style.selectableList}>
                                                {this.renderAvailableArea(details.availableareas)}
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
                                    {details.Policies && details.Policies.length > 0 &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <h3>Policies</h3>
                                            <ul className={style.selectableList}>
                                                {this.renderPolicies(details.Policies)}
                                            </ul>

                                        </Col>
                                    }
                                    {details.location && details.location.latitude && details.location.longitude &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <h3>Direction</h3>
                                            <MapComponent lat={Number(details.location.latitude)} lng={Number(details.location.longitude)}></MapComponent>
                                        </Col>
                                    }
                                    {reviewsData && reviewsData.results && reviewsData.results.length > 0 &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <div className={style.reviewHeader}>Reviews <span>({reviewsData.total_review_count})</span></div>
                                            <div className={style.starWrap}>
                                                <StarRating rating={details.rating} size={'large'} />
                                            </div>
                                            {
                                                reviewsData.results.map((review, index) => {
                                                    return (
                                                        <ReviewItem review={review} key={index} />
                                                    );
                                                })
                                            }
                                            {reviewsData.no_of_pages > 1 &&
                                                <ReactPaginate
                                                    previousLabel={<img className="rotate-left" src={imagePath('arrow-small.png')} alt="arrow-previous" />}
                                                    nextLabel={<img src={imagePath('arrow-small.png')} alt="arrow-next" />}
                                                    breakLabel={'...'}
                                                    forceSelect={this.state.reviewPage}
                                                    breakClassName={'break-me'}
                                                    pageCount={reviewsData.no_of_pages}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={(data) => this.pageChangeHandler(data)}
                                                    containerClassName={'pagination'}
                                                    subContainerClassName={'pages pagination'}
                                                    activeClassName={'active'} />
                                            }
                                        </Col>
                                    }
                                </Col>

                                <Col md="5">
                                {details.packages && details.packages.length > 0 &&
                                    <Col md="12" className={`${style.detailSubSection} ${style.rightSection} py-0`}>
                                        <Col md="12" className={`${style.rightSubSection} py-2`}>
                                            <div className={style.pricesContainer}> Starting Price</div>
                                            {this.renderPackages(details.packages)}
                                        </Col>
                                    </Col>}

                                    <Col className={style.detailSubSection}>
                                        <Col md="12" className={`#{style.rightSubSection} text-center`}>
                                            <p className={style.needHelp}>Need some guidance on selecting vendors?</p>
                                            {/* <button className={style.addToCart} onClick={this.addToWishlist}>Add to Wishlist</button> */}
                                            <Form style={{ zIndex: '10000' }} className="position-relative">
                                                <InputField placeHolder="Your event date" id="date" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} required={false} />
                                                <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} />
                                                <InputField placeHolder="Phone number" id="phone" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} required={false} />
                                            </Form>
                                            <div className="text-center">
                                                <Button className="primary-button" onClick={() => this.sendDetailsToWeddingPlanner()}>Talk to our wedding planner!</Button>
                                            </div>
                                        </Col>
                                    </Col>
                                    {true &&
                                        <Col className={`${style.detailSubSection} ${style.noteSection}`}>
                                            <Col md="12" className={`${style.rightSubSection} text-left`}>
                                                <h4 className={style.noteHeader}>Notes</h4>
                                                <div className={style.noteWrap}>
                                                    <div>
                                                        <span className={style.noteTitle}>Binu</span>
                                                        <span className={style.noteDate}>07 Mar 2019</span>
                                                    </div>
                                                    <div className={style.noteText}>
                                                        <div>
                                                            <span className="edit-icon"></span>
                                                            <span className="delete-icon"></span>
                                                        </div>
                                                        <div>
                                                            Viverra accumsan in nisl nisi scelerisque. Sit amet justo donec enim. Commodo elit at imperdiet dui accumsan sit amet. Eget aliquet nibh praesent tristique magna. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Morbi leo urna molestie at elementum eu facilisis sed.
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className={style.noteWrap}>
                                                    <div>
                                                        <span className={style.noteTitle}>Binu</span>
                                                        <span className={style.noteDate}>07 Mar 2019</span>
                                                    </div>
                                                    <div className={style.noteText}>
                                                        <div>
                                                            <span className="edit-icon"></span>
                                                            <span className="delete-icon"></span>
                                                        </div>
                                                        <div>
                                                            Viverra accumsan in nisl nisi scelerisque. Sit amet justo donec enim. Commodo elit at imperdiet dui accumsan sit amet. Eget aliquet nibh praesent tristique magna. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Morbi leo urna molestie at elementum eu facilisis sed.
                                                    </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Col>
                                    }
                                </Col>

                            </Row>
                        </div>
                        <div>
                        </div>
                    </div>
                }
                <Modal isOpen={this.state.showGallery} toggle={() => this.toggleGallery()} centered={true} className={style.imageGallery}>
                    <ProductGallery details={details} close={this.toggleGallery}></ProductGallery>

                </Modal>
                {details && this.props.similarVendors && this.props.similarVendors.length > 0 &&
                    <JumbotronComponent data={this.jumbotronData(details.category_name)} items={this.props.similarVendors} cardType="category" bgcolor="#f8f8f8" category={this.state.category} containerStyle="otherWrap" />
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
    match: PropTypes.object,
    detailsLoading: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPageComponent);