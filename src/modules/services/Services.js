import React, { Component } from 'react';
import styles from './services.scss';
import { Row, Col, Container } from 'reactstrap';
import DetailComponent from './detailComponent';
import { imagePath } from '../../utils/assetUtils';
import data from './servicesData';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

class ServicesComponent extends Component {
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
            <h1>A big step <span className='tab-only'><br /></span>towards a beautiful life</h1>
            <h4>We are there with you, in every step of your planning journey.</h4>
            <div className={styles.iconContainer}>
              <img src={imagePath('define-icon.png')} alt="" onClick={() => this.handleSectionScroll('section1')} aria-hidden />
              <img src={imagePath('shortlist-icon.png')} alt="" onClick={() => this.handleSectionScroll('section2')} aria-hidden />
              <img src={imagePath('detail-icon.png')} alt="" onClick={() => this.handleSectionScroll('section3')} aria-hidden />
              <img src={imagePath('d-day-icon.png')} alt="" onClick={() => this.handleSectionScroll('section4')} aria-hidden />
            </div>
          </div>
        </div>

        <Container className={styles.containerClass}>
          <Row className={`mt-5 ${styles.detailBox}`}>
            <Col md="4" className={styles.leftSection}></Col>
            <Col md="8" className={`pt-0 pb-0 ${styles.rightSection}`}>
              <img className={styles.vowIcon} src={imagePath('vow-icon.png')} alt="vow icon" />
              <h2 className={styles.pink}>Pick one or choose all</h2>
              <h4>Every wedding has its unique essence and comes with its own set of planning needs. Our services have been crafted in such a way that you can book them separately or can simply add them to a package.</h4>
            </Col>
          </Row>

          {
            data.map((item, index) => {
              return <DetailComponent key={index} data={item} id={`section${index + 1}`} />
            })
          }

          <Row className={`mb-5 ${styles.detailBox}`}>
            <Col md="4" className={styles.leftSection}></Col>
            <Col md="8" className={styles.rightSection}>
              <h2>We are just a step away!</h2>
              <div className="mt-4 ml-0" style={{ width: 'max-content' }}>
                <TalkToWeddingPlanner buttonText={'Let Us Help You'} />
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default ServicesComponent;
