import React, { Component } from 'react';
// import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import { Row,Col} from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
// import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import styles from './bookings.scss';

const jumbotronData = [
  {
      title: 'Need Help?',
      buttonText: 'Talk to our experts!',
      subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by clicking the Chat button below and they’ll help you get your party started.'
  },
  {
      title: 'My bookings'
  }
];

class AboutComponent extends Component {
  render() {
    return (
      <div className={styles.bookContainer}>
        <JumbotronComponent data={jumbotronData[1]} containerStyle="packageWrap" bgcolor="#ffffff">
          <Row className={styles.bHeader}>
            <Col sm="2">Vendor Category</Col>
            <Col sm="4">Vendor Name</Col>
            <Col sm="2">Price</Col>
            <Col sm="4">Event Date(s)</Col>
          </Row>
          {
            Array(4).fill(1).map((item, index) => {
              return <Row key={index} className={styles.bItem}>
                <Col sm="2">Photography</Col>
                <Col sm="4">
                  <div className={styles.vendorImage} style={{ backgroundImage: `url(/images/card_1_1.jpg)`}}></div>
                  Abad photo & videoservices
                </Col>
                <Col sm="2">₹ 1,48,000</Col>
                <Col sm="4">12, 14, 16 May 2019</Col>
              </Row>
            })
          }    
        </JumbotronComponent>

        <JumbotronComponent data={jumbotronData[0]} bgcolor="#f8f8f8" containerStyle="otherWrap" isTalkToAhwanam ={true} />
      </div>
    );
  }
}

export default AboutComponent;
