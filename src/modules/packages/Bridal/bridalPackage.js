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
          <div className={styles.bridalImg}>
            <div className={styles.coverDetail}>
              {/* <h4>Planning your</h4> */}
              <h1>Because in your dreams,<br/>every detail matters</h1>
            </div>
          </div>
        </div>

        <div className={styles.containerClass}>
          <Row className={`${styles.detailBox}`}>
            <Col md="12">
              <h2 className={styles.pink}>It&#39;s your wedding and Knots&Vows wants your day to be as perfect as you are.</h2>
            </Col>
          </Row>

          {
            data.map((item, index) => {
              return <BridalDetailComponent key={index} data={item} id={`section${index + 1}`} />
            })
          }
          <Row className={`${styles.detailBox}`}>
            <Col md="6" className={`${styles.priceCol} text-right flex`}>
              <div className={styles.priceWrap}>
                <img className={styles.priceBg} src={imagePath('bridal-offer-bg.svg')} alt="" />
                <div className={styles.price}>Price starting</div>
                <div className={styles.priceAt}>at</div>
                <div className={styles.priceValue}>6 Lakhs</div>
              </div>
            </Col>
            <Col md="6" className={`${styles.talkWrap} flex flex-column justify-center mb-5`}>
              <TalkToWeddingPlanner buttonText={'Let us help you!'} />
            </Col>
          </Row>

          <Row>
            <Col md="12" className="text-center">
              <img className={styles.vowIconLine} src={imagePath('about-vows.png')} alt="vow icon" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default BridalPackage;
