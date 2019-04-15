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
import CarouselComponent from './carousel';
// import JumbotronComponent from '../../components/Jumbotron/jumbotron';
// import PackageComponent from './packageComponent';
// import HorizontalMultiCarousel from './multiCarouselHorizontal';
// import VerticalMultiCarousel from './multiCarouselVertical';
// import HorizontalScrollingCarousel from './horizontalScrollingCarousal';
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
    if (this.props.location.hash === '#packages') {
      let yPos = document.getElementById('packages').offsetTop;
      window.scrollTo({
        top: yPos,
        left: 0,
        behavior: 'smooth'
      });
    }
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
      const leftThree = (-151 * section5rate / 100);
      document.getElementById('box-one').style.transform = 'translate3d('+leftOne+'%,' + topOne + 'rem,0px)';
      document.getElementById('box-two').style.transform = 'translate3d('+ leftTwo +'%,' + topTwo + 'rem,0px)';
      document.getElementById('box-three').style.transform = 'translate3d('+ leftThree +'%,' + topThree + 'rem,0px)';
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
      document.getElementById('box-three').style.transform = 'translate3d(-151%,-83rem,0px)';
      this.setState({ showDesc: false });

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
    if (nextProps.location.hash === '#packages') {
      let yPos = document.getElementById('packages').offsetTop;
      window.scrollTo({
        top: yPos,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCeremonyClick = (ceremony) => {
    this.navigateTo(`/ceremonies/${hyphonatedString(ceremony.ceremony_name, ceremony.ceremony_id)}`)
  }

  render() {
    const headerString = ['Secret ', 'to a stress ', 'free wedding...'];
    const headerStringTwo = ['Wedding Planner'];

    return (
      <div>
        {
          styles &&
          <div>
            <div className={`${styles.homeContainer} container`}>
              <Row>
                <Col>
                  <div className={styles.homeContent}>
                    <div className={styles.homeTitle}>

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
                    {/* <h1 className={styles.homeTitle}>Secret<br />to a stress<br />free wedding...<br /><span>Wedding Planner</span></h1> */}
                    <p>Sevenvows can help you with x ooxoox xcvxcv xcvxcvxc xo oxo oxo</p>
                    <div className={styles.contactInput}>
                      <input type="text" placeholder="Email/Phone" />
                      <Button className="primary-button medium-pink">FREE CONSULTATION</Button>

                    </div>
                  </div>
                </Col>
                <Col>
                  <ImageFade />
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Col>
                  <h2>60% of couples think <span>wedding planners</span> <br />are unnecessary, until they panic</h2>
                  <p>Wedding planning takes a lot, but hiring a wedding planner is a surefire<br /> way to lighten your load and focus on enjoying your special day</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarouselComponent isZoom={this.state.zoomCard} />
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-5"  id="numbersection">
                  <Button className="primary-button medium-pink">LET US HELP YOU</Button>
                </Col>
              </Row>

            </div>
            <div className={`${styles.mediumPinkBg} ${styles.bRadius} container-fluid`}>
              <div className={`${styles.homeContainer} container`}>
                <Row className='justify-center'>
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
                  <h2>We make your dreams come true</h2>
                  <p>Whether it is planning your entire wedding or only parts of it, we <br />will fulfill your needs and make your wedding a lot more enjoyable</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('personalised-services.png')} alt="img" />
                      <h3>Personalised Services</h3>
                      <p className={styles.cardDetail}>We believe that individualised, person centred planning is the foundation.</p>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageOne ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('personalised-services-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="personalisedSection"></div>
                  </div>
                  <div className={`${styles.imageCard} ${styles.imageCardReverse} row-reverse`}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('discounted-prices.png')} alt="img" />
                      <h3>Discounted Prices</h3>
                      <p className={styles.cardDetail}>Check out our exclusive wedding deals for your big day at amazing prices!</p>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageTwo ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('discounted-prices-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="discountSection"></div>
                  </div>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('team.png')} alt="img" />
                      <h3>Seven Vows - expert Team</h3>
                      <p className={styles.cardDetail}>Meet our team of crazy talented planners from across the country! </p>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageThree ? styles.cardImageSlide : ''}`}>
                      <img className={styles.cardImage} src={imagePath('team-img.png')} alt="img" />
                    </div>
                    <div className={styles.sectionIdentifier} id="thirdcard"></div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.mediumPinkBg} ${styles.boxSection} container-fluid`} id="packages">
              <Container>
                <Row className={styles.boxMark}>
                  <Col id="boxmark"></Col></Row>
                <Row>
                  <Col>
                    {/* <img src={imagePath('packagesimage.png')} alt="img" /> */}
                  </Col>
                  <Col className={styles.dummyClass}>
                    <h2 className={styles.whiteHeading}>Save <br />money!</h2>
                    <p className={styles.whiteDesc}>These wedding packages are specially created to make every bride and grooms life easy</p>
                    <Button className="primary-button white">LET US HELP YOU</Button>
                  </Col>
                </Row>
                <Row>
                  <Col id="boxend"></Col>
                </Row>
              </Container>
            </div>
            <Container className={styles.homeContainer} style={{ marginTop: '45rem' }}>
              <Row className="mb-5">
                <Col className={styles.packageBox} id="box-one">
                  <img src={imagePath('box-one.png')} alt="img" />
                  <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                    <h3>Gold Package</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <a className="primary-button medium-pink" href='/packages/wedding-gold-package' target="_blank" rel="noopener noreferrer" alt="">LEARN MORE</a>
                    {/* <Button className="primary-button medium-pink">LEARN MORE</Button> */}
                  </div>
                </Col>
                <Col className={styles.packageBox} id="box-two">
                  <img src={imagePath('box-two.png')} alt="img" />
                  <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                    <h3>Emerald Package</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <a className="primary-button medium-pink" href='/packages/wedding-emerald-package' target="_blank" rel="noopener noreferrer" alt="">LEARN MORE</a>

                    {/* <Button className="primary-button medium-pink">LEARN MORE</Button> */}
                  </div>
                </Col>
                <Col className={styles.packageBox} id="box-three">
                  <img src={imagePath('box-three.png')} alt="img" />
                  <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                    <h3>Customize</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <Button className="primary-button medium-pink">WISHLIST</Button>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h2>You may also be interested in...</h2>

                  {this.props.ceremonies &&
                    <Col xs="12" className={`${styles.desktopCarousal} no-padding`}>
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