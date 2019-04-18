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
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import * as actions from './actions';
import * as talktoAhwanamActions from '../../components/TalkToWeddingPlanner/actions';
import CarouselComponent from './carousel';
import { imagePath } from '../../utils/assetUtils';
import { hyphonatedString } from '../../utils/utilities';
import ImageFade from '../../components/ImageFade/imageFade';

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


const headerString = ['Customised Wedding Packages ', 'to help you celebrate...'];
const headerStringTwo = ['Your day. Your way'];

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);

  }
  state = {
    zoomCard: false,
    animateImageOne: false,
    animateImageTwo: false,
    animateImageThree: false,
    showDesc: false,
    errorMessage: ''
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
    window.addEventListener('scroll', this.handleScroll);
    this.handleSectionScroll(this.props);
  }

  componentWillMount() {
    if (this.props.exclusives && this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchExclusives());
    }
    if (this.props.ceremonies && this.props.ceremonies.length === 0) {
      this.props.dispatch(actions.fetchCeremonies());
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (window.innerWidth > 1023) {
      const section1 = document.getElementById('numbersection');
      const section1Visible = this.checkVisible(section1);
      const section2 = document.getElementById('personalisedSection');
      const section2Visible = this.checkVisible(section2);
      const section3 = document.getElementById('discountSection');
      const section3Visible = this.checkVisible(section3);
      const section4 = document.getElementById('thirdcard');
      const section4Visible = this.checkVisible(section4);
      const section5 = document.getElementById('boxmark');
      const section5Visible = this.checkVisible(section5);

      if (section1Visible) {
        this.setState({ zoomCard: true });
      }
      else {
        this.setState({ zoomCard: false });
      }

      if (section2Visible) {
        this.setState({ animateImageOne: true });
      }
      else {
        this.setState({ animateImageOne: false });
      }

      if (section3Visible) {
        this.setState({ animateImageTwo: true });
      }
      else {
        this.setState({ animateImageTwo: false });
      }

      if (section4Visible) {
        this.setState({ animateImageThree: true });
      }
      else {
        this.setState({ animateImageThree: false });
      }

      if (section5Visible) {
        const section5Flag = document.getElementById('boxmark').getBoundingClientRect().top;
        const section5rate = section5Flag / window.innerHeight * 100;
        const topOne = (-73 * section5rate / 100);
        const leftOne = (25 * section5rate / 100);
        const topTwo = (-79 * section5rate / 100);
        const leftTwo = (-117 * section5rate / 100);
        const topThree = (-83 * section5rate / 100);
        const leftThree = (-164 * section5rate / 100);
        document.getElementById('box-one').style.transform = 'translate3d(' + leftOne + '%,' + topOne + 'rem,0px)';
        document.getElementById('box-two').style.transform = 'translate3d(' + leftTwo + '%,' + topTwo + 'rem,0px)';
        document.getElementById('box-three').style.transform = 'translate3d(' + leftThree + '%,' + topThree + 'rem,0px)';
        this.setState({ showDesc: false });

      }
      else if (document.getElementById('boxend').getBoundingClientRect().top <= 0) {
        document.getElementById('box-one').style.transform = 'translate3d(0px,0px,0px)';
        document.getElementById('box-two').style.transform = 'translate3d(0px,0px,0px)';
        document.getElementById('box-three').style.transform = 'translate3d(0px,0px,0px)';
        this.setState({ showDesc: true });

      }
      else {
        document.getElementById('box-one').style.transform = 'translate3d(25%,-73rem,0px)';
        document.getElementById('box-two').style.transform = 'translate3d(-117%,-79rem,0px)';
        document.getElementById('box-three').style.transform = 'translate3d(-164%,-83rem,0px)';
        this.setState({ showDesc: false });

      }

    }
    else {
      document.getElementById('box-one').style.transform = 'translate3d(0px,0px,0px)';
      document.getElementById('box-two').style.transform = 'translate3d(0px,0px,0px)';
      document.getElementById('box-three').style.transform = 'translate3d(0px,0px,0px)';
      this.setState({ showDesc: true });
    }
  }

  checkVisible(elm) {
    const rect = elm ? elm.getBoundingClientRect() : '';
    if (rect) {
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      this.scrollasideDiv = !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    } else {
      this.scrollasideDiv = false;
    }
    return this.scrollasideDiv;
  }

  componentWillReceiveProps(nextProps) {
    this.handleSectionScroll(nextProps);
  }
  handleSectionScroll = (props) => {
    if (props.location.hash === '#packages') {
      let yPos = document.getElementById('packages').offsetTop;
      window.scrollTo({
        top: yPos - 50,
        left: 0,
        behavior: 'smooth'
      });
    } else if (props.location.hash === '#ceremonies') {
      let yPos = document.getElementById('ceremonies').offsetTop;
      window.scrollTo({
        top: yPos - 50,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  componentDidUpdate() {
    if (this.state.errorMessage) {
      setTimeout(() => {
        this.setState({ errorMessage: '' })
      }, 15000)
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCeremonyClick = (ceremony) => {
    this.navigateTo(`/ceremonies/${hyphonatedString(ceremony.ceremony_name, ceremony.ceremony_id)}`)
  }

  validateInput() {
    let inputValue = document.getElementById('freeConsult').value;

    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/.test(inputValue) && !/^\d{10}$/.test(inputValue)) {
      this.setState({ errorMessage: 'Please enter a valid email or phone number' });
    } else {
      let params = {
        email: inputValue
      }

      this.props.dispatch(talktoAhwanamActions.postContactDetails(params));
    }
  }

  render() {
    return (
      <div className={styles.homeOuter}>
        {
          styles &&
          <div>
            <div className={`${styles.homeContainer} container-fluid`}>
              <Row>
                <Col xs='12' md='3' className="p-relative no-padding-mobile">
                  <div className={styles.homeContent}>
                    <p className="tab-only">You can’t plan love. <br />But you can plan<br />how to celebrate it.</p>

                    <div className={`${styles.homeTitle} tab-only`}>

                      {
                        headerString.map((item, index) => {
                          let name = [];
                          for (var i = 0; i < item.length; i++) {
                            name.push(
                              <div key={`${index}_${i}`}>{item.charAt(i)}</div>
                            );
                          }

                          return <div key={index}>{name}</div>;

                        })
                      }
                      {
                        headerStringTwo.map((item, index) => {
                          let name = [];
                          for (var i = 0; i < item.length; i++) {
                            name.push(
                              <div key={`${index}_${i}`}>{item.charAt(i)}</div>
                            );
                          }

                          return <div key={index} className={styles.pink}>{name}</div>;

                        })
                      }

                    </div>
                    <h1 className={`${styles.homeTitle} mobile-only`}>Customised Wedding Packages<br />to help you celebrate...<br /><span>Your day. Your way.</span></h1>
                    <div className={styles.contactInput}>
                      <input type="text" placeholder="Email/Phone" id="freeConsult" onFocus={() => this.setState({ errorMessage: '' })} />
                      <Button className="primary-button medium-pink" onClick={() => this.validateInput()}>FREE CONSULTATION</Button>
                    </div>
                    <p className={styles.error}>{this.state.errorMessage}</p>
                  </div>
                </Col>
                <Col xs='12' md='9' className="no-padding-mobile">
                  <ImageFade />
                </Col>
              </Row>
            </div>
            <div className={`${styles.homeContainer} container`}>

              <hr className="tab-only"></hr>
              <Row>
                <Col>
                  <h2>70% of couples regret not hiring <br /><span>wedding planners</span></h2>
                  <p>It doesn’t take much time for your blissful day to turn stressful. <br />SevenVows, with their array <br />of services,help you plan the biggest day of your life in the best possible way.</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarouselComponent isZoom={this.state.zoomCard} />
                </Col>
              </Row>
              <Row>
                <Col className="text-center flex justify-center mt-5" id="numbersection">
                  <Button className="primary-button home-btn medium-pink">LET US HELP YOU</Button>
                </Col>
              </Row>

            </div>
            <div className={`${styles.mediumPinkBg} ${styles.bRadius} ${styles.venueCount} container-fluid`}>
              <div className={`${styles.homeContainer} container`}>
                <Row className='justify-center mobile-column'>
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We know</div> */}
                    <div className={styles.detailCount}>
                      <div>300 +</div>
                      <div>venues</div>
                    </div>
                  </Col>
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We have</div> */}
                    <div className={styles.detailCount}>
                      <div>15 +</div>
                      <div>years of experience</div>
                    </div>
                  </Col>
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We are in</div> */}
                    <div className={styles.detailCount}>
                      <div>10 +</div>
                      <div>cities</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={`${styles.homeContainer} ${styles.imageCardWrap} container`}>
              <Row>
                <Col className="text-center">
                  <h2>Get hitched. Without a hitch</h2>
                  {/* <p>Whether it is planning your entire wedding or only parts of it, we <br />will fulfill your needs and make your wedding a lot more enjoyable</p> */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('personalised-services.png')} alt="img" />
                      <div className={styles.cardDetail}>
                        <h3>Customisable services</h3>
                        <p>All our actions adhere to our credo - ‘Your day. Your way’. We help as much as you want us to. You can choose us to plan your entire wedding or you can pick which of your ceremonies you need our help with.</p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageOne ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('personalised-services-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="personalisedSection"></div>
                  </div>
                  <div className={`${styles.imageCard} ${styles.imageCardReverse}`}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('discounted-prices.png')} alt="img" />
                      <div className={styles.cardDetail}>
                        <h3>No pocket pinch</h3>
                        <p>It feels nice to spend the world on your wedding. However, savings can go a long way. We help you get attractive discounts on quality services. </p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageTwo ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('discounted-prices-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="discountSection"></div>
                  </div>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('team.png')} alt="img" />
                      <div className={styles.cardDetail}>
                        <h3>Expert team</h3>
                        <p>We are a team of passionate professionals with over 15 years of experience, striving to make the world a happier place, one wedding at a time.</p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageThree ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('team-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="thirdcard"></div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.mediumPinkBg} ${styles.boxSection} container-fluid`}>
              <Container>
                <Row className={styles.boxMark}>
                  <Col id="boxmark"></Col></Row>
                <Row className="mobile-col-reverse">
                  <Col className="justify-center flex align-center mobile-column">
                    <img className="mobile-only" src={imagePath('packagesimage.png')} alt="img" />
                    <Button className="mobile-only primary-button home-btn white">LET’S DO IT</Button>
                  </Col>
                  <Col className={styles.dummyClass}>
                    <h2 className={styles.whiteHeading}>Less worries.<span className="tab-only"><br /></span>More savings.</h2>
                    <p className={styles.whiteDesc}>Choose from one of our customised packages <br />to steer clear of stress and get attractive discounts.</p>
                    <Button className="tab-only primary-button home-btn white">LET’S DO IT</Button>
                  </Col>
                </Row>
                <Row>
                  <Col id="boxend"></Col>
                </Row>
              </Container>
            </div>
            <div className={styles.packageWrap}>
              <Container className={`${styles.homeContainer}`}>
                <Row className="mb-5" id="packages">
                  <Col className={styles.packageBox} id="box-one">
                    <img src={imagePath('box-one.png')} alt="img" />
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Gold Package</h3>
                      <p>Give your dream wedding a golden touch.<br />Here’s a complete wedding solution crafted just for you.</p>
                      <a className="primary-button home-btn white" href='/packages/wedding-gold-package' target="_blank" rel="noopener noreferrer" alt="">Go for Gold</a>
                      {/* <Button className="primary-button home-btn medium-pink">LEARN MORE</Button> */}
                    </div>
                  </Col>
                  <Col className={styles.packageBox} id="box-two">
                    <img src={imagePath('box-two.png')} alt="img" />
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Emerald Package</h3>
                      <p>Add shine to your wedding celebration.<br />Here’s a package that’s packed with wedding goodness.</p>
                      <a className="primary-button home-btn white" href='/packages/wedding-emerald-package' target="_blank" rel="noopener noreferrer" alt="">Exquisitely Emerald</a>

                      {/* <Button className="primary-button home-btn medium-pink">LEARN MORE</Button> */}
                    </div>
                  </Col>
                  <Col className={styles.packageBox} id="box-three">
                    <img src={imagePath('box-three.png')} alt="img" />
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Genie Package</h3>
                      <p>Your wish is our command. <br />Choose what you need and make your dream team of wedding vendors.</p>
                      {/* <Button className="primary-button home-btn medium-pink">WISHLIST</Button> */}
                      <a className="primary-button home-btn white" href='/wishlist' rel="noopener noreferrer" alt="">Your Wish</a>

                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <Container>
              <Row className="mt-5" id="ceremonies">
                <Col className={`${styles.ceremony} text-center`}>
                  <h2>You may also be interested in...</h2>
                  {this.props.ceremonies &&
                    <Col xs="12" className={` no-padding mb-5`}>
                      <HorizontalSlider data={this.props.ceremonies} onSelect={(ceremony) => this.handleCeremonyClick(ceremony)} type="ceremony" />
                    </Col>
                  }
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
  router: PropTypes.object,
  location: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);