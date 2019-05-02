import React, { Component } from 'react';
import style from './detailPageComponent.scss'
import { Row, Col, Modal, Form, Button } from 'reactstrap';
// import MapComponent from '../../components/Map/map';
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
import { imagePath, detectMobile } from '../../utils/assetUtils';
import * as wishlistActions from '../../modules/wishlist/actions';
import LoaderComponent from '../../components/Loader/loader';
import { isLoggedIn, getDataFromResponse, getId, formatDate, formatMoney, getChargeType } from '../../utils/utilities';
import ShowMoreText from 'react-show-more-text';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import InputField from '../../components/InputField/inputField';
import ProgressButton from '../../components/ProgressButton/PorgressButton';
import * as modalActions from '../../reducers/modal/actions';
import HorizontalScrollingCarousel from '../home/horizontalScrollingCarousal';

const mapStateToProps = state => ({
    user: state.session.user,
    details: state.details.details,
    notes: state.details.notes,
    gallery: state.details.gallery,
    detailsLoading: state.details.loading,
    reviewsData: state.details.reviewsData,
    similarVendors: state.details.similarVendors,
    wishListApiLoading: state.wishlist.loading,
    wishlistId: state.wishlist.current.wishlist_id
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

        this.state = {
            showGallery: false,
            vendor: '',
            category: '',
            reviewPage: 1,
            email: '',
            phone: '',
            date: '',
            isInWishList: false,
            selectedNavItem: 0
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
            return
        }

        if (this.props.details != prevProps.details && this.props.details != null) {
            this.setState({ isInWishList: this.props.details.is_in_wishlist });
        }

        if(this.props.user != prevProps.user && this.props.user) {
            this.props.dispatch(actions.fetchVendorDetails(this.state.vendor));
            this.props.dispatch(actions.fetchSimilarVendors(this.state.vendor));
        }
    }

    componentWillMount() {
        this.updateUIData();
        this.props.dispatch(talkToPlannerActions.clearTalkToErrors());

    }

    updateUIData = () => {

        let category = this.props.match.params.category_name;
        let vendor = this.props.match.params.vendor_name;
        this.setState({ vendor: vendor, category: category, reviewPage: 1 });
        this.props.dispatch(actions.fetchVendorDetails(vendor));
        this.props.dispatch(actions.fetchVendorGallery(vendor));
        this.props.dispatch(actions.fetchReviews(vendor, 1));
        this.props.dispatch(actions.fetchSimilarVendors(vendor));

        if (isLoggedIn() && this.props.wishlistId != 0) {
            let details = {
                vendor_id: getId(vendor),
                wishlist_id: this.props.wishlistId
            }
            this.props.dispatch(actions.fetchAllNotes(details));
        }


    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    addToWishList = (e) => {
        if (!isLoggedIn()) {
            this.props.dispatch(loginActions.showLogin());
        } else {
            if (!this.state.isInWishList) {
                let params = {
                    vendor_id: this.props.details.vendor_id,
                    wishlist_id: this.props.wishlistId
                };
                this.props.dispatch(wishlistActions.addToWishlist(params)).then((response) => {
                    var error = getDataFromResponse(response);
                    if (error == null) {
                        this.setState({ isInWishList: true });
                    } else {
                        let modalContent = {
                            heading: '',
                            message: error,
                            type: 'failure'
                        };
                        this.props.dispatch(modalActions.showModal(modalContent));
                    }
                });
            }
        }
        e.stopPropagation();
    }

    removeFromWishList = (e) => {
        if (this.state.isInWishList) {
            let params = {
                vendor_id: this.props.details.vendor_id,
                wishlist_id: this.props.wishlistId,
                category_id: this.props.details.category_id
            };
            this.props.dispatch(wishlistActions.removeFromWishlist(params)).then((response) => {
                var error = getDataFromResponse(response);
                if (error == null) {
                    this.setState({ isInWishList: false });
                } else {
                    let modalContent = {
                        heading: '',
                        message: error,
                        type: 'failure'
                    };
                    this.props.dispatch(modalActions.showModal(modalContent));
                }
            });
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
                    <div className={style.item}>{item.name}<br />
                    { getChargeType(item.format_price,item.charge_type) &&
                    <span className={style.grey}>({item.charge_type})</span>
                    }</div>
                    <div className={style.itemPrice}>{formatMoney(item.format_price)} <br />{item.format_price && item.format_price != 0 && <span className={style.grey}>(GST not included)</span>}</div>
                </div>
            )
        });
        return packagesToRender;
    }

    renderNotes = (notes) => {

        const notesToRender = notes.map((note, index) => {

            return (
                <div className={style.noteWrap} key={index}>
                    <div>
                        <span className={style.noteTitle}>{note.author_name}</span>
                        <span className={style.noteDate}>{formatDate(note.added_datetime)}</span>
                    </div>
                    <div className={style.noteText}>
                        <div>
                            <span className="edit-icon"></span>
                            <span className="delete-icon"></span>
                        </div>
                        <div>
                            {note.note}
                        </div>
                    </div>
                </div>
            )
        });
        return notesToRender;
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
        let date = this.dateRef.current.validateFormInput(document.getElementById('date'));

        if (email && date) {
            const params = {};
            params['origin'] = 'DETAIL_PAGE_FORM';
            if (/^\d{10}$/.test(email)) {
                params['phone'] = this.state.email;

            }
            else {
                params['email'] = this.state.email;

            }
            this.state.date ? params['event_date'] = this.state.date : '';
            this.props.dispatch(talkToPlannerActions.postContactDetails(params));
        }
    }

    handleFormChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleNavClick = (item, index) => {
        this.setState({ selectedNavItem: index });

        switch (item.id) {
            case 'gallery': this.toggleGallery(); break;
            default: this.scrollToDetailSection(item.id); break;
        }
    }

    scrollToDetailSection(id) {
        let yPos =  document.getElementById(id).offsetTop;
        window.scrollTo({
            top: yPos + (detectMobile() ? 550 : 340),
            left: 0,
            behavior: 'smooth'
        });
    }

    render() {
        let details = this.props.details;
        let reviewsData = this.props.reviewsData;
        let detailNavItems = [];
        if (details) {
            if (details.description) {
                detailNavItems.push({ display_name: "About", id: "about" });
            }
            if (details.availableareas && details.availableareas.length > 0) {
                detailNavItems.push({ display_name: "Available Areas", id: "available_area" });
            }
            if (details.amenities && details.amenities.length > 0) {
                detailNavItems.push({ display_name: "Amenities", id: "amenities" });
            }
            if (details.policies && details.policies.length > 0) {
                detailNavItems.push({ display_name: "Policies", id: "policies" });
            }
            // if (details.location && details.location.latitude && details.location.longitude) {
            //     detailNavItems.push({ display_name: "Direction", id: "direction" });
            // }
            if (reviewsData && reviewsData.results && reviewsData.results.length > 0) {
                detailNavItems.push({ display_name: "Reviews", id: "reviews" });
            }
            if (this.props.gallery && this.props.gallery.length > 0) {
                detailNavItems.push({ display_name: `Gallery (${this.props.gallery.length})`, id: "gallery" });
            }
        }
        const heartIcon = this.state.isInWishList ? 'wishlist_selected.svg' : 'wishlist_unselected.svg';
        return (
            <div className={style.detailContainer}>
                {this.props.detailsLoading && <LoaderComponent />}
                {details &&
                    <div>
                        <div className={style.bgImage} style={{ background: "url(" + details.pic_url + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                        </div>
                        <div className={style.detailSection}>
                            <Row className={style.infoBox}>
                                <div className={style.infoText}>
                                    <h3 >{details.name} <img src={imagePath(heartIcon)} className={style.heartImg} alt="heart" />
                                    </h3>
                                    <p >
                                        {details.city}
                                        {/* {
                                            this.props.details.location && this.props.details.location.latitude && this.props.details.location.longitude &&
                                            <span onClick={() => this.scrollToDetailSection('direction')} aria-hidden>(View on Map)</span>
                                        } */}
                                    </p>
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
                                        <ProgressButton isDisabled={this.state.isInWishList} onClick={(e) => this.addToWishList(e)} title="Add to wishlist" isLoading={this.props.wishListApiLoading}></ProgressButton>
                                        {this.state.isInWishList && <button className={style.removeBtn} onClick={(e) => this.removeFromWishList(e)}>Remove from wishlist</button>}
                                    </div>
                                </div>
                            </Row>
                            <Row className={`${style.detailNav} tab-only`}>

                                <ul>
                                    {
                                        detailNavItems.map((item, index) => {
                                            return <li key={index} className={this.state.selectedNavItem === index ? style.selectedItem : ''} aria-hidden onClick={() => this.handleNavClick(item, index)}>{item.display_name}</li>
                                        })
                                    }
                                </ul>

                                {/* <button className={style.transparentBtn}>Short List</button> */}


                            </Row>
                            <Row className={`${style.detailNav} mobile-only`}>
                                <Col className="no-padding">
                                    <HorizontalSlider data={detailNavItems} type='basic' buttonAction={this.handleNavClick} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="7">
                                    {details.description &&
                                        <Col md="12" className={style.detailSubSection} id="about">
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
                                        <Col md="12" className={style.detailSubSection} id="available_area">
                                            <h3>Available Areas ({details.availableareas.length})</h3>
                                            <ul className={style.selectableList}>
                                                {this.renderAvailableArea(details.availableareas)}
                                            </ul>

                                        </Col>
                                    }

                                    {details.amenities && details.amenities.length > 0 &&
                                        <Col md="12" className={style.detailSubSection} id="amenities">
                                            <h3>Amenities</h3>
                                            <ul className={style.listWithIcon}>
                                                {this.renderAminities(details.amenities)}
                                            </ul>

                                        </Col>
                                    }
                                    {details.policies && details.policies.length > 0 &&
                                        <Col md="12" className={style.detailSubSection} id="policies">
                                            <h3>Policies</h3>
                                            <ul className={style.selectableList}>
                                                {this.renderPolicies(details.policies)}
                                            </ul>

                                        </Col>
                                    }
                                    {/* {details.location && details.location.latitude && details.location.longitude &&
                                        <Col md="12" className={style.detailSubSection} id="direction">
                                            <h3>Direction</h3>
                                            <MapComponent lat={Number(details.location.latitude)} lng={Number(details.location.longitude)}></MapComponent>
                                        </Col>
                                    } */}
                                    {reviewsData && reviewsData.results && reviewsData.results.length > 0 &&
                                        <Col md="12" className={style.detailSubSection} id="reviews">
                                            <div className={style.reviewHeader}>Reviews & Ratings <span>({reviewsData.total_review_count})</span></div>
                                            <div className={style.starWrap}>
                                                <StarRating rating={String(details.rating)} size={'large'} />
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
                                            <p className={style.needHelp}>Need some guidance on selecting VowVendors?</p>
                                            {/* <button className={style.addToCart} onClick={this.addToWishlist}>Add to Wishlist</button> */}
                                            <Form className="position-relative">
                                                <InputField placeHolder="Email address/Phone number" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} phoneCheck={true} />
                                                <InputField placeHolder="Your event date" id="date" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} required={false} />
                                            </Form>
                                            <div className="text-center mt-2">
                                                <Button className="primary-button" onClick={() => this.sendDetailsToWeddingPlanner()}>Talk to our experts!</Button>
                                            </div>
                                        </Col>
                                    </Col>
                                    {details && this.props.notes && this.props.notes.length > 0 &&
                                        <Col className={`${style.detailSubSection} ${style.noteSection}`}>
                                            <Col md="12" className={`${style.rightSubSection} text-left`}>
                                                <h4 className={style.noteHeader}>Notes</h4>
                                                <div>{this.renderNotes(this.props.notes)}</div>
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
                {details &&
                    <Modal isOpen={this.state.showGallery} toggle={() => this.toggleGallery()} centered={true} className={style.imageGallery}>
                        <ProductGallery images={this.props.gallery} name={details.name} close={this.toggleGallery}></ProductGallery>

                    </Modal>
                }
                {details && this.props.similarVendors && this.props.similarVendors.length > 0 &&
                    <JumbotronComponent data={this.jumbotronData(details.category_name)} items={this.props.similarVendors} cardType="category" bgcolor="#f8f8f8" category={this.state.category} containerStyle="otherWrap" >
                        <Col xs="12" className={`${style.mobileCarousal} no-padding d-block d-sm-none`}>
                            <HorizontalScrollingCarousel data={this.props.similarVendors} type="similar_vendors" category={this.state.category} />
                        </Col>
                    </JumbotronComponent>
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
    detailsLoading: PropTypes.bool,
    wishListApiLoading: PropTypes.bool,
    wishlistId: PropTypes.number,
    gallery: PropTypes.array,
    notes: PropTypes.array,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPageComponent);