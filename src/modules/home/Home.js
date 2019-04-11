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
import {  hyphonatedString} from '../../utils/utilities';

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
    console.log('scrolled');
    const section1 = document.getElementById('boxsection');
    const section1Visible = this.checkVisible(section1);
    console.log(section1Visible, 'section1Visible');
    if (section1Visible) {
      const section1Flag = document.getElementById('boxsection').offsetTop - window.scrollY;
      console.log(section1Flag, 'section1Flag');
      console.log(window.innerHeight, 'window.innerHeight');
      if(section1Flag < (window.innerHeight/2)) {
        // document.getElementById('box-one').style.transform = 'translate3d(10px,10px,10px)';
      }
      
      // style.transform = 'rotate' + '(' + section2Flag + 'deg' + ')';
      // const section1Opacity = 1 - (section1Flag / 1000);
      // if (0 <= section1Flag && section1Flag < 100) {
      //   if (section1Opacity <= 1) {
      //     document.getElementById('altimage-1').style.opacity = (section1Opacity - 0.9) * 10;
      //   }
      //   const flag = `${-section1Flag}px`;
      //   document.getElementById('logo-1').style.left = flag;
      //   document.getElementById('logo-1').style.top = flag;
      //   document.getElementById('logo-2').style.right = flag;
      //   document.getElementById('logo-2').style.top = flag;
      //   document.getElementById('logo-3').style.left = flag;
      //   document.getElementById('logo-3').style.bottom = flag;
      //   document.getElementById('logo-4').style.right = flag;
      //   document.getElementById('logo-4').style.bottom = flag;
      // }
      // if (section1Flag > 100) {
      //   document.getElementById('altimage-1').style.opacity = 0;
      // }
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
  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCeremonyClick = (ceremony) => {
    this.navigateTo(`/ceremonies/${hyphonatedString(ceremony.ceremony_name,ceremony.ceremony_id)}`)
  }

  render() {
    console.log(styles, 'styl');
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
                    <div className={styles.contactInput}>
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
                  <h2>60% of couples think <span>wedding planners</span> <br />are unnecessary, until they panic</h2>
                  <p>Wedding planning takes a lot, but hiring a wedding planner is a surefire<br /> way to lighten your load and focus on enjoying your special day</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarouselComponent />
                </Col>
              </Row>
              <Row>
                <Col className="text-center mt-5">
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
                    <div className={styles.cardImageContainer}>
                      <img className={styles.cardImage} src={imagePath('personalised-services-img.png')} alt="img" />
                    </div>
                  </div>
                  <div className={`${styles.imageCard} ${styles.imageCardReverse} row-reverse`}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('discounted-prices.png')} alt="img" />
                      <h3>Discounted Prices</h3>
                      <p className={styles.cardDetail}>Check out our exclusive wedding deals for your big day at amazing prices!</p>
                    </div>
                    <div className={styles.cardImageContainer}>
                      <img className={styles.cardImage} src={imagePath('discounted-prices-img.png')} alt="img" />
                    </div>
                  </div>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      <img className={styles.imageCardIcon} src={imagePath('team.png')} alt="img" />
                      <h3>Seven Vows - expert Team</h3>
                      <p className={styles.cardDetail}>Meet our team of crazy talented planners from across the country! </p>
                    </div>
                    <div className={styles.cardImageContainer}>
                      <img className={styles.cardImage} src={imagePath('team-img.png')} alt="img" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.mediumPinkBg} ${styles.boxSection} container-fluid`} id="boxsection">
              <Container>
                <Row>
                    <Col>
                      {/* <img src={imagePath('team.png')} alt="img" /> */}
                    </Col>
                    <Col>
                      <h2 className={styles.whiteHeading}>Save money!</h2>
                      <p className={styles.whiteDesc}>These wedding packages are specially created to make every bride and grooms life easy</p>
                      <Button className="primary-button white">LET US HELP YOU</Button>
                    </Col>
                </Row>
              </Container>
            </div>
            <Container className={styles.homeContainer}>
              <Row className="mb-5">
                <Col className={styles.packageBox} id="box-one">
                  <img src={imagePath('box-one.png')} alt="img" />
                  <div className={styles.packageDetail}>
                    <h3>Gold Package</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <Button className="primary-button medium-pink">LEARN MORE</Button>
                  </div>
                </Col>
                <Col className={styles.packageBox}>
                  <img src={imagePath('box-two.png')} alt="img" />
                  <div  className={styles.packageDetail}>
                    <h3>Emerald Package</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <Button className="primary-button medium-pink">LEARN MORE</Button>
                  </div>
                </Col>
                <Col className={styles.packageBox}>
                  <img src={imagePath('box-three.png')} alt="img" />
                  <div  className={styles.packageDetail}>
                    <h3>Customize</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet.</p>
                    <Button className="primary-button medium-pink">WISHLIST</Button>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                <h2>You may also be interested in...</h2>

                { this.props.ceremonies &&
                  <Col xs="12" className={`${styles.desktopCarousal} no-padding`}>
                        <HorizontalSlider data={this.props.ceremonies} onSelect={(ceremony) => this.handleCeremonyClick(ceremony)} type="ceremony"/>
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
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);