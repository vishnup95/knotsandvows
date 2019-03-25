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
import ReviewItem from '../../components/Reviews/reviews';
import ReactPaginate from 'react-paginate';
import ProductGallery from '../../modals/productGallery/GalleryModal';
import StarRating from '../../components/StarRating/starRating';
import { imagePath } from '../../utils/assetUtils';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';
import LoaderComponent from '../../components/Loader/loader';
import { isLoggedIn } from '../../utils/utilities';
import ShowMoreText from 'react-show-more-text';


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

        this.state = {
            showGallery: false,
            vendor: '',
            category: '',
            reviewPage: 1
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
        this.props.dispatch(actions.fetchVendorDetails(category, vendor));
        this.props.dispatch(actions.fetchSimilarVendors(category, vendor));
        this.props.dispatch(actions.fetchReviews(category, vendor, 1));

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

            return <li key={index}>{area.name} <br />
                <span>{area.seating_capacity} Seating | {area.type}</span>
            </li>
        });
        return availableAreas;
    }

    renderAminities = (amenities) => {

        const availableAmenities = amenities.map((amenity, index) => {

            return <li key={index} ><span className={style.listIcon} style={{ background: "url(" + amenity.icon_url + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}></span>{amenity.name}</li>

        });
        return availableAmenities;
    }

    renderPolicies = (policies) => {

        const termsAndPolicies = policies.map((policy, index) => {

            return <li className={style.policy} key={index}>{policy.name}</li>

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

    pageChangeHandler(data) {
        this.props.dispatch(actions.fetchReviews(this.state.category, this.state.vendor, data.selected + 1));
        this.setState({ reviewPage: data.selected + 1 });
    }

    render() {
        let details = this.props.details;
        let reviewsData = this.props.reviewsData;
        return (
            <div className={style.detailContainer}>
                {this.props.detailsLoading && <LoaderComponent />}
                {details &&
                    <div>
                        <div className={style.bgImage} style={{ background: "url(" + details.cover_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
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
                                        <div>
                                            <StarRating rating={details.rating} size={'large'} />
                                        </div>
                                        {/* <div className={style.rating}>4.5/5 rating</div> */}
                                        <div className={style.review}> {details.reviews_count} Reviews</div>
                                    </div>
                                    <div className={style.viewBtnWrap}>
                                        <button className={style.viewBtn} onClick={(e) => this.addToWishList(e)}>Add to wishlist</button>
                                        <button className={style.removeBtn}>Remove from wishlist</button>
                                    </div>
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
                                        <li><button onClick={() => this.toggleGallery()}>Gallery ({details.gallery.length} Photos)</button></li>
                                    }
                                </ul>

                                {/* <button className={style.transparentBtn}>Short List</button> */}
                            </Row>
                            <Row>
                                <Col md="7">
                                    {details.about &&
                                        <Col md="12" className={style.detailSubSection}>
                                            <h3>About {details.name}</h3>
                                            <ShowMoreText
                                                lines={10}
                                                more='more'
                                                less='less'
                                            >{details.about}
                                            </ShowMoreText>
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
                                    <Col md="12" className={`${style.detailSubSection} ${style.rightSection} py-0`}>
                                        <Col md="12" className={`${style.rightSubSection} py-2`}>
                                           <div className={style.pricesContainer}> Starting Price</div>
                                            <div className={style.pricesContainer}>
                                                <div className={style.item}>
                                                    Mandap decoration  <br /><span className={style.grey}>(Price per event)</span>
                                                </div>
                                                <div className={style.itemPrice}>
                                                    ₹1,50,000.00  <br /><span className={style.grey}>GST extra</span>
                                                </div>
                                            </div>

                                            <div className={style.pricesContainer}>
                                                <div className={style.item}>
                                                    Bouquets  <br /><span className={style.grey}>(Price per unit)</span>
                                                </div>
                                                <div className={style.itemPrice}>
                                                    ₹1,50,000.00  <br /><span className={style.grey}>GST extra</span>
                                                </div>
                                            </div>

                                            <div className={style.pricesContainer}>
                                                <div className={style.item}>
                                                    Mandap decoration  <br /><span className={style.grey}>(Price per event)</span>
                                                </div>
                                                <div className={style.itemPrice}>
                                                    ₹2060.00  <br /><span className={style.grey}>GST extra</span>
                                                </div>
                                            </div>
                                        </Col>                                     
                                    </Col>
                                    
                                    <Col className={style.detailSubSection}>
                                        <Col md="12" className={`#{style.rightSubSection} text-center`}>
                                            <p className={style.needHelp}>Need some guidance on selecting vendors?</p>
                                            {/* <button className={style.addToCart} onClick={this.addToWishlist}>Add to Wishlist</button> */}
                                            <TalkToWeddingPlanner buttonText={'Talk to our wedding planner!'} />
                                        </Col>
                                    </Col>
                                    {false &&
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
                    <JumbotronComponent data={this.jumbotronData(details.category_name)} items={this.props.similarVendors} cardType="category" bgcolor="#f8f8f8" category={this.state.category} containerStyle="otherWrap"/>
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