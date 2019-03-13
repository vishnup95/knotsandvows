import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';
import { Link } from 'react-router-dom';
import styles from './footer.scss';

class FooterFixedComponent extends Component {
    render() {
        return (
            <Jumbotron style={{ backgroundColor: '#461204' }} className={`${styles.footerContainer} text-white`}>
                <Row>
                    <Col>
                        <div className="text-left">
                            <div className={` ${styles.block}`}>
                                <p>Ahwanam event Planners</p>
                                <p className="mb-0">H.No. 8-2-120/112/B/5&6, 3rd ﬂoor, BBR Forum,</p>
                                <p className="mb-0">Road # 2, Banjara Hills, Hyderabad 500034 </p>
                            </div>
                            <div className={` ${styles.block}`}>
                                <p>Contact Numbers</p>
                                <p className="mb-0">+91 770 205  3510</p>
                            </div>
                            <div className={` ${styles.block}`}>
                                <p className="mb-0">Email us @ <span> &nbsp;&nbsp;info@ahwanam.com</span></p>
                            </div>
                        </div>
                    </Col>

                    <Col className={` ${styles.block}`}>
                        <p>Ahwanam event Planners</p>
                        <ul>
                            <li>
                                <Link to={'/categories'}>Vendors</Link>
                            </li>
                            <li>
                                <Link to={'/packages'}>Packages</Link>
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
                        </ul>
                    </Col>
                    <Col className={` ${styles.block}`}>
                        <p>Plan your events</p>
                        <ul>
                            <li>
                                <Link to={'/ceremonies/ceremony_name'}>Plan your wedding</Link>
                            </li>
                            <li>
                                <Link to={'/ceremonies/ceremony_name'}>
                                    Plan your reception</Link>
                            </li>
                            <li>
                                <Link to={'/ceremonies/ceremony_name'}>
                                    Plan your sangeet</Link>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <div className={`${styles.footerRight}`}>
                            <span className={styles.footerImages}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/ahwanamevents/' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>
                            </span>
                            <p className="">© 2019  All Rights Reserved</p>
                            <p className="">Ahwanam event Planners</p>
                            <p className="">Terms & Conditions   |   Privacy Policy</p>
                        </div>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default FooterFixedComponent;
