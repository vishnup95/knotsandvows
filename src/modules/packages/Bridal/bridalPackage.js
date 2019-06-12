import React, { Component } from 'react';
import styles from './bridalPackage.scss';
import { Row, Col } from 'reactstrap';
import BridalDetailComponent from './bridalDetailComponent';
import data from './bridalData';
import { imagePath } from '../../../utils/assetUtils';
import TalkToWeddingPlanner from '../../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

class BridalPackage extends Component {
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

  render() {
    return (
      <div className={styles.servicesContainer}>
        <div className={styles.servicesCover}>
          <div className={styles.coverDetail}>
            <h4>Planning your</h4>
            <h1>perfect day begins here</h1>
          </div>
          <div className={styles.bridalImg}></div>
        </div>

        <div className={styles.containerClass}>
          <Row className={`${styles.detailBox}`}>
            <Col md="12" className={`pt-0 pb-0 mb-4`}>
              <h2 className={styles.pink}>Our Bridal packages includes.</h2>
            </Col>
          </Row>

          {
            data.map((item, index) => {
              return <BridalDetailComponent key={index} data={item} id={`section${index + 1}`} />
            })
          }
          <Row>
            <Col md="12" className="text-center">
              <img className={styles.vowIconLine} src={imagePath('about-vows.png')} alt="vow icon" />
            </Col>
          </Row>
          <Row className={`${styles.detailBox}`}>
            <Col md="6" className="text-right flex justify-center">
              <div className={styles.priceWrap}>
                <img className={styles.priceBg} src={imagePath('bridal-offer-bg.svg')} alt="" />
                <div className={styles.price}>Price starting</div>
                <div className={styles.priceAt}>at</div>
                <div className={styles.priceValue}>6 Lakhs</div>
                <h5 className={styles.freeText}>Get free makeup trial!</h5>
              </div>
            </Col>
            <Col md="6" >
              <h2 className={styles.pink}>Lorem ipsum dolor sit amet.</h2>
              <TalkToWeddingPlanner buttonText={'Let us help you!'} />

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default BridalPackage;
