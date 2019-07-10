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
} from 'reactstrap';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import * as actions from './actions';
import * as talktoAhwanamActions from '../../components/TalkToWeddingPlanner/actions';
import CarouselComponent from './carousel';
import { imagePath, detectMobile } from '../../utils/assetUtils';
import { hyphonatedString } from '../../utils/utilities';
import ImageFade from '../../components/ImageFade/imageFade';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';
import Helmet from 'react-helmet';

let meta = {
  title:"Knots&Vows - Your Trusted Wedding Services and Planning Partner.",
  description:'We are a team of passionate professionals with over 15 years of experience in wedding planning. We provide personalised and customised wedding packages with added discounts to make it even more magical.',
  keywords:"",
  shortTitle: "Trusted Wedding Planners"
}

const mapStateToProps = state => ({
  user: state.session.user,
  ceremonies: state.home.ceremonies
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});


const headerString = ['As your happiness partners', 'we help you celebrate'];
const headerStringTwo = ['Your Day...Your Way!'];

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
    errorMessage: '',
    loadImages: false,
    imagesData: ['bannert1.jpg', 'bannert2.jpg', 'bannert3.jpg' , 'bannert4.jpg' ]

  }
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):

    let promises = [];
    // promises.push(store.dispatch(actions.fetchExclusives()));
    promises.push(store.dispatch(actions.fetchCeremonies()));
    return Promise.all(promises);
  }

  componentDidMount() {
    if (this.props.location.pathname === '/contact-us') {
      this.props.dispatch(talktoAhwanamActions.showPlanner());
    }

    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
    this.handleSectionScroll(this.props);
  }

  componentWillMount() {
    this.props.dispatch(talktoAhwanamActions.clearTalkToErrors());

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

    const cityCount = document.getElementById('city-count');
    const cityCountVisible = this.checkVisible(cityCount);
    if (cityCountVisible || (document.getElementById('city-count').getBoundingClientRect().top <= 0)) {
      this.setState({
        loadImages: true,
      });
    }
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
        const topOne = (-80.5 * section5rate / 100);
        const leftOne = (56 * section5rate / 100);
        const topTwo = (-88 * section5rate / 100);
        const leftTwo = (-77 * section5rate / 100);
        const topThree = (-90.3 * section5rate / 100);
        const leftThree = (-124 * section5rate / 100);
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
        document.getElementById('box-one').style.transform = 'translate3d(56%,-80.5rem,0px)';
        document.getElementById('box-two').style.transform = 'translate3d(-77%,-88rem,0px)';
        document.getElementById('box-three').style.transform = 'translate3d(-124%,-90.3rem,0px)';
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
      let yPos = 0;
      if (detectMobile()) {
        yPos = document.getElementById('packagesMobile').offsetTop;
      } else {
        yPos = document.getElementById('packages').offsetTop;
      }
      window.scrollTo({
        top: yPos,
        left: 0,
        behavior: 'smooth'
      });
    } else if (props.location.hash === '#ceremonies') {
      let yPos = document.getElementById('ceremonies').offsetTop;
      window.scrollTo({
        top: yPos,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
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

  handleCeremonyClick = (ceremony, event) => {

    this.navigateTo(`/ceremonies/${hyphonatedString(ceremony.ceremony_name, ceremony.ceremony_id)}`);
    if (window != null)
      return window.gtag_report_conversion(`/ceremonies/${hyphonatedString(ceremony.ceremony_name, ceremony.ceremony_id)}`);
    event.preventDefault();
  }

  validateInput() {
    let inputValue = document.getElementById('freeConsult').value;
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/.test(inputValue)) {
      const params = {
        origin: "HOME",
        email: inputValue
      }
      this.props.dispatch(talktoAhwanamActions.postContactDetails(params));
    } else if (/^\d{10}$/.test(inputValue)) {
      const params = {
        origin: "HOME",
        phoneno: inputValue
      }
      this.props.dispatch(talktoAhwanamActions.postContactDetails(params));
    } else {
      this.setState({ errorMessage: 'Please enter a valid email or phone number' });
    }
  }

  render() {
    return (
      <div className={styles.homeOuter}>
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.shortTitle} />
          <meta property="og:url" content="https://www.knotsandvows.co.in" />
          <meta property="og:description" content="Trusted wedding planners" />
          <meta property="og:image" content="https://d2ac09n5vmchb0.cloudfront.net/react-app/images/knots.png" />
        </Helmet>
        {
          styles &&
          <div>
            <div className={`${styles.homeTopContainer} container-fluid`}>
              <Row>
                <Col xs='12' className="p-relative no-padding">
                  <div className={styles.homeContent}>
                    {/* <p className="tab-only">You can’t plan love. <br />But you can plan<br />how to celebrate it.</p> */}

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
                    <h1 className={`${styles.homeTitle} mobile-only`}>As your happiness partners we help you celebrate<br /> <span>Your Day...Your Way!</span></h1>
                    {/* this section is temporarily removed
                    <div className={styles.contactInput}>
                      <input type="text" placeholder="Email/Phone" id="freeConsult" onFocus={() => this.setState({ errorMessage: '' })} />
                      <Button className="primary-button medium-pink" onClick={() => this.validateInput()}>Free consultation</Button>
                    </div> */}
                    <p className={styles.error}>{this.state.errorMessage}</p>
                  </div>
                  <ImageFade data={this.state.imagesData} />
                </Col>
              </Row>
            </div>
            <div className={`${styles.homeContainer} container`}>

              {/* <hr className="tab-only"></hr> */}
              <Row>
                <Col>
                  <h2>70% of couples wish they had hired <span className="tab-only"><br /></span><span>wedding planners</span></h2>
                  <p>It doesn’t take much time for your blissful day to turn stressful. With our array of<span className="tab-only"><br /></span> services, Knots&Vows can help you plan the biggest day of your life in the best possible way.</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CarouselComponent isZoom={this.state.zoomCard} />
                </Col>
              </Row>
              <Row>
                <Col className="text-center flex justify-center mt-5" id="numbersection">
                  <TalkToWeddingPlanner buttonText={'Let Us Help You'} />
                </Col>
              </Row>

            </div>
            <div className={`${styles.mediumPinkBg} ${styles.bRadius} ${styles.venueCount} container-fluid`}>
              <div className={`${styles.homeContainer} container`}>
                <Row className='justify-center mobile-column' id="city-count">
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We know</div> */}
                    <div className={styles.detailCount}>
                      <span>200 +</span>
                      <div>vendors</div>
                    </div>
                  </Col>
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We have</div> */}
                    <div className={styles.detailCount}>
                      <span>15 +</span>
                      <div>years of experience</div>
                    </div>
                  </Col>
                  <Col className={styles.row}>
                    {/* <div className={styles.detailDesc}>We are in</div> */}
                    <div className={styles.detailCount}>
                      <span>3</span>
                      <div>cities & counting</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={`${styles.homeContainer} ${styles.imageCardWrap} container`}>
              <Row>
                <Col className="text-center">
                  <h2>Get hitched. Without a hitch.</h2>
                  {/* <p>Whether it is planning your entire wedding or only parts of it, we <br />will fulfill your needs and make your wedding a lot more enjoyable</p> */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      {this.state.loadImages && <img className={styles.imageCardIcon} src={imagePath('personalised-services.png')} alt="img" />}
                      <div className={styles.cardDetail}>
                        <h3>Personalized services</h3>
                        <p>It’s you who decides. Choose from a wide range of wedding services or select a personalized package to organize a stress-free dream wedding.</p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageOne ? styles.cardImageSlide : ''}`}>
                      {this.state.loadImages && <img className={styles.cardImage} src={imagePath('personalized-services.jpg')} alt="img" />}
                    </div>
                    <div className={styles.sectionIdentifier} id="personalisedSection"></div>
                  </div>
                  <div className={`${styles.imageCard} ${styles.imageCardReverse}`}>
                    <div className={styles.imageCardText}>
                      {this.state.loadImages && <img className={styles.imageCardIcon} src={imagePath('discounted-prices.png')} alt="img" />}
                      <div className={styles.cardDetail}>
                        <h3>No pocket pinch</h3>
                        <p>It feels nice to spend the world on your wedding. However, savings can go a long way. Our value-for-money services come with added discounts to make you happy and your pocket happier.</p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageTwo ? styles.cardImageSlide : ''}`}>
                      {this.state.loadImages && <img className={styles.cardImage} src={imagePath('no-pocket-pinch.jpg')} alt="img" />}
                    </div>
                    <div className={styles.sectionIdentifier} id="discountSection"></div>
                  </div>
                  <div className={styles.imageCard}>
                    <div className={styles.imageCardText}>
                      {this.state.loadImages && <img className={styles.imageCardIcon} src={imagePath('team.png')} alt="img" />}
                      <div className={styles.cardDetail}>
                        <h3>Expert team</h3>
                        <p>We are a team of passionate professionals with over 15 years of experience, striving to make the world a happier place, one wedding at a time.</p>
                      </div>
                    </div>
                    <div className={`${styles.cardImageContainer} ${this.state.animateImageThree ? styles.cardImageSlide : ''}`}>
                      {this.state.loadImages && <img className={styles.cardImage} src={imagePath('team-img.png')} alt="img" />}
                    </div>
                    <div className={styles.sectionIdentifier} id="thirdcard"></div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={`${styles.mediumPinkBg}  container-fluid`} id="packagesMobile">
              <Container className={styles.boxSection}>
                <Row className={styles.boxMark}>
                  <Col id="boxmark"></Col></Row>
                <Row className="mobile-col-reverse">
                  <div className="col justify-center align-flex-top mobile-column">
                    <img className={styles.packageStatic} src={imagePath('package-all.png')} alt="img" />
                    <div className="mobile-only">
                      <TalkToWeddingPlanner buttonText={'Let’s do it'} buttonColor={'white'} />
                    </div>
                  </div>
                  <div className={styles.dummyClass}>
                    <h2 className={styles.whiteHeading}>Less <span className="tab-only"><br /></span>worries.<br />More <span className="tab-only"><br /></span>savings.</h2>
                    <p className={styles.whiteDesc}>Choose from one of our customised packages to steer clear of stress and get attractive discounts.</p>
                    <div className="tab-only">
                      <TalkToWeddingPlanner buttonText={'Let’s do it'} buttonColor={'white'} />
                    </div>

                  </div>
                </Row>
                <Row>
                  <Col id="boxend"></Col>
                </Row>
              </Container>
            </div>
            <div className={styles.packageWrap}>
              <Container className={`${styles.homeContainer}`}>
                <Row id="packages">
                  <Col className={styles.packageBox} id="box-one">
                    {/* <img src={imagePath('contact-box.png')} alt="Gold" /> */}
                    {this.state.loadImages &&
                      <picture>
                        <source media="(min-width: 1850px)" srcSet={imagePath('box-23.png')} />
                        <source media="(min-width: 1024px)" srcSet={imagePath('box-22.png')} />
                        <source media="(min-width: 768px)" srcSet={imagePath('box-21.png')} />
                        <img src={imagePath('box-21.png')} alt="gold package" />
                      </picture>
                    }
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Gold</h3>
                      <p>Give your dream wedding a golden touch. <span className="tab-only"><br /></span>Here’s a complete wedding solution crafted just for you.</p>
                      <a className="primary-button home-btn white" onClick={() => { if (window != null) window.gtag_report_conversion('/packages/wedding-gold-package'); }} href='/packages/wedding-gold-package' rel="noopener noreferrer" alt="">Go for Gold</a>
                      {/* <Button className="primary-button home-btn medium-pink">LEARN MORE</Button> */}
                    </div>
                  </Col>
                  <Col className={styles.packageBox} id="box-two">
                    {this.state.loadImages &&
                      <img src={imagePath('box-03.png')} alt="Ruby" />}
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Royal Ruby</h3>
                      <p>Add shine to your wedding celebration. <span className="tab-only"><br /></span>Here’s a package that’s packed with wedding goodness.</p>
                      <a className="primary-button home-btn white" onClick={() => { if (window != null) return window.gtag_report_conversion('/packages/wedding-ruby-package'); }} href='/packages/wedding-ruby-package' rel="noopener noreferrer" alt="">Royal Ruby</a>

                      {/* <Button className="primary-button home-btn medium-pink">LEARN MORE</Button> */}
                    </div>
                  </Col>
                  <Col className={styles.packageBox} id="box-three">
                    {this.state.loadImages &&
                      <img src={imagePath('box-01.png')} alt="Genie" />}
                    <div className={`${styles.packageDetail} ${this.state.showDesc ? styles.showDetail : ''}`}>
                      <h3>Genie</h3>
                      <p>Your wish is our command. <span className="tab-only"><br /></span>Choose what you need and make your dream team of wedding vendors.</p>
                      {/* <Button className="primary-button home-btn medium-pink">WISHLIST</Button> */}
                      <a className="primary-button home-btn white" href='/wishlist' rel="noopener noreferrer" alt="">Your Wish</a>

                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className={`${styles.brideBanner} container-fluid`}>
              <div className={`${styles.brideBannerContent} tab-only`}>
                {/* <div className={styles.reactangleOne}></div> */}
                <div className={styles.brideBannerHeading}>
                  Because in your dreams,<br />every detail matters
                </div>
                <div className={styles.brideBannerCopy}>
                  {/* Our bride package covers all the essentials and <span className="tab-only"><br /></span>helps you enhance your day, your way. */}
                  Knots&Vows makes sure that your big day gets that perfect touch.
                </div>
                <a className="primary-button home-btn white" href='/packages/bride-package' rel="noopener noreferrer" alt="">Click to blush</a>
              </div>
            </div>
            <div className={`${styles.brideBannerContent} mobile-only`}>
              {/* <div className={styles.reactangleOne}></div> */}
              <div className={styles.brideBannerHeading}>
                Because in your dreams,<br />every detail matters
                </div>
              <div className={styles.brideBannerCopy}>
                {/* Our bride package covers all the essentials and <span className="tab-only"><br /></span>helps you enhance your day, your way. */}
                Knots&Vows makes sure that your big day gets that perfect touch.
                </div>
              <a className="primary-button home-btn white" href='/packages/bride-package' rel="noopener noreferrer" alt="">Click to blush</a>
            </div>
            <Container className={styles.homeContainer}>
              <Row className="mt-5" id="ceremonies">
                <Col className={`${styles.ceremony} text-center`}>
                  <h2>Pick a Ceremony...</h2>
                  {this.props.ceremonies && this.state.loadImages &&
                    <Col xs="12" className={` no-padding mb-5`}>
                      <HorizontalSlider data={this.props.ceremonies} type="ceremony" onSelect={(ceremony, event) => this.handleCeremonyClick(ceremony, event)} />
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