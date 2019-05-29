import React, { Component } from 'react';
import styles from './services.scss';
import { Row, Col } from 'reactstrap';
import DetailComponent from './detailComponent';
import data from './servicesData';

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
            <h4>We are there with you,<span className='tab-only'><br /></span> in every step of your planning journey.</h4>
          </div>
        </div>

        <div className={styles.containerClass}>
          <Row className={`${styles.detailBox}`}>
            <Col md="12" className={`pt-0 pb-0 `}>
              <h2 className={styles.pink}>Choose one or choose all</h2>
              <p>Every wedding has its unique essence and comes with its own set of planning needs. Our services have been <span className="tab-only"><br/></span> crafted in such a way that you can book them separately or can simply add them to a package.</p>
            </Col>
          </Row>

          {
            data.map((item, index) => {
              return <DetailComponent key={index} data={item} id={`section${index + 1}`} />
            })
          }

        </div>
      </div>
    );
  }
}

export default ServicesComponent;
