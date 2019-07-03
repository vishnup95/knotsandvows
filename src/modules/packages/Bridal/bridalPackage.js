import React, { Component } from 'react';
import styles from './bridalPackage.scss';
import { Row, Col, Container } from 'reactstrap';
import BridalDetailComponent from './bridalDetailComponent';
import data from './bridalData';
import { imagePath } from '../../../utils/assetUtils';
// import TalkToWeddingPlanner from '../../../components/TalkToWeddingPlanner/talkToWeddingPlanner';
import DatePicker from "react-datepicker";
import * as actions from '../../../components/TalkToWeddingPlanner/actions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


import goldStyles from '../Gold/goldPackage.scss';

let meta = {
  title:"Bridal Wedding Package - Caterers, Decorators, Photopghers",
  description:"All-inclusive, customizable wedding packages for brides at award-winning venues. Revolutionized planning & coordination from ceremony to reception",
  keywords:""
}


const mapStateToProps = state => ({
  user: state.session.user,
  ceremonies: state.home.ceremonies
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});


const minDate = new Date(Date.now());
var date = new Date();
//Max date is set to 4 years from today date.
const maxDate = date.setDate(date.getDate() + 1456);

class BridalPackage extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSectionScroll(id) {
    let yPos = document.getElementById(id).offsetTop;
    window.scrollTo({
      top: yPos - 50,
      left: 0,
      behavior: 'smooth'
    });
  }

  sendDetailsToWeddingPlanner() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    //let date = document.getElementById('date').value;
    let date = this.state.date;
    let city = document.getElementById('city').value;
    let comments = document.getElementById('comments').value;

    if (name || email || phone || date || city || comments) {
      const params = {};
      params['origin'] = 'BRIDAL_PACKAGE';
      params['name'] = name;
      params['email'] = email;
      params['phone'] = phone;
      params['event_date'] = date;
      params['city'] = city;
      params['description'] = comments;
      this.props.dispatch(actions.postContactDetails(params));
    }
  }

  handleDateChange = (dt) => {

    if (dt != null) {
      var calendarDate = new Date(dt.toString().split(' ')[2] + '/' + dt.toString().split(' ')[1] + '/' + dt.toString().split(' ')[3]);
      var todayDate = new Date(minDate.toString().split(' ')[2] + "/" + minDate.toString().split(' ')[1] + "/" + minDate.toString().split(' ')[3]);
      var afterFourYearDate = new Date(maxDate.toString().split(' ')[2] + "/" + maxDate.toString().split(' ')[1] + "/" + maxDate.toString().split(' ')[3]);

      if (calendarDate < todayDate || afterFourYearDate > calendarDate) {
        document.getElementById('date').value = '';
        this.setState({ date: '' });
        return false;
      }
    }

    document.getElementById('date').focus();
    this.setState({
      date: dt
    });
  }



  render() {
    return (
      <div className={styles.servicesContainer}>
        <Helmet>
           <title>{meta.title}</title>
           <meta name="description" content={meta.description} />
        </Helmet>
       <div className={styles.servicesCover}>
          <div className={styles.bridalImg}>
            <div className={styles.coverDetail}>
              {/* <h4>Planning your</h4> */}
              <h1>Because in your dreams,<br />every detail matters</h1>
            </div>
          </div>
        </div>

        <div className={styles.containerClass}>
          <Row className={`${styles.detailBox}`}>
            <Col md="12">
              <h2 className={styles.pink}>Knots&Vows makes sure that your big day gets that perfect touch.</h2>
            </Col>
          </Row>

          {
            data.map((item, index) => {
              return <BridalDetailComponent key={index} data={item} id={`section${index + 1}`} />
            })
          }
        </div>

        <div className={`${goldStyles.mediumPinkBg} container-fluid`}>
          <Container className={`${goldStyles.goldContainer} ${goldStyles.contactWrap}`}>
            <Row>
            <Col md="6" className={`${styles.priceCol} text-right flex`}>
              <div className={styles.priceWrap}>
                <img className={styles.priceBg} src={imagePath('bridal-offer-bg.svg')} alt="price-image" />
                <div className={styles.price}>Price starting</div>
                <div className={styles.priceAt}>at</div>
                <div className={styles.priceValue}>6 Lakhs</div>
              </div>
            </Col>
              <Col md='5' className='contact-form'>
                <h3>Get Your Blush <span className="tab-only"><br /></span> Package Now!</h3>
                <form>
                  <Row>
                    <Col xs='12'>
                      <input maxLength="75" type="text" name="name" id="name" placeholder="Name" />
                    </Col>
                    <Col xs='12'>
                      <input maxLength="75" type="email" name="email" id="email" placeholder="Email" />
                    </Col>
                    <Col xs='12'>
                      <input pattern="[0-9]*" required maxLength="10" type="tel" name="phone" id="phone" placeholder="Phone" />
                    </Col>
                    <Col xs='6'>
                      {/* <input type="date" name="date" id="date" placeholder="Eg: 18-12-2018" /> */}

                      <div>
                        <DatePicker
                          selected={this.state.date}
                          onChange={e => this.handleDateChange(e)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/yyyy"
                          id="date"
                          minDate={minDate}
                          maxDate={maxDate}
                          autoComplete="off"
                        />
                      </div>
                    </Col>
                    <Col xs='6'>
                      <input maxLength="50" type="text" name="city" id="city" placeholder="City" />
                    </Col>
                    <Col xs='12'>
                      <textarea maxLength="200" name="comments" id="comments" rows="3" placeholder="Comments"></textarea>
                    </Col>
                  </Row>
                </form>
                <input type="submit" value="Send Message" className="ml-0 secondary-button home-btn" onClick={() => { this.sendDetailsToWeddingPlanner(); if (window != null) return window.gtag_report_conversion(); }} />
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <Row>
            <Col md="12" className="text-center">
              <img className={styles.vowIconLine} src={imagePath('about-vows.png')} alt="vow icon" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

BridalPackage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BridalPackage);