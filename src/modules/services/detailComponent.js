import React, { Component } from 'react';
import styles from './services.scss';
import { Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';

class DetailComponent extends Component {
  state = { selectedIndex: 0};

  changeSelection(index) {
    this.setState({selectedIndex: index});
  }

  render() {
    return (
      <Row className={styles.detailBox} id={this.props.id}>
        <Col md="3" className={styles.leftSection}>
          <img src={imagePath(this.props.data.icon)} alt="create it"/>
          <h3>{this.props.data.heading}</h3>
          <hr align="right"/>
          <ul>
            {
              this.props.data.options.map((item, index) => {
                return <li key={index} onClick={() => this.changeSelection(index)} className={this.state.selectedIndex === index ? styles.activeLi : ''} aria-hidden>{item}</li>
              })
            }
          </ul>
        </Col>
        <Col className={styles.rightSection}>
          <div className={`${styles.detailWrap} m-0`}>
            <div className="p-0">
              <img className={styles.detailImage} src={imagePath(this.props.data.optionDetail[this.state.selectedIndex].coverImage)} alt=""/>
            </div>
            <div className={styles.description}>
              <ul>
                {
                  this.props.data.optionDetail[this.state.selectedIndex].listItems.map((item, index) => {
                    return  <li key={index}>{item}</li>
                  })
                }
              </ul>
            </div>
          </div>
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
