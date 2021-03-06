import React, { Component } from 'react';
import styles from './bridalPackage.scss';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { imagePath } from '../../../utils/assetUtils';

class BridalDetailComponent extends Component {
  state = { selectedIndex: 0 };

  changeSelection(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    return (
      <Row className={styles.detailBox} id={this.props.id}>
        <Col md="12" className={styles.sectionWrap}>
          <Col className={styles.imageCarouselWrap} style={{ backgroundImage: "url(" + imagePath(this.props.data.detailImage) + ")" }}>
            {this.props.data.offerText && <div className={`${styles.cornerContent} mobile-only`} dangerouslySetInnerHTML={{ __html: this.props.data.offerText }}></div>}

          </Col>
          <Col className={styles.contentPart}>
            {this.props.data.offerText && <div className={`${styles.cornerContent} tab-only`} dangerouslySetInnerHTML={{ __html: this.props.data.offerText }}></div>}
            <h3 dangerouslySetInnerHTML={{ __html: this.props.data.title }}></h3>
            <ul>
              {
                this.props.data.listItems.map((item, index) => {
                  return <li key={index} aria-hidden>{item}</li>
                })
              }
            </ul>
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
