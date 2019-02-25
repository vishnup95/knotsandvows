import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';
import styles from './footer.scss';

class FooterFixedComponent extends Component {
    render() {
        return (
            <Jumbotron style={{ backgroundColor: '#461204' }} className={`${styles.footerContainer} text-white`}>
                <Row>
                    <Col>
                        <div className="text-left">
                            <div className={` ${styles.block}`}>
                                <p className="mb-0">Ahwanam Party Planners</p>
                                <p className="mb-0">H.No. 8-2-120/112/B/5&6, 3rd ﬂoor, BBR Forum,</p>
                                <p className="mb-0">Road # 2, Banjara Hills, Hyderabad 500034 </p>
                            </div>
                            <div className={` ${styles.block} mt-3`}>
                                <p className="mb-0">Contact Numbers</p>
                                <p className="mb-0">+91 770 205  3510</p>
                            </div>
                            <div className={` ${styles.block} mt-3`}>
                                <p className="mb-0">Email us @</p>
                                <p className="mb-0">sales@ahwanam.com</p>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className={`${styles.footerRight} text-right`}>
                            <span className={styles.footerImages}>
                                <a href='https://www.facebook.com/AhwanamEvents' target="_blank" rel="noopener noreferrer" alt="facebook">
                                    <img src={imagePath('footer_fb.png')} alt="Facebook" />
                                </a>
                                <a href='https://www.instagram.com/ahwanamevents/' target="_blank" rel="noopener noreferrer" alt="instagram">
                                    <img src={imagePath('footer_insta.png')} alt="Instagram" />
                                </a>
                            </span>
                            <p className="mb-0 mt-4">Ahwanam Party Planners © 2019  All Rights Reserved</p>
                            <p className="mb-0">Terms & Conditions   |   Privacy Policy</p>
                        </div>
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

export default FooterFixedComponent;
