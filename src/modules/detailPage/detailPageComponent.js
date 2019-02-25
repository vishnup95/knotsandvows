import React, { Component } from 'react';
import { imagePath } from '../../utils/assetUtils';
import style from './detailPageComponent.scss'
import { Row, Col, Modal } from 'reactstrap';
import MapComponent from '../../components/Map/map';

class DetailPageComponent extends Component {
    constructor(props) {
        super(props);
        this.toggleGallery = this.toggleGallery.bind(this);

        this.state = {
            showGallery: false
        };
    }

    toggleGallery = () => {
        this.setState({
            showGallery: !this.state.showGallery
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className={style.detailContainer}>
                <div className={style.bgImage} style={{ background: "url(" + imagePath('carousel_1.jpg') + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                </div>
                <div className={style.detailSection}>
                    <Row className={style.infoBox}>
                        <div>
                            <h3 >THE CLUB</h3>
                            <p >Mumbai (<a href="/">View on Map</a>)</p>
                            <p >The Club, D N Nagar32, Cosmopolitan Education Society Marg, Shanti Nagar, Andheri, Mumbai.</p>
                        </div>
                        <div>
                            star rating
                            {/* <div className={style.rating}>4.5/5 rating</div> */}
                            <div className={style.review}> 230 reviews</div>
                        </div>
                        <div className={style.viewBtnWrap}>
                            <button className={style.viewBtn} onClick={() => this.toggleGallery()}>View Gallery</button>
                        </div>
                    </Row>
                    <Row className={style.detailNav}>

                        <ul>
                            <li>About</li><li>Available Areas    </li><li>   Amenities</li><li>Policies</li><li>Availability</li><li>Direction</li><li>Reviews</li><li>Gallery (16 Photos)</li>
                        </ul>

                        {/* <button className={style.transparentBtn}>Short List</button> */}
                    </Row>
                    <Row>
                        <Col md="7">
                            <Col md="12" className={style.detailSubSection}>
                                <h3>About the Club</h3>
                                <p>The Club is one of the premier private membership clubs in Mumbai. An epitome of luxury and comfort, it is located in the Suburban Mumbai providing tranquility away from the rush of the city. Whatever the occasion—birthday, wedding, anniversary, cocktail dinners or farewell parties, The Club offers the perfect balance of class, quality and character with a superb range of delectable menu options for you to select from. Their specialised events team is there to help the bride and groom in every conceivable way. Known for their splendid hospitality services, they make your dreams come true by providing best in class services . For Weddings, decorations to wedding cakes, floral creations to memorable farewells, trust their team to streamline the planning and make your wedding day everything you had ever imagined while you sit back and enjoy your big day.
The Club has several banquets with bespoke décor and enormous capacity. They have an outdoor venue- The Garden View which overlooks a beautiful fountain and surrounded with lush greenery. It can accommodate upto 175 guests. The Colonial Courtyard is the grand outdoor venue which is best suitable for large gatherings like weddings and receptions and can accommodate …more                      upto 1500 guests. It has huge parking capacity of almost 200 cars. The Colonial hall is an indoor multi-purpose hall which can accommodate upto 250 guests. The Senate, an outdoor venue is best suitable for close gatherings and parties. It is situated near the pool and overlooks the lush green lawns of the club. The restaurants serving best of the delicacies, are designed with a beautiful view of the pool. The experienced master chefs cook a plethora of cuisines with lots of love and affection. They offer a wide variety of cuisines ranging from Indian to continental to Chinese. They have an in-house bar serving one of the finest collections of cocktails. Their décor team decorated the venue beautifully as per the requirements of their client. They also have their in-house DJ. Located in peaceful environment, The Club is a perfect place to exchange your vows .</p>
                            </Col>
                            <Col md="12" className={style.detailSubSection}>
                                <h3>Available Areas (5)</h3>
                                <ul className={style.selectableList}>
                                    <li className={style.selected}>Ganga <br />
                                        <span>225 Seating | Indoor</span>
                                    </li>
                                    <li className={style.selected}>Ganga <br />
                                        <span>225 Seating | Indoor</span>
                                    </li>
                                    <li>Ganga <br />
                                        <span>225 Seating | Indoor</span>
                                    </li>
                                    <li>Ganga <br />
                                        <span>225 Seating | Indoor</span>
                                    </li>
                                    <li>Ganga <br />
                                        <span>225 Seating | Indoor</span>
                                    </li>

                                </ul>

                            </Col>
                            <Col md="12" className={style.detailSubSection}>
                                <h3>Availability</h3>
                            </Col>
                            <Col md="12" className={style.detailSubSection}>
                                <h3>Amenities</h3>
                                <ul className={style.listWithIcon}>
                                    <li className={style.selected}>Dining Area</li>
                                    <li className={style.selected}>
                                        Coffee Shop</li>
                                    <li>
                                        Covered Car Parking</li>
                                    <li>
                                        Lift or Elevator</li>
                                    <li>
                                        Single Bed </li>
                                    <li>
                                        Inhouse catering</li>
                                    <li>
                                        Laundry </li>
                                    <li>
                                        Projector </li>
                                    <li>
                                        Sufficient Washroom</li>
                                    <li>
                                        Swimming Pool </li>

                                </ul>

                            </Col>
                            <Col md="12" className={style.detailSubSection}>
                                <h3>Policies</h3>
                                <ul className={style.selectableList}>
                                    <li className={style.selected}>Outside Decorators Allowed</li>
                                    <li className={style.selected}>
                                        Decorations Provided</li>
                                    <li className={style.selected}>
                                        Food Provided</li>
                                    <li className={style.selected}>
                                        Outside Food or caterer allowed</li>
                                    <li className={style.selected}>
                                        In house alcohol available</li>
                                    <li className={style.selected}>
                                        Outside alcohol permitted </li>
                                    <li className={style.selected}>
                                        Valet Parking</li>
                                    <li className={style.selected}>
                                        In house DJ available</li>
                                    <li className={style.selected}>
                                        Outside DJ permitted </li>

                                </ul>

                            </Col>
                            <Col md="12" className={style.detailSubSection}>
                                <h3>Direction</h3>
                                <MapComponent lat={17.3850} lng={78.4867}></MapComponent>
                            </Col>


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
                                    <button className={style.addToCart}>Add to Wishlist</button>
                                </Col>
                                <Col md="12" className={style.rightSubSection}>
                                    <a href="/" >+ Cancellation policy</a>   |   <a href="/">+Terms and Conditions</a>
                                </Col>
                            </Col>
                        </Col>
                    </Row>

                </div>
                <div>
                </div>
                <Modal isOpen={this.state.showGallery} toggle={() => this.toggleGallery()} centered={true}>
                    Gallery goes here

                </Modal>
            </div>
        );
    }

}

export default DetailPageComponent;