import React, { Component } from 'react';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import { Row,Col} from 'reactstrap';
// import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import styles from './about.scss';

const jumbotronData = {
  title: 'About Seven Vows',
  subtitle: 'At Seven Vows find everything you need - from WOW wedding ideas to the best wedding professionals!'
};

class AboutComponent extends Component {
  render() {
    return (
      <div className={styles.aboutContainer}>
        <JumbotronComponent data={jumbotronData} bgcolor="#ffffff" containerStyle="otherWrap">
          <Row className="my-5 py-4">
            <Col sm="6">
              <h4 className={styles.h4Class}>
              &quot;We work with some of the most budget friendly and 
                amazing vendors/merchants in the wedding industry. We 
                take pride in the partnerships we have with our vendors.&quot;
              </h4>
            </Col>

            <Col sm="6">
              <p className={styles.pClass}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Praesent eget risus vitae massa semper aliquam quis mattis quam. 
                Morbi vitae tortor tempus, placerat leo et, suscipit lectus. 
                Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, 
                dapibus dolor eget, dictum arcu.  Phasellus ut euismod massa, eu 
                eleifend ipsum. Nulla eu neque commodo, dapibus.
              </p>

              <p className={styles.pClass}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Praesent eget risus vitae massa semper aliquam quis mattis quam. 
                Morbi vitae tortor tempus, placerat leo et, suscipit lectus. 
                Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, 
                dapibus dolor dsdw, dictum arcu.  Phasellus ut euismod massa, eu 
                eleifend ipsum. Nulla eu neque commodo, dapibus.
              </p>

            </Col>
          </Row>

          <h4 className={styles.h4Class}>Meet the team memebers</h4>
          <Row className="mt-4">
            {
              Array(4).fill(1).map((item, index) => {
                return <Col key={index}>
                  <div className={styles.memberContainer}>
                    <div className={styles.imageCover} style={{ backgroundImage: `url(/images/card_1_1.jpg)`}}>
                      <div className={styles.hoverContainer}>Share</div>
                    </div>
                    <div className={styles.memberName}>Founder</div>
                    <div className={styles.memberPosition}>CFO</div>
                  </div>
                </Col>
              })
            }
          </Row>
        </JumbotronComponent>

      </div>
    );
  }
}

export default AboutComponent;
