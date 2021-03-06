import React, { Component } from 'react';
import styles from './services.scss';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
// import SimpleCarousel from '../../components/simpleCarousel/simpleCarousel';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';
import ImageFade from '../../components/ImageFade/imageFade';

class DetailComponent extends Component {
  state = { selectedIndex: 0 , fromServices: true};

  changeSelection(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    return (
      <Row className={styles.detailBox} id={this.props.id}>
        {this.props.data.heading && <h2 dangerouslySetInnerHTML={{__html: this.props.data.heading}}></h2>}
        <Col md="12" className={styles.sectionWrap}>
          <div className={styles.imageCarouselWrap}>
            <img className={`${styles.imgIcon} tab-only`} src={imagePath(this.props.data.icon)} alt="vow icon" />
            <img className={`${styles.imgIcon} mobile-only`} src={imagePath(this.props.data.mobileIcon)} alt="vow icon" />
            <h3 className={`${styles.mobile} mobile-only`} dangerouslySetInnerHTML={{__html: this.props.data.title}}></h3>
            <ImageFade data={this.props.data.images}  fromServices={this.state.fromServices}/>
          </div>
          <div className={styles.contentPart}>
            <h3 className="tab-only" dangerouslySetInnerHTML={{__html: this.props.data.title}}></h3>
            <ul>
              {
                this.props.data.listItems.map((item, index) => {
                  return <li key={index} aria-hidden>{item}</li>
                })
              }
            </ul>
            <TalkToWeddingPlanner buttonText={this.props.data.ctaText} type="services" />
          </div>
        </Col>
        <Col md="12" className="text-center">
          <img className={styles.vowIconLine} src={imagePath('about-vows.png')} alt="vow icon" />
        </Col>
      </Row>
    );
  }
}

DetailComponent.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string
};

export default DetailComponent;
