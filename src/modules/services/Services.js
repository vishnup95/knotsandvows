import React, { Component } from 'react';
import styles from './services.scss';
// import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import { Container } from 'reactstrap';
import DetailComponent from './detailComponent';
// import { imagePath } from '../../utils/assetUtils';

class ServicesComponent extends Component {
  render() {
    return (
      <div className={styles.servicesContainer}>
        <div className={styles.servicesCover}></div>
        <Container className={styles.containerClass}>
          {
            Array(4).fill(1).map((item, index) => {
              return <DetailComponent key={index}/>
            })
          }
        </Container>

      </div>
    );
  }
}

export default ServicesComponent;
