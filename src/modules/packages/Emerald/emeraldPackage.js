import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styles from './emeraldPackage.scss';
// import { Link } from 'react-router-dom';
import { imagePath } from '../../../utils/assetUtils';
import * as actions from '../../../components/TalkToWeddingPlanner/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as talkToPlannerActions from '../../components/TalkToWeddingPlanner/actions';
import HorizontalSlider from '../../../components/HorizontalSlider/horizontalSlider';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});
const sliderImages = ['Slider 1.jpg', 'Slider 2.jpg', 'Slider 3.jpg', 'Slider 4.jpg', 'Slider 5.jpg', 'Slider 6.jpg', 'Slider 7.jpg', 'Slider 8.jpg', 'Slider 9.jpg', 'Slider 10.jpg',]
class emeraldPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: 1,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.showTabDetail = this.showTabDetail.bind(this);
  }
  toggleMenu = () => {
    if (document.getElementById("get-nav").style.display !== "flex") {
      document.getElementById("get-nav").style.display = "flex";
    } else {
      document.getElementById("get-nav").style.display = "none";
    }
  }
  showTabDetail = (tabvalue) => {
    this.setState({ tabId: tabvalue });
  }
  sendDetailsToWeddingPlanner() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    // let date = document.getElementById('date').value;
    // let city = document.getElementById('city').value;
    // let comments = document.getElementById('comments').value;

    if (name || email || phone ) {
      const params = {};
      params['name'] = name;
      params['email'] = email;
      params['phone'] = phone;
      // params['date'] = date;
      // params['city'] = city;
      // params['comments'] = comments;
      this.props.dispatch(actions.postContactDetails(params));
    }
  }
  render() {

    return (
      <div className="emeraldPackage">
        <div className="wrapper">
          <div className="header">
            <div className="header-top for-desk">
              <a href="/" className="logo"><img src={imagePath('logo.svg')} alt="" /></a>
            </div>
            {/* <div className="header-top for-mob">
                <a href="/" className="logo"><img src={imagePath('logo.svg')} alt="" /></a>
            </div> */}
          </div>
          <div className="main-body">
            <div className="banner">
              <div>
                <img src={imagePath('banner.jpg')} alt="" />
              </div>
            </div>
            <div className="main-top">
              <div className="contain">
                <h2><img src={imagePath('T1.png')} alt="" /></h2>
              </div>

            </div>
            <div className="package-review-tab container flex">
              <ul className="tabs col">
                <li id="tab_1" className={`${this.state.tabId === 1 ? 'active' : ''} title tabclick`} onClick={() => this.showTabDetail(1)} aria-hidden><h4>PACKAGE PREVIEW</h4></li>
                <li id="tab_2" className={`${this.state.tabId === 2 ? 'active' : ''} title tabclick`} onClick={() => this.showTabDetail(2)} aria-hidden><h4>Ceremonies Before Wedding</h4></li>
                <li id="tab_3" className={`${this.state.tabId === 3 ? 'active' : ''} title tabclick`} onClick={() => this.showTabDetail(3)} aria-hidden><h4> Wedding Day </h4></li>
                <li id="tab_4" className={`${this.state.tabId === 4 ? 'active' : ''} title tabclick`} onClick={() => this.showTabDetail(4)} aria-hidden><h4>After Wedding Ceremonies</h4></li>
              </ul>
              <div className="tab_container col">
                {
                  this.state.tabId === 1 &&
                  <div id="tab1" className="tab_content">
                    <div className="em-wed"><img src={imagePath('Emerald logo-01.png')} alt="" /></div>
                  </div>
                }
                {
                  this.state.tabId === 2 &&

                  <div id="tab2" className="tab_content">
                    <ul className="tab-con-iner">
                      <li>

                        <p>
                          Catering for 200 people
                                </p>
                        <p>
                          Professional flower decoration
                                </p>
                        <p>
                          Pasupudanchudu at home
                                </p>
                        <p>
                          Wedding card distribution 200 people
                                </p>
                        <p>
                          Sangeeth Venue 200 people
                                </p>
                        <p>
                          Pendlekuthuru Event 250 people
                                </p>
                        <p>
                          Professional Photography
                                </p>
                      </li>


                    </ul>
                  </div>
                }
                {
                  this.state.tabId === 3 &&
                  <div id="tab3" className="tab_content">
                    <ul className="tab-con-iner">
                      <li>

                        <p>
                          Wedding Catering for 200 people
                                </p>
                        <p>
                          Wedding venue
                                </p>
                        <p>
                          Wedding decoration
                                </p>
                        <p>
                          Satyanarayana vratham at home for 200 people
                                </p>
                        <p>
                          Professional Photography
                                </p>
                        <p>
                          Light and sound
                                </p>
                      </li>

                    </ul>
                  </div>
                }
                {
                  this.state.tabId === 4 &&
                  <div id="tab4" className="tab_content">
                    <ul className="tab-con-iner gom-pro">

                      <li>
                        <p>
                          Professional photography
                                </p>
                        <p>
                          Sare for 200 people
                                </p>
                      </li>

                    </ul>
                  </div>
                }
              </div>
            </div>
            <div className="after-tab-outer container flex">
              <div className="aftr-tab-left col">
                <h3 className="aftr-tab-color3">
                  &#8377; 16 Lakhs Only!</h3>
                <h3 className="aftr-tab-color2">
                  YOU SAVE &#8377; 2.4 LAKHS</h3>
                <p className="orginal-price">ORIGINAL PRICE:&#8377; 18.4 LAKHS</p>
              </div>
              <div className="aftr-tab-right col">
                <h4>BOOK YOUR PACKAGE</h4>
                <p>For Andhra Pradesh and Telangana only.</p>
                <form  action="">
                  <input type="text" name="firstname" id="name" placeholder="Name" />
                  <input type="text" name="Email" id="email" placeholder="Email" />
                  <input type="text" name="Phone" id="phone" placeholder="Phone" maxLength="10" />
                </form>
                  <input type="submit" id="SendQuote" value="Get Quote" onClick={() => this.sendDetailsToWeddingPlanner()}/>
                  <p className="frm-con">Limited Period Offer. Book before 16 January 2019 to avail special price.</p>
                  <p className="frm-con1">Call us for more information: +91 77020 53510</p>
              </div>
            </div>
            <div className="WHY-AHW-outer container">
              <h2><span className="why">WHY</span><span className="ahw">SEVEN VOWS</span></h2>
              <div className="why-awh1">
                <div className="awhh1">
                  <p><img src={imagePath('Venue.png')} alt="" /></p>
                </div>
                <div className="awhh11">
                  <h4>VENUE CHOICE</h4>
                  <p>
                    We have the highest
                    number of venues on
                    a single platform in
                    Telangana
                        </p>
                </div>
              </div>
              <div className="why-awh1 why-awh2">
                <div className="awhh1">
                  <p><img src={imagePath('Expertise.png')} alt="" /></p>
                </div>
                <div className="awhh11">
                  <h4>EXPERTISE</h4>
                  <p>
                    We have over 15
                    years of wedding
                    planning experience
                        </p>
                </div>
              </div>
              <div className="why-awh1 why-awh3">
                <div className="awhh1">
                  <p><img src={imagePath('Customisation.png')} alt="" /></p>
                </div>
                <div className="awhh11">
                  <h4>CUSTOMIZATION</h4>
                  <p>
                    We plan your
                    wedding according
                    to your personal
                    taste
                        </p>
                </div>
              </div>
            </div>
            <div className="shape-up-folw-outer">
              <a href="https://www.facebook.com/AhwanamEvents/" className="floow-link" target="_blank" rel="noopener noreferrer"><p>Follow Seven Vows on</p></a>
            </div>

            <div className="slider-outer">
              <HorizontalSlider data={sliderImages} type="image" />
            </div>
          </div>
          <footer className="footer-container container">
            <div className="footer-sh">
              <p> &#9400;	2017-2018 Seven Vows Party Planners</p>
              <div className="footer-cms">
                <a href="/">Terms Of Use</a>
                <a href="/">Privacy Policy</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

emeraldPackage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapDispatchToProps
)(emeraldPackage);