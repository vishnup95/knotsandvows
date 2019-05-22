import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import styles from './termsAndConditions.scss';
import Helmet from 'react-helmet';

const listData = [
  {
    title: 'The website is owned and operated by knotsandvows.co.in',
    subTitle: "You acknowledge that the Website serves as a venue for the online distribution and publication of user submitted information between Service Professionals and Service Users, and, by using, visiting, registering for, and/or otherwise participating in this Website, including the Services presented, promoted, and displayed on the Website, and by clicking on “I have read and agree to the terms of use,",
    listItem: ["You are either a Service Professional or a prospective Service User.",
      "You have the authority to enter into these Terms of Use.",
      "You authorise the transfer of payment for Services requested through the use of the Website.",
      "You agree to be bound by all terms and conditions of these Terms of Use and any other documents incorporated by reference herein. If you do not so agree to the foregoing, you should not click to    affirm your acceptance thereof, in which case you are prohibited from accessing or using the Website"]
  }, {
    title: 'Modifications to terms',
    listItem: ["We may modify this Privacy Policy at any time, and we will post any new versions on this page. If we make any material changes in the way we use your personal information, we will notify you by sending an e-mail to the last e-mail address you provided to us and/or by prominently posting notice of the changes on our website.",
      "Please note that at all times you are responsible for updating your personal information to provide us with your most current e-mail address. In the event that the last e-mail you have provided us is not valid, or for any reason is not capable of delivering to you the notice described above, our dispatch of the e-mail containing such notice will nonetheless constitute effective notice of the changes described in the notice.",
      "Your use of the Website following any amendment of the Terms of Use will signify your assent to and acceptance of any revised Terms of Use. If you do not agree to abide by these or any future Terms of Use, please do not use or access the Website."]
  }, {
    title: 'Use of the website',
    listItem: ["All registration information submitted by you is truthful and accurate with agree to maintain the accuracy of the information provided by you.",
      "The Website facilitates your sharing of personal information with others in order to negotiate, provide, and use the Services.",
      "If you agree to contract for a service with another Registered User, you may need to reveal your name, email, phone number, or personal address to that individual so that the service may be performed.",
      "Please note that at all times you are responsible for updating your personal information to provide us.",
      "You must notify us prior to the effective date of the changes that you wish to deactivate your account with us.",
      "All of this information may be used for a variety of purposes, including, for example, to gather aggregated demographic or statistical information."]
  }, {
    title: 'Collection of information',
    listItem: ["To provide our Services to you, including registering you for our Services, verifying your identity and authority to use our Services, and to otherwise enable you to use our Website and our Services.",
      "We also collect all your data of the events of your past records to display in our website for high end visibility to our customer.",
      "To contact you via email, telephone, facsimile or mail, or, where requested, by text message, to deliver certain services or information you have requested.",
      "We may use your demographic information (i.e., age, postal code, residential and commercial addresses, and other various data) to more effectively facilitate the promotion of goods and services to appropriate target audiences and for other research and analytical purposes."]
  }, {
    title: 'Transfer of information',
    listItem: ["We may distribute your submissions to third parties, as permitted pursuant to our Terms of Service.",
      "We may share your information with third parties to provide you with services that we offer through Knots&Vows to conduct quality assurance Services.",
      "We maintain a presence on several social networking and blogging platforms, such as Facebook, Instagram, Twitter, Snapchat, WordPress, Pinterest and Google Plus.",
      "We may make available mobile applications (or “apps”) that you are able to download and use from your mobile device. Depending on the nature and functionality of the app, we may collect Personal Information and non-personally identifiable usage information through the app, including from your contacts, camera, photo gallery and calendar on your mobile device to which you grant us access."]
  }, {
    title: 'Change in policies',
    listItem: ["Modification of the policies will be changes with the notification date and time.",
      "We will notify you by sending an e-mail to the last e-mail address you provided to us and/or by prominently posting notice of the changes on our website.",
      "If you do not wish to permit changes in our use of your personal information, you must notify us prior to the effective date of the changes that you wish to deactivate your account with us."]
  }, {
    title: 'Transfer of information',
    listItem: ["Knots&Vows will take have the commission of 15% on the total billing of the event given.",
      "All payments will be taken by Knots&Vows from the clients and would be released on timely basis.",
      "Knots&Vows will pay 50% before the event and rest will be paid after the event gets over.",
      "All transactions will be done by the payment gateway to your given account number."]
  }
];

const jumbotronData = 
  {
    title: 'Need Help?',
    buttonText: 'Talk to our experts!',
    subtitle: 'We have you covered. Our expert planners will work with you to make your event fantastic and make sure your needs are met.'
  };

  let meta = {
    title:"Knots&Vows",
    description:'Wedding services and planning partners',
    keywords:""
  }

class TermsAndConditions extends Component {
  render() {
    return (
      <div className={styles.termsContainer}>
      <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
       </Helmet>
        <h1 className="text-center">Terms & Conditions</h1>
        <Container  className="mb-5">
          <Row>
            <Col>
              <p className={styles.desc}>
                These Terms of Use (“Agreement”) sets forth legally binding terms and conditions and the nature of services offered by www.knotsandvows.co.in. The website is owned and operated by M/S Shree Impex, a proprietorship firm incorporated under the provisions of the Companies Act, 1956 and has its registered office at H.No. 8-2-120/112/B/5&6, 3rd floor, BBR Forum, Road # 2, Banjara Hills (hereinafter referred to as “Company”). The use of this Website (and any other feature, content or application offered from time to time by the Website) is subject at all times to these Terms of Use (and may be modified by us from time to time) and all applicable laws, rules and regulations. We recommend that before accessing and using knotsandvows.co.in, you must read and agree to these Terms of Use.
          </p>
            </Col>
          </Row>
          {
            listData.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <h3 className={styles.subHeading}>{item.title}</h3>
                    {item.subTitle && <p className={styles.desc}>{item.subTitle}</p>}
                    <ul>
                      {
                        item.listItem.map((item, index) => {
                          return (
                            <li className={styles.desc} key={index}>{item}</li>
                          );
                        })}
                    </ul>
                  </Col>
                </Row>
              );
            })
          }
        </Container>

          <JumbotronComponent data={jumbotronData} bgcolor="#f8f8f8" isTalkToAhwanam={true} containerStyle="otherWrap"/>
      </div>
    );
  }
}

export default TermsAndConditions;
