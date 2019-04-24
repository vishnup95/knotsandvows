import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styles from './goldPackage.scss';
// import { Link } from 'react-router-dom';
import { imagePath } from '../../../utils/assetUtils';
import * as actions from '../../../components/TalkToWeddingPlanner/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as talkToPlannerActions from '../../components/TalkToWeddingPlanner/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class GoldPackage extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu = () => {
    if (document.getElementById("get-nav").style.display !== "flex") {
      document.getElementById("get-nav").style.display = "flex";
    } else {
      document.getElementById("get-nav").style.display = "none";
    }
  }
  sendDetailsToWeddingPlanner() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let date = document.getElementById('date').value;
    let city = document.getElementById('city').value;
    let comments = document.getElementById('comments').value;

    if (name || email || phone || date || city || comments) {
        const params = {};
        params['origin'] = 'GOLD_PACKAGE';
        params['name'] = name;
        params['email'] = email;
        params['phone'] = phone;
        params['date'] = date;
        params['city'] = city;
        params['comments'] = comments;
        this.props.dispatch(actions.postContactDetails(params));
    }
} 
  render() {
    return (
      <div className="goldPackage">
        <div className="container  entry-content">
          <div className="wp-ahwanam-container">
            <div className="header-nav "><a href="/" >
              <img src={imagePath('logo.svg')} alt="" />
            </a>
              <div className="mobile-nav-btn" onClick={this.toggleMenu} aria-hidden>
                <div className="btn-bar"></div>
                <div className="btn-bar"></div>
                <div className="btn-bar"></div>
              </div>
              <ul id="get-nav">
                <li><a className="page-scroll" href="#about">About Package</a></li>
                <li className="active-item"><a className="page-scroll" href="#about">Offer</a></li>
                <li><a className="page-scroll" href="#gallery">Gallery</a></li>
                <li><a className="page-scroll" href="#contactus">Contact Us</a></li>
              </ul>
            </div>
            <div className="left-cornor"></div>
            <div className="banner-wrap"><img className="top-banner" src={imagePath('banner-sh.jpg')} alt="" />
              <div className="banner-caption">srirastu subhamastu avignamastu
                        <img className="main-caption" src={imagePath('banner-caption-main.png')} alt="" /></div>
              <div className="bottom-corner"></div>
            </div>
            <h1>Your wedding is more than just a day!</h1>
            <p className="description">At Seven Vows we have used our 20 years of wedding planning experience to create a
                carefully hand crafted wedding package to cover all your wedding needs. Our exclusive packages
                    cover ceremonies leading upto the big day to all the ceremonies after your wedding day </p>
            <div className="row column-wrap">
              <div className="col-md-6 column-one">
                <div>
                  <h5 className="first-one">Ceremonies before wedding</h5>
                  <ul>
                    <li>Pre Wedding shoot ( venue and food for couple )</li>
                    <li>Engagement
                                    <ul>
                        <li>
                          Venue for 200 people</li>
                        <li>Catering - Vegetarian Food for 200 People</li>
                        <li>Professional Decoration</li>
                        <li>Professional Photography, videography, Light & sound</li>
                      </ul>
                    </li>

                    <li>Pasupudanchudu ( Haldi)
                                    <ul>
                        <li>Catering - Vegetarian Food for 100 people</li>
                        <li>Professional Decoration</li>
                        <li>Professional Photography and videography</li>
                      </ul>
                    </li>

                    <li>Sangeeth
                                    <ul>
                        <li>Venue 150 people</li>
                        <li>Catering - Vegetarian Food for 150 people</li>
                        <li>Professional Decoration</li>
                        <li>Professional Photography, videography,Light & sound</li>
                      </ul>
                    </li>
                    <li>
                      Pendelekuthuru or Mehendi
                                    <ul>
                        <li>Venue for 150 people</li>
                        <li>Catering - Vegetarian Food for 150 people</li>
                        <li>Professional Decoration</li>
                        <li>Professional Photography, videography,Light & sound</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="image-wrapper">
                  <div className="img-corner-2"></div>
                  <img className="column-image alignnone size-medium wp-image-39" src={imagePath('pre-wedding-sh.jpg')} alt="" />
                </div>



              </div>
              <div className="col-md-6">
                <div className="image-wrapper">
                  <div className="img-corner-1"></div>
                  <img className="column-image alignnone size-medium wp-image-29" src={imagePath('wedding-day-sh.jpg')} alt="" />

                </div>
                <h5 className="third-one">Wedding day</h5>
                <ul>
                  <li>
                    Wedding
                                <ul>
                      <li>Venue for 500 people</li>
                      <li>Catering - Vegetarian Food for 500 People</li>
                      <li>Professional Decoration</li>
                      <li>Professional Photography, videography, Light & sound</li>
                    </ul>
                  </li>
                </ul>
                <div className="image-wrapper">
                  <div className="img-corner-3"></div>
                  <img className="column-image alignnone size-medium wp-image-38" src={imagePath('post-wedding-sh.jpg')} alt="" />

                </div>
                <h5 className="second-one">After wedding ceremonies</h5>
                <ul>
                  <li>
                    Reception
                                <ul>
                      <li>Venue for 200 people</li>
                      <li>Catering - Vegetarian Food for 200 People</li>
                      <li>Professional Decoration</li>
                      <li>Professional Photography, videography,Light & sound</li>
                    </ul>
                  </li>
                  <li>
                    Satyanarayana vratham
                                <ul>
                      <li>Venue for 150 people</li>
                      <li>Catering - Vegetarian Food for 150 people</li>
                      <li>Professional Decoration</li>
                      <li>Professional Photography, videography,Light & sound</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div id="about" className="row package-wrap">
              <div className="col-md-6 package-card"><img className="rotated-image" src={imagePath('group-28.png')} alt="" />
                <div className="package-name">Gold Wedding
                            <b>PACKAGE</b></div>
                <div className="package-logo">
                {/* <img src={imagePath('logo.svg')} alt="" /> */}
                  <div className="package-brand">Seven Vows</div>
                </div>
                <div className="center-content">
                  <div className="original-price">Original Price ₹23.9 Lakhs</div>
                  <div className="offer-price">Offer Price ₹21.5 Lakhs</div>
                </div>
                <div className="package-ring"><img src={imagePath('ring-white.png')} alt="" /></div>
                <div className="package-save">You Save ₹2.4 Lakhs</div>
                <div className="card-shadow"></div>
              </div>
              <div className="col-md-6 package-desc">
                <h4>Seven Vows Gold package includes:</h4>
                <div className="row">
                  <div className="col">
                    <ul>
                      <li>Food and Catering</li>
                      <li>Flower decoration</li>
                      <li>Pasupudanchudu at home</li>
                      <li>Wedding card distribution</li>
                      <li>Sangeeth</li>
                      <li>Venue &amp; Event</li>
                      <li>Pendlekuthuru Event</li>
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      <li>Wedding venue</li>
                      <li>
                        Wedding decoration</li>
                      <li>
                        Satyanarayana vratham at home</li>
                      <li>
                        Reception and Venues with Food</li>
                      <li>
                        Decor, Light, and Sound</li>
                      <li>
                        Photography</li>
                      <li>
                        Sare</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center"><button className="get-package-btn">Get Quote</button></div>
                </div>
              </div>
            </div>
            <div id="gallery" className="container ah-gallery">
              <div className="row ">
                <h4 className="text-center">Seven Vows Gallery </h4>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <img className="img-fluid" src={imagePath('photography-1.jpg')} alt="photography" />
                </div>
                <div className="col-sm-6">
                    <img className="img-fluid" src={imagePath('mehandi-1.jpg')} alt="mehandi" />
                  </div>
                  {/* <div><img src={imagePath('photography-1.jpg')} alt="photography" /></div> */}
                  {/* <div><img src={imagePath('mehandi-1.jpg')} alt="mehandi" /></div> */}
                {/* </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <h4>Here is why people are picking Seven Vows</h4>
              </div>
            </div>
            <div className="row benefit-wrap">
              <div className="ahwanam-benefit-1">VENUE CHOICE
                        <p>
                  We have the highest number of venues on a single platform in Telangana
                        </p>
              </div>
              <div className=" ahwanam-benefit-2">EXPERTISE
                        <p>
                  We have over 15 years of wedding planning experience
                        </p>
              </div>
              <div className=" ahwanam-benefit-3">CUSTOMIZATION
                        <p>
                  We plan your wedding according to your personal taste</p>

              </div>
            </div>
            <div id="contactus" className="row ah-contactus">
              <div className="col-md-6">
                <div className="col-md-12 image-wrapper">
                  <div className="contact-corner"></div>
                  <div className="address-section"><img className="contact-office" src={imagePath('office.png')} alt="" />
                    <div className="office-address">
                      <div className="address-heading">Seven Vows</div>
                      <p>H.No. 8-2-120/112/B/5&amp;6, 3rd floor, BBR Forum, Road # 2, Banjara Hills,
                          Hyderabad
                                        500034</p>

                    </div>
                  </div>
                  <img className="google-map" src={imagePath('map.png')} alt="" />

                </div>
                <div className="row">
                  <div className="col-md-6 contact-details"><img src={imagePath('location.png')} alt="" />
                    <h6>Seven Vows</h6>
                    <p>H.No. 8-2-120/112/B/5&amp;6, 3rd floor, BBR Forum, Road # 2, Banjara Hills,
                        Hyderabad
                                    500034</p>

                  </div>
                  <div className="col-md-6 contact-details"><img src={imagePath('phone.png')} alt="" />
                    <h6>Contact numbers</h6>
                    <p>+91 9987 520 069</p>

                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 contact-details"><img src={imagePath('email.png')} alt="" />
                    <h6>Email us @</h6>
                    <p>sales@Sevenvows.co.in</p>

                  </div>
                  <div className="col-md-6 contact-details"><img src={imagePath('visit-us.png')} alt="" />
                    <h6>Visit us @</h6>
                    www.sevenvows.co.in
                    </div>
                </div>
              </div>
              <div className="col-md-6 contact-wrap">
                <div className="contact-form">
                  <h5>Contact Us</h5>
                  <form action="">
                    <input  maxLength="75" type="text" name="name" id="name" placeholder="Name" />
                    <input  maxLength="75" type="email" name="email" id="email" placeholder="Email" />
                    <input pattern="[0-9]*" required maxLength="10" type="Number" name="phone" id="phone" placeholder="Phone" />
                    <input  type="date" name="date" id="date" placeholder="Eg: 18-12-2018" />
                    <input  maxLength="50" type="text" name="city" id="city" placeholder="City" />
                    <textarea maxLength="200" name="comments" id="comments" rows="5" placeholder="Additional comments about the wedding"></textarea>
                  </form>
                    <input type="submit" value="Get Quote" className="get-package" onClick={() => this.sendDetailsToWeddingPlanner()}/>

                </div>
                <div className="bottom-corner-contact"></div>
              </div>
            </div>
            <div className="row footer-ahwanam">
              <div className="social-icon-wp">
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/AhwanamEvents"><img src={imagePath('fb.png')} alt="facebook-icon" /></a><a
                  target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/ahwanamevents/"><img src={imagePath('instagram.png')}
                    alt="instagram-icon" /></a>
              </div>
              <h5>Thank you</h5>
              <div className="text-center">&copy;2019 Seven Vows
                        <a target="_blank" rel="noopener noreferrer" href="/terms-and-conditions">Terms Of Use</a> | <a target="_blank"
                  rel="noopener noreferrer" href="/privacy-policy">Privacy Policy</a></div>
              <div className="back-to-top"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GoldPackage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapDispatchToProps
)(GoldPackage);