import styles from './home.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

import * as actions from './actions';
import CarouselComponent from './carousel';
// import JumbotronComponent from '../../components/Jumbotron/jumbotron';
// import PackageComponent from './packageComponent';
// import HorizontalMultiCarousel from './multiCarouselHorizontal';
// import VerticalMultiCarousel from './multiCarouselVertical';
// import HorizontalScrollingCarousel from './horizontalScrollingCarousal';
import { imagePath } from '../../utils/assetUtils';

// const jumbotronData = [
//   {
//     title: 'Start planning your wedding!',
//     subtitle: "Find and book your dream team of local vendors based on your style and budget"
//   },
//   {
//     title: 'Overbound with choices?',
//     subtitle: 'You will be looking for ideas, and all exciting but there are so many that you realise how much planning you need to do and basically we offering the in packages so that also preferred '
//   },
//   {
//     title: 'We are here for you',
//     subtitle: 'From helping you select vendors to planning all your ceremonies we will be with you every step of the way'
//   },
//   {
//     title: 'Need Help?',
//     buttonText: 'Talk with wedding planner',
//     subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by clicking the Chat button below and theyâ€™ll help you get your party started.'
//   },
//   {
//     title: 'Joining With Us Is Quick and Easy',
//     buttonText: 'Join as Vendor',
//     subtitle: 'Ahwanam provides a full-service platform for listing services. get leads, send quotes, and collect payments all in one place.'
//   }
// ];

// const staticData = [
//   {
//     title: 'Browse all vendors',
//     description: 'Guaranteed best prices from all our vendors',
//     image: '/images/home_static1.jpg',
//   },
//   {
//     title: 'Wedding dashboard',
//     description: 'Add to wishlist, compare services, share ideas with family, finalize vendors and more!',
//     image: '/images/home_static2.jpg',
//   },

// ];

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.home.categories,
  exclusives: state.home.exclusives,
  ceremonies: state.home.ceremonies
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});


class Home extends Component {
  constructor(props) {
    super(props);
  }
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):

    let promises = [];
    promises.push(store.dispatch(actions.fetchExclusives()));
    promises.push(store.dispatch(actions.fetchCeremonies()));
    return Promise.all(promises);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (this.props.exclusives && this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchExclusives());
    }
    if (this.props.ceremonies && this.props.ceremonies.length === 0) {
      this.props.dispatch(actions.fetchCeremonies());
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCeremonyClick = (ceremony) => {
    this.navigateTo(`/ceremonies/${ceremony.ceremony_id}`)
  }

  render() {
    return (
      <div>
        {
          styles &&
          <div>
            <div className={`${styles.homeContainer} container`}>
              <Row>
                <Col>
                  <div className={styles.homeContent}>
                    <h1 className={styles.homeTitle}>Secret<br />to a stress<br />free wedding...<br /><span>Wedding Planner</span></h1>
                    <p>Sevenvows can help you with x ooxoox xcvxcv xcvxcvxc xo oxo oxo</p>
                    <div>
                      <input type="text" placeholder="Email/Phone" />
                      <Button className="primary-button medium-pink">FREE CONSULTATION</Button>

                    </div>
                  </div>
                </Col>
                <Col>
                  <img className={styles.homeImage} src={imagePath('home-image.png')} alt="call-button" />
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Col>
                  <h2>60% of couples think wedding planners <br />are unnecessary, until they panic</h2>
                  <p>Wedding planning takes a lot, but hiring a wedding planner is a surefire<br /> way to lighten your load and focus on enjoying your special day</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarouselComponent />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="primary-button medium-pink">LET  US HELP YOU</Button>
                </Col>
              </Row>

            </div>
            <div className={`${styles.mediumPinkBg} container-fluid`}>
              <Row>
                <Col>
                  <div className={styles.detailDesc}>We know</div>
                  <div className={styles.detailCount}>
                    <div>300 +</div>
                    <div>venues</div>
                  </div>
                </Col>
                <Col>
                  <div className={styles.detailDesc}>We have</div>
                  <div className={styles.detailCount}>
                    <div>15 +</div>
                    <div>years of experience</div>
                  </div>
                </Col>
                <Col>
                  <div className={styles.detailDesc}>We are in</div>
                  <div className={styles.detailCount}>
                    <div>10 +</div>
                    <div>cities</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.homeContainer} container`}>
              <Row>
                <Col className="text-center">
                  <h2>We make your dreams come true</h2>
                  <p>Whether it is planning your entire wedding or only parts of it, we <br />will fulfill your needs and make your wedding a lot more enjoyable</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <div>
                      <img src={imagePath('personalised-services.png')} alt="img" />
                      <h3>Personalised Services</h3>
                      <p className={styles.cardDetail}></p>
                    </div>
                    <div className={styles.cardImageContainer}>
                      <img src={imagePath('personalised-services-img.png')} alt="img" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src={imagePath('discounted-prices.png')} alt="img" />
                      <h3>Discounted Prices</h3>
                      <p className={styles.cardDetail}>Check out our exclusive wedding deals for your big day at amazing prices!</p>
                    </div>
                    <div className={styles.cardImageContainer}>
                      <img src={imagePath('discounted-prices-img.png')} alt="img" />
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src={imagePath('team.png')} alt="img" />
                      <h3>Seven Vows - expert Team</h3>
                      <p className={styles.cardDetail}>Meet our team of crazy talented planners from across the country! </p>
                    </div>
                    <div className={styles.cardImageContainer}>
                      <img src={imagePath('team-img.png')} alt="img" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.mediumPinkBg} container-fluid`}>
              <Container>
                <Row>
                    <Col>
                      <img src={imagePath('team.png')} alt="img" />
                    </Col>
                    <Col>
                      <h2 className={styles.whiteHeading}>Save money!</h2>
                      <p className={styles.whiteDesc}>These wedding packages are specially created to make every bride and grooms life easy</p>
                      <Button className="primary-button white">LET  US HELP YOU</Button>
                    </Col>
                </Row>
              </Container>
            </div>
            <Container>
              <Row>
                <Col>
                <img src={imagePath('box-one.png')} alt="img" />
                <div>
                  <h3>Gold Package</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                  <Button className="primary-button medium-pink">LEARN MORE</Button>
                </div>
                </Col>
                <Col>
                <img src={imagePath('box-one.png')} alt="img" />
                <div>
                  <h3>Emerald Package</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                  <Button className="primary-button medium-pink">LEARN MORE</Button>
                </div>
                </Col>
                <Col>
                <img src={imagePath('box-one.png')} alt="img" />
                <div>
                  <h3>Customize</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                  <Button className="primary-button medium-pink">WISHLIST</Button>
                </div>
                </Col>
              </Row>
            </Container>
          </div>
          }
        </div>
    );
  }
}

    Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  exclusives: PropTypes.array,
  ceremonies: PropTypes.array,
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);