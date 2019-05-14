import React, { Component } from 'react';
import styles from './services.scss';
import { Container } from 'reactstrap';
import DetailComponent from './detailComponent';
// import { imagePath } from '../../utils/assetUtils';
import data from './servicesData';

class ServicesComponent extends Component {
  render() {
    return (
      <div className={styles.servicesContainer}>
        <div className={styles.servicesCover}></div>
        <Container className={styles.containerClass}>
          {
            data.map((item, index) => {
              return <DetailComponent key={index} data={item}/>
            })
          }
        </Container>

      </div>
    );
  }
}

export default ServicesComponent;
