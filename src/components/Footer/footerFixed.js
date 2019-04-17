import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Jumbotron, Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';
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

    componentWillMount() {
        if (this.props.ceremonies && this.props.ceremonies.length === 0) {
            this.props.dispatch(actions.fetchCeremonies());
        }
    }

    render() {
        return (
            <Jumbotron className={`${styles.footerContainer} text-white`}>
                <Row>
                    <Col className={`${styles.footerContact}`}>
                        <div className={`${styles.footerContactContainer} text-left`}>
                            <div className={` ${styles.block}`}>
                                <p>Seven Vows</p>
                                <p className="mb-0">H.No. 8-2-120/112/B/5&6, 3rd ﬂoor, BBR Forum, Road # 2, Banjara Hills, Hyderabad 500034 </p>
                            </div>
                            <div className={`${styles.footerPhoneEmail}`}>
                                <div className={` ${styles.block}`}>
                                    <p>Contact Numbers</p>
                                    <p className="mb-0">+91 770 205  3510</p>
                                </div>
                                <div className={` ${styles.block}`}>
                                    <p className="mb-0">Email us @ &nbsp; <span>info@sevenvows.co.in</span></p>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col className={` ${styles.block} ${styles.footerNavLinks}`}>
                        <p><Link to={'/'}>Home</Link></p>
                        <ul>
                            <li>
                                <Link to={'/categories'}>Vendors</Link>
                            </li>
                            <li>
                                <Link to={'/#packages'}>Packages</Link>
                            </li>

                            <li>
                                <Link to={'/wishlist'}>Wishlist</Link>
                            </li>

                            <li>
                                <Link to={'/services'}>Services</Link>
                            </li>
                            <li>
                                <Link to={'/about'}>About</Link>
                            </li>
                            <li>
                                <TalkToWeddingPlanner buttonText={'Contact us'} type={'link'} />
                            </li>
                        </ul>
                    </Col>
                    <Col className={` ${styles.block} ${styles.footerEventLinks}`}>
                        <p>Plan your events</p>
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
                        <span className={styles.footerImages}>
                            <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                <img src={imagePath('footer_fb.png')} alt="Facebook" />
                            </a>
                            <a href='https://www.instagram.com/ahwanamevents/' target="_blank" rel="noopener noreferrer" alt="instagram">
                                <img src={imagePath('footer_insta.png')} alt="Instagram" />
                            </a>
                            <a href='https://www.pinterest.com' target="_blank" rel="noopener noreferrer" alt="instagram">
                                <img src={imagePath('pinterest.svg')} alt="Pinterest" />
                            </a>
                        </span>
                    </Col>
                    <Col className={`${styles.footerBottomLinks}`}>
                        <div className={`${styles.footerRight}`}>
                            <span className={styles.footerImages}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/ahwanamevents/' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>
                                <a href='https://www.pinterest.com' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('pinterest.svg')} alt="Pinterest" />
                                </a>
                            </span>
                            <p className="">© 2019  All Rights Reserved&nbsp;</p>
                            <p className="">Seven Vows</p>
                            <p className="w-100">
                                <Link to={'/terms-and-conditions'} target="_blank" >Terms & Conditions</Link>   |  <Link to={'/privacy-policy'} target="_blank">Privacy Policy</Link></p>
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
