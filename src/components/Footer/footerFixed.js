import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Jumbotron, Row, Col, Collapse } from 'reactstrap';
import { imagePath, detectMobile } from '../../utils/assetUtils';
import { Link } from 'react-router-dom';
import styles from './footer.scss';
import * as actions from '../../modules/home/actions';
import TalkToWeddingPlanner from '../TalkToWeddingPlanner/talkToWeddingPlanner';
import { hyphonatedString } from '../../utils/utilities';

const mapStateToProps = state => ({
    ceremonies: state.home.ceremonies
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class FooterFixedComponent extends Component {

    state = { collapse: [true, true, true, true] };

    componentWillMount() {
        if (this.props.ceremonies && this.props.ceremonies.length === 0) {
            this.props.dispatch(actions.fetchCeremonies());
        }
    }

    componentDidMount() {
        if (detectMobile()) {
            this.setState({collapse: [false, true, false, false]})
        }
    }

    toggleCollapse(toggleIndex) {
        this.setState({
            collapse: this.state.collapse.map( (item, index) => index === toggleIndex ? !item : false)
        });
    }

    render() {
        return (
            <Jumbotron className={`${styles.footerContainer} text-white`}>
                <Row>
                    <Col xs="12" md="3" className={`${styles.footerContact}`}>
                        <p onClick={() => this.toggleCollapse(0)} aria-hidden className={styles.collapseControl}>
                            Contact
                        </p>
                        <Collapse isOpen={this.state.collapse[0]}>
                            <div className={`${styles.footerContactContainer} text-left`}>
                                <div className={` ${styles.block}`}>
                                    <p>SevenVows</p>
                                    <p className="mb-0">H.No. 8-2-120/112/B/5&6, 3rd ﬂoor, BBR Forum, Road # 2, Banjara Hills, Hyderabad 500034 </p>
                                </div>
                                <div className={`${styles.footerPhoneEmail}`}>
                                    <div className={` ${styles.block}`}>
                                        <p>Contact Numbers</p>
                                        <p className="mb-0 d-none d-sm-block">+91 770 205  3510</p>
                                        <p className="d-block d-sm-none">
                                            <a href="tel: +91 7702053510">+91 770 205  3510</a>
                                        </p>
                                    </div>
                                    <div className={` ${styles.block}`}>
                                        <p className="mb-0">Email us @ &nbsp; <span>info@sevenvows.co.in</span></p>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </Col>

                    <Col xs="12" md="3" className={` ${styles.block} ${styles.footerNavLinks}`}>
                        <p onClick={() => this.toggleCollapse(1)} aria-hidden className={styles.collapseControl}>
                            SevenVows
                        </p>
                        <Collapse isOpen={this.state.collapse[1]}>
                            <p><Link to={'/'}>Home</Link></p>
                            <ul>
                                <li>
                                    <Link to={'/categories'}>VowVendors</Link>
                                </li>
                                <li>
                                    <Link to={'/#packages'}>Packages</Link>
                                </li>
                                <li>
                                    <Link to={'/#ceremonies'}>Ceremonies</Link>
                                </li>
                                <li>
                                    <Link to={'/wishlist'}>Wishlist</Link>
                                </li>

                                <li>
                                    <Link to={'/who-we-are'}>Who We Are</Link>
                                </li>
                                <li>
                                    <TalkToWeddingPlanner buttonText={'Contact us'} type={'link'} origin={'footer'}/>
                                </li>
                            </ul>
                        </Collapse>
                        
                    </Col>

                    <Col xs="12" md="3" className={` ${styles.block} ${styles.footerEventLinks}`}>
                        <p onClick={() => this.toggleCollapse(2)} aria-hidden className={styles.collapseControl}>
                            Ceremonies
                        </p>
                        <p className="d-none d-sm-block">Ceremonies</p>
                        <Collapse isOpen={this.state.collapse[2]}>
                            {this.props.ceremonies &&
                                <ul>
                                    {
                                        this.props.ceremonies.map((ceremony, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={`/ceremonies/${hyphonatedString(ceremony.ceremony_name,ceremony.ceremony_id) }`}>{ceremony.ceremony_name}</Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            }
                        </Collapse>
                    </Col>

                    <Col xs="12" md="3" className={`${styles.footerBottomLinks}`}>
                        <div className={`${styles.footerRight}`}>
                            <span className={`${styles.footerImages} d-none d-sm-block`}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/sevenvowsindia' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>
                            </span>
                            <p onClick={() => this.toggleCollapse(3)} aria-hidden className={styles.collapseControl}>
                                Legal
                            </p>
                            <Collapse isOpen={this.state.collapse[3]}>
                                <p className="">© 2019  All Rights Reserved&nbsp;</p>
                                <p className="">SevenVows</p>
                                <p className="w-100">
                                    <Link to={'/terms-and-conditions'} target="_blank" >Terms & Conditions</Link>   |  <Link to={'/privacy-policy'} target="_blank">Privacy Policy</Link>
                                </p>
                            </Collapse>
                            <span className={`${styles.footerImages} d-block d-sm-none`}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/sevenvowsindia' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>                                
                                <p className="text-center">© 2019  All Rights Reserved&nbsp;</p>
                            </span>
                        </div>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

FooterFixedComponent.propTypes = {
    ceremonies: PropTypes.array,
    dispatch: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterFixedComponent);
