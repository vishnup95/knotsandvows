import React, { Component } from 'react';
import styles from './services.scss';
import { Row, Col } from 'reactstrap';
import DetailComponent from './detailComponent';
import data from './servicesData';
import { imagePath } from '../../utils/assetUtils';
import Helmet from 'react-helmet';

let meta = {
  title:"A la carte & Full Service Wedding Planning - we do both.",
  description:"Choose the services you want, the way you want it. All we do is put a knot of our   expertise around it.",
  keywords:""
}

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
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
       </Helmet>
        <div className={styles.servicesCover}>
          <div className={styles.coverDetail}>
            <h1>A big step <span className='tab-only'><br /></span>towards a beautiful life</h1>
            <h4>We are there with you,<span className='tab-only'><br /></span> in every step of your planning journey.</h4>
            <div className={styles.iconContainer}>
              <img src={imagePath('inspire-icon.svg')} alt="icon-inspie" onClick={() => this.handleSectionScroll('section1')} aria-hidden />
              <img src={imagePath('shortlist-icon.png')} alt="icon-shortlist" onClick={() => this.handleSectionScroll('section2')} aria-hidden />
              <img src={imagePath('wedding-day-service-icon.svg')} alt="icon-wedding" onClick={() => this.handleSectionScroll('section3')} aria-hidden />
              {/* <img src={imagePath('d-day-icon.png')} alt="" onClick={() => this.handleSectionScroll('section4')} aria-hidden /> */}
            </div>
          </div>
        </div>

        <div className={styles.containerClass}>
          <Row className={`${styles.detailBox}`}>
            <Col md="12" className={`pt-0 pb-0 mb-4`}>
              <h2 className={styles.pink}>Choose one or choose all</h2>
              <p className={styles.detailSubHeading}>Every wedding has its unique essence and comes with its own set of planning needs. Our services have been <span className="tab-only"><br/></span> crafted in such a way that you can book them separately or can simply add them to a package.</p>
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
