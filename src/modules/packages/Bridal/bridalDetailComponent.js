import React, { Component } from 'react';
import styles from './bridalPackage.scss';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { imagePath } from '../../../utils/assetUtils';
// import SimpleCarousel from '../../../components/simpleCarousel/simpleCarousel';
// import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

class BridalDetailComponent extends Component {
  state = { selectedIndex: 0 };

  changeSelection(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    return (
      <Row className={styles.detailBox} id={this.props.id}>
        <Col md="12" className={styles.sectionWrap}>
          <Col className={styles.imageCarouselWrap}>
            {/* <img className={`${styles.imgIcon} tab-only`} src={imagePath(this.props.data.icon)} alt="vow icon" /> */}
            {/* <img className={`${styles.imgIcon} mobile-only`} src={imagePath(this.props.data.mobileIcon)} alt="vow icon" /> */}
            {/* <h3 className={`${styles.mobile} mobile-only`} dangerouslySetInnerHTML={{__html: this.props.data.title}}></h3> */}
            {/* <SimpleCarousel data={this.props.data.images} /> */}
            <img className={`${styles.itemImg} `} src={imagePath(this.props.data.icon)} alt="vow icon" />


          </Col>
          <Col className={styles.contentPart}>
            <h3  dangerouslySetInnerHTML={{__html: this.props.data.title}}></h3>
            <ul>
              {
                this.props.data.listItems.map((item, index) => {
                  return <li key={index} aria-hidden>{item}</li>
                })
              }
            </ul>
            {/* <TalkToWeddingPlanner buttonText={this.props.data.ctaText} type="services" /> */}
          </Col>
        </Col>
      </Row>
    );
  }
}

BridalDetailComponent.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string
};

export default BridalDetailComponent;
