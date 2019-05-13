import React, { Component } from 'react';
import styles from './services.scss';
// import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import { Row, Col} from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';

class DetailComponent extends Component {
  render() {
    return (
      <Row className={styles.detailBox}>
        <Col md="4" className={styles.leftSection}>
          <img src={imagePath('define-icon.png')} alt="create it"/>
          <h3>Define your <br/> wedding style</h3>
          <hr align="right"/>
          <ul>
            <li>Design & Decor</li>
            <li>Photoshoot</li>
            <li>Digital Services</li>
            <li>Little Extras</li>
          </ul>
        </Col>
        <Col md="8" className={styles.rightSection}>
          <Row className="m-0">
            <Col md="8" className="p-0">
              <img src={imagePath('define-img.png')} alt=""/>
            </Col>
            <Col md="4" className={styles.description}>
              <ul>
                <li>Decor ideas and designs</li>
                <li>Color combinations, linen & flower selection, props and accessories</li>
                <li>Floorplans and table arrangements</li>
                <li>Bride/Groom entrance ideas</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default DetailComponent;
