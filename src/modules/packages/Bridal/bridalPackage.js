import React, { Component } from 'react';
import styles from './bridalPackage.scss';
import { Row, Col } from 'reactstrap';
import BridalDetailComponent from './bridalDetailComponent';
import data from './bridalData';
import { imagePath } from '../../../utils/assetUtils';

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
            {/* <div className={styles.iconContainer}>
              <img src={imagePath('inspire-icon.svg')} alt="" onClick={() => this.handleSectionScroll('section1')} aria-hidden />
              <img src={imagePath('shortlist-icon.png')} alt="" onClick={() => this.handleSectionScroll('section2')} aria-hidden />
              <img src={imagePath('wedding-day-service-icon.svg')} alt="" onClick={() => this.handleSectionScroll('section3')} aria-hidden />
              <img src={imagePath('d-day-icon.png')} alt="" onClick={() => this.handleSectionScroll('section4')} aria-hidden /> 
            </div> */}
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

          <Col md="12" className="text-center">
            <img className={styles.vowIconLine} src={imagePath('about-vows.png')} alt="vow icon" />
          </Col>

        </div>
      </div>
    );
  }
}

export default BridalPackage;
