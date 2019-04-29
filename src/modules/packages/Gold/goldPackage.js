import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './goldPackage.scss';
// import { Link } from 'react-router-dom';
import { imagePath } from '../../../utils/assetUtils';
import * as actions from '../../../components/TalkToWeddingPlanner/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as talkToPlannerActions from '../../components/TalkToWeddingPlanner/actions';
import { Container, Row, Col } from 'reactstrap';
import HorizontalSlider from '../../../components/HorizontalSlider/horizontalSlider';


const mapStateToProps = state => ({
  user: state.session.user,
  // categories: state.home.categories,
  // exclusives: state.home.exclusives,
  ceremonies: state.home.ceremonies
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const packageItems = [
  {
    imgSrc: 'engagement.jpg',
    itemName: 'Engagement',
    itemList: ['Venue (200 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography, videography, Light & sound']
  },
  {
    imgSrc: 'pasupudanchudu.jpg',
    itemName: 'pasupudanchudu',
    itemList: ['Catering — Vegetarian (100 people)', 'Venue Decor', 'Photography, videography, Light & sound']

  },
  {
    imgSrc: 'sangeeth.jpg',
    itemName: 'sangeeth',
    itemList: ['Venue (150 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography, videography, Light & sound']

  },
  {
    imgSrc: 'pellikuturu.jpg',
    itemName: 'pellikuturu',
    itemList: ['Venue (150 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography, videography, Light & sound']

  },
  {
    imgSrc: 'wedding.png',
    itemName: 'wedding',
    itemList: ['Venue (500 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography', 'videography', 'Light & sound']

  },
  {
    imgSrc: 'reception.png',
    itemName: 'reception',
    itemList: ['Venue (200 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography, videography, Light & sound']

  },
  {
    imgSrc: 'photoshoot.jpg',
    itemName: 'photoshoot',
    itemList: ['Photography, videography, Light & sound', 'Venue for couple', 'Food for Couple']

  },
  {
    imgSrc: 'vratam.jpg',
    itemName: 'vratam',
    itemList: ['Venue (150 people)', 'Catering — Vegetarian', 'Venue Decor', 'Photography, videography, Light & sound']

  },
]
// const packageItemsFirst = packageItems.slice(0, 4);
// const packageItemsSecond = packageItems.slice(4, 6);

class GoldPackage extends Component {
  constructor(props) {
    super(props);
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
      params['event_date'] = date;
      params['city'] = city;
      params['description'] = comments;
      this.props.dispatch(actions.postContactDetails(params));
    }
  }
  render() {
    return (
      <div className={styles.goldPackage}>
        <div className={styles.goldCover}>
          <h1>Wedding is so much more than just one day!</h1>
        </div>
        <div className={styles.bannerTwo}>
          <h2>SevenVows Gold package includes</h2>
        </div>
        <div className={`${styles.goldContainer} container`}>
          <Row>
            {
              packageItems.slice(0, 4).map((item, index) => {
                return (
                  <Col xs='6' sm='6' md='3' key={index}>
                    <div className={styles.packageItem}>
                      <div className={styles.packageItemImgBg}>
                        <img className={styles.packageItemImg} src={imagePath(item.imgSrc)} alt={item.itemName} />
                      </div>
                      <div className={styles.packageItemContent}>

                        <div className={styles.packageItemName}>
                          {item.itemName}
                        </div>
                        <ul>
                          {
                            item.itemList.length > 0 &&
                            item.itemList.map((listItem, index) => {
                              return (
                                <li key={index}>
                                  {listItem}
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
          <Row>
            {
              packageItems.slice(4, 6).map((item, index) => {
                return (
                  <Col xs='12' sm='6' key={index} >
                    <div className={`${styles.packageItem} ${styles.large} ${index === 0 ? ' row-reverse-tab': ''}`}>
                      <div className={`${styles.packageItemImgBg} ${styles.large}`}>
                        <img className={styles.packageItemImg} src={imagePath(item.imgSrc)} alt={item.itemName} />
                      </div>
                      <div className={styles.packageItemContent}>
                        <div className={styles.packageItemName}>
                          {item.itemName}
                        </div>
                        <ul>
                          {
                            item.itemList.length > 0 &&
                            item.itemList.map((listItem, index) => {
                              return (
                                <li key={index}>
                                  {listItem}
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
          <Row>
            {
              packageItems.slice(6, 7).map((item, index) => {
                return (
                  <Col xs='6' sm='6' md='3' key={index} >
                    <div className={`${styles.packageItem} ${styles.lastPack}`}>
                      <div className={styles.packageItemImgBg}>
                        <img className={styles.packageItemImg} src={imagePath(item.imgSrc)} alt={item.itemName} />
                      </div>
                      <div className={styles.packageItemContent}>
                        <div className={styles.packageItemName}>
                          {item.itemName}
                        </div>
                        <ul>
                          {
                            item.itemList.length > 0 &&
                            item.itemList.map((listItem, index) => {
                              return (
                                <li key={index}>
                                  {listItem}
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </Col>
                );
              })
            }
            <Col className={`${styles.offerWrap} flex justify-center tab-only`}>
              <div className={`${styles.offerPrice} `}>
                <img className={styles.offerPriceImg} src={imagePath('offer-bg.jpg')} alt="offer" />
                <div className={styles.offer}>Offer Price</div>
                <div className={styles.originalStrike}>Original Price  ₹2,390,000</div>
                <div className={styles.original}>₹2,150,000</div>
                <div className={styles.save}>You Save<br />₹2.5 Lakhs</div>
              </div>
            </Col>
            {
              packageItems.slice(7, 8).map((item, index) => {
                return (
                  <Col xs='6' sm='6' md='3' key={index} >
                    <div className={`${styles.packageItem}`}>
                      <div className={styles.packageItemImgBg}>
                        <img className={styles.packageItemImg} src={imagePath(item.imgSrc)} alt={item.itemName} />
                      </div>
                      <div className={styles.packageItemContent}>
                        <div className={styles.packageItemName}>
                          {item.itemName}
                        </div>
                        <ul>
                          {
                            item.itemList.length > 0 &&
                            item.itemList.map((listItem, index) => {
                              return (
                                <li key={index}>
                                  {listItem}
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </Col>
                );
              })
            }
          </Row>
          <Row className="mobile-only">
            <Col className={`${styles.offerWrap} flex justify-center`}>
              <div className={`${styles.offerPrice} `}>
                <img className={styles.offerPriceImg} src={imagePath('offer-bg.jpg')} alt="offer" />
                <div className={styles.offer}>Offer Price</div>
                <div className={styles.originalStrike}>Original Price  ₹2,390,000</div>
                <div className={styles.original}>₹2,150,000</div>
                <div className={styles.save}>You Save<br />₹2.5 Lakhs</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3><span className={styles.headerWithIcon}>To customise SevenVows Gold package talk to our event planner</span></h3>
              <div className={styles.hrLine}></div>
            </Col>
          </Row>
        </div>
        <div className={`${styles.mediumPinkBg} container-fluid`}>
          <Container className={`${styles.goldContainer} ${styles.contactWrap}`}>
            <Row>
              <Col md='1'></Col>
              <Col md='5'>
                <img className={styles.contactImg} src={imagePath('contact-box.png')} alt="contact" />
              </Col>
              <Col md='5' className='contact-form'>
                  <h3>Get Your Gold <span className="tab-only"><br /></span> Wedding Package Now!</h3>
                  <form>
                    <Row>
                      <Col xs='12'>
                        <input maxLength="75" type="text" name="name" id="name" placeholder="Name" />
                      </Col>
                      <Col xs='12'>
                        <input maxLength="75" type="email" name="email" id="email" placeholder="Email" />
                      </Col>
                      <Col xs='12'>
                        <input pattern="[0-9]*" required maxLength="10" type="Number" name="phone" id="phone" placeholder="Phone" />
                      </Col>
                      <Col xs='6'>
                        <input type="date" name="date" id="date" placeholder="Eg: 18-12-2018" />
                      </Col>
                      <Col xs='6'>
                        <input maxLength="50" type="text" name="city" id="city" placeholder="City" />
                      </Col>
                      <Col xs='12'>
                        <textarea maxLength="200" name="comments" id="comments" rows="3" placeholder="Comments"></textarea>
                      </Col>
                    </Row>
                  </form>
                  <input type="submit" value="Send message" className="ml-0 secondary-button home-btn" onClick={() => this.sendDetailsToWeddingPlanner()} />
              </Col>
            </Row>
          </Container>
        </div>
        <div className={`${styles.goldContainer} container`}>
          <h2>Check out our other packages</h2>
          <Row>
            <Col>
              <div className={styles.packageBox}>
                <img src={imagePath('ruby-box.png')} alt="img" />
                <div className={`${styles.packageDetail} `}>
                  <h3>Royal Ruby</h3>
                  <p>Add shine to your wedding celebration. Here’s a package that’s packed with wedding goodness.</p>
                  <a className="primary-button home-btn" href='/packages/wedding-ruby-package' rel="noopener noreferrer" alt="">Royal Ruby</a>
                </div>

              </div>
            </Col>
            <Col>
              <div className={styles.packageBox}>
                <img src={imagePath('box-three.png')} alt="img" />
                <div className={`${styles.packageDetail} `}>
                  <h3>Genie</h3>
                  <p>Your wish is our command. Choose what you need and make your dream team of wedding vendors.</p>
                  <a className="primary-button home-btn" href='/wishlist' rel="noopener noreferrer" alt="">Your wish</a>
                </div>
              </div>
            </Col>
          </Row>

        </div>

        <Container className={styles.ceremonyContainer}>
          <Row className="mt-5" id="ceremonies">
            <Col className={`${styles.ceremony} text-center`}>
              <h2>Pick a Ceremony...</h2>
              {this.props.ceremonies &&
                <Col xs="12" className={` no-padding mb-5`}>
                  <HorizontalSlider data={this.props.ceremonies} onSelect={(ceremony) => this.handleCeremonyClick(ceremony)} type="ceremony" />
                </Col>
              }
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

GoldPackage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  ceremonies: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoldPackage);