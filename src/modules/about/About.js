import React, { Component } from 'react';
import { Row,Col, Container} from 'reactstrap';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import styles from './about.scss';

class AboutComponent extends Component {
  render() {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.aboutCover}></div>
        <Container>
          <h3 className={`${styles.h3Class} mt-5`}>
            Lorem Ipsum is simply dummy text of the printing industry has survived 
            not only five centuries, but also the leap into electronic typesettingunchanged.
          </h3>
          <h4 className={`${styles.h4Class} font-italic text-center mt-2`}>
            Stallman
          </h4>

          <Row className="my-5 py-4">
            <Col sm="4">
              <h4 className={styles.h4Class}>
                Who we are 
              </h4>
              <p className={styles.pClass}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Praesent eget risus vitae massa semper aliquam quis mattis quam. 
                Morbi vitae tortor tempus, placerat leo et, suscipit lectus. 
                Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, 
                dapibus dolor eget, dictum arcu.  Phasellus ut euismod massa, eu 
                eleifend ipsum. Nulla eu neque commodo, dapibus.
              </p>
            </Col>

            <Col sm="4">
              <h4 className={styles.h4Class}>
                What we do
              </h4>
              <p className={styles.pClass}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Praesent eget risus vitae massa semper aliquam quis mattis quam. 
                Morbi vitae tortor tempus, placerat leo et, suscipit lectus. 
                Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, 
                dapibus dolor eget, dictum arcu.  Phasellus ut euismod massa, eu 
                eleifend ipsum. Nulla eu neque commodo, dapibus.
              </p>
            </Col>

            <Col sm="4">
              <h4 className={styles.h4Class}>
                Why we do it 
              </h4>
              <p className={styles.pClass}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Praesent eget risus vitae massa semper aliquam quis mattis quam. 
                Morbi vitae tortor tempus, placerat leo et, suscipit lectus. 
                Phasellus ut euismod massa, eu eleifend ipsum. Nulla eu neque commodo, 
                dapibus dolor eget, dictum arcu.  Phasellus ut euismod massa, eu 
                eleifend ipsum. Nulla eu neque commodo, dapibus.
              </p>
            </Col>
          </Row>

          <h4 className={styles.h4Class}>Meet the team memebers</h4>
          <Row className="mt-4">
            <Col className="no-padding">
                <HorizontalSlider data={Array(4).fill(3)} type="about"/>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default AboutComponent;
