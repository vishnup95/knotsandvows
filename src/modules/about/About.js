import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import MemberContainerComponent from './memberComponent';
import styles from './about.scss';
import { imagePath } from '../../utils/assetUtils';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

class AboutComponent extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
   
  render() {
    return (
      <div className={styles.aboutContainer}>
        <div className={styles.aboutCover}></div>
        <Container className={`${styles.aboutSubContainer} mb-5 pb-5`}>
          <h2 className={`${styles.h2Class} mt-5`}>
            Our Essence
          </h2>
          <h4 className={styles.h4Class}>
            Seven Vows operates on creativity, resourcefulness and transparency. <br/>
            We bring these values to all every one of our actions and interactions 
          </h4>

          <div className={`my-5 ${styles.vowsImage}`}>
            <img src={imagePath('about-vows.png')} alt="vows icon"/>  
          </div>

          <h2 className={styles.h2Class}>
            what’s different when we plan your wedding’
          </h2>
          <h4 className={`mb-5 ${styles.h4ClassGrey}`}>
            Our Vows team is made up of individuals with a passion <br/> 
            for celebrations. Celebrations Make us happy
          </h4>

          <MemberContainerComponent/>
          <hr className="my-5"/>

          <h2 className={`${styles.h2Class} my-5`}>
            Our Promise
          </h2>
          <h2 className={styles.h2ClassPurple}>
          “We vow to deliver magical memories of every
            celebration and wedding we touch.”
          </h2>

          <div className={`my-5 ${styles.vowsImage}`}>
            <img src={imagePath('about-vows.png')} alt="vows icon"/>  
          </div>

          <Row style={{margin: '0 auto'}}>
            <Col className={styles.logoImage}>
              <img src={imagePath('logo.svg')} alt="seven vows"/>
            </Col>

            <Col className="text-left">
            <div className={styles.alignMiddle}>
              <h2 className={`${styles.h2BigMobile} text-left`}>
                MEET US <br/> IN PERSON
              </h2>

              <h4 className={`${styles.h4Class} text-left text-dark`}>
                xo oxo team is made up of <br/>
                individuals with a passion 
              </h4>

              <div className="mt-4 ml-0" style={{width: 'max-content'}}>
                <TalkToWeddingPlanner buttonText={'LET US HELP YOU'}/>
              </div>
            </div>
              
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default AboutComponent;
