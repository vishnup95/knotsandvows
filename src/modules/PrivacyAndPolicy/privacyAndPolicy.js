import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import styles from './privacyAndPolicy.scss';

const listData1 = [
  {
    heading: 'PAYMENT SECURITY',
    description: 'Our site has stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access. Seven Vows ensures that every transaction that takes between you and our Seven Vows through online is in a safe and secure environment. This can be achieved, as Seven Vows is protected by Secured Socket Layer (SSL) technology.'
  },
  {
    heading: 'COLLECTION OF PERSONALLY IDENTIFIABLE INFORMATION',
    description: 'We collect personally identifiable information (Email Id., Name, Contact number, etc.) from you when you make payment. Anyone can browse some sections of our site without being consumer of the Seven Vows Certain activities (such as applying for the Complaint Status, etc) do require Registration. We do use your contact information to send you information.'
  },
  {
    heading: 'USE OF DEMOGRAPHIC AND PROFILE DATA',
    description: 'We use Personal Information for any payment for smooth conduct of Transaction. And check your payment from time to time. We use your personal information to resolve disputes, troubleshoot problems, help promote a safe service, collect fees owed, detect and protect us against error, fraud and other criminal activity, enforce our terms and conditions, and as otherwise described to you at the time of collection.'
  }
];

const listData2 = [
  {
    heading: 'SHARING OF PERSONAL INFORMATION',
    description: 'We may share personal information with other related department entities and affiliates to help detect and prevent identity theft, fraud and other potentially illegal acts, correlate related or multiple accounts to prevent abuse of our services. We may disclose personal information, if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to court orders, or other legal process. We may disclose personal information to law enforcement offices, third party rights owners, or others in the good faith belief that such disclosure is reasonably necessary to enforce our Terms or Privacy Policy, respond to claims that an advertisement, posting or other content violates the rights of a third party or protect the rights, property or personal safety of our users or the general public.'
  },
  {
    heading: 'PROHIBITION AGAINST UNLAWFUL USE',
    description: 'As a condition for the use of the Seven Vows , the User warrants that they will not use the app for any purpose that is unlawful or illegal under any law for the time being in force within or outside India or prohibited by this Agreement. In addition, the Seven Vows shall not be used in any manner, which could damage, disable, overburden or impair it or interfere with any other party’s use of the app. The User shall refrain from obtaining or attempting to obtain any materials or information through any means not intentionally made available or provided for or through the app.'
  },
  {
    heading: 'USE OF COMMUNICATION SERVICES',
    description: 'Seven Vows may contain services such as email, News bulletin, information related to Regional or local help centers, and/or other message (hereinafter collectively referred to as “Communication Services”). The User agrees and undertakes to use the Communication Services only to post, send and receive messages and material that are proper and related to the Seven Vows. By way of example, and not as a limitation, the User agrees and undertakes that when using a Communication Service, the User will not:',
    sublist: [
      'Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights of others.',
      'Upload files that contain software or other material protected by intellectual property laws unless the User owns or controls the rights thereto or have received all necessary consents.',
      'Upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Seven Vows or another’s computer.',
      'Conduct or forward surveys, contests, pyramid schemes or chain letters;',
      'Download any file posted by another user of a Communication Service that the User know, or reasonably should know, cannot be legally distributed in such manner;',
      'Falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded;',
      'Violate any code of conduct or other guidelines, which may be applicable for or to any particular Communication Service;',
      'Violate any applicable laws or regulations for the time being in force in or outside India;',
      'Violate any of the terms and conditions of this Agreement or any other terms and conditions for the use of the app contained elsewhere here in.'
    ]
  }
];

const listData3 = [
  {
    heading: 'TERMINATION/ACCESS RESTRICTION',
    description: 'Seven Vows reserves the right, in its sole discretion, to terminate the access to the app and the related services or any portion thereof at any time, without notice.'
  }
]

const jumbotronData = 
  {
    title: 'Need Help?',
    buttonText: 'Talk to our wedding planner!',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
  };


class PrivacyAndPolicy extends Component {

  render() {
    return (
      <div className={styles.privacyContainer}>
        <h1 className="text-center">Privacy Policies</h1>
        <Container  className="mb-5">
          <Row className="my-4">
            <Col>
              <p className={styles.desc}>
              We value the trust you place in us. Thats why we insist upon the highest standards for secure transactions and applicant information privacy. Please read the following statement to learn about our information gathering and dissemination practices. Note: Our privacy policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this policy periodically.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <ol>
                {
                  listData1.map((item, index) => {
                    return (
                      <li className={styles.boldList} key={index}>
                        {item.heading}&nbsp;{item.description}
                      </li>
                    );
                  })}
              </ol>
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <p className={styles.desc}>
              In our efforts to continually improve our product and service offerings, we collect and analyze demographic and profile data about our users’ activity on our app. We identify and use your IP address to help diagnose problems with our server, and to administer our app. Your IP address is also used to help identify you and to gather broad demographic information.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <ol start="4">
                {
                  listData2.map((item, index) => {
                    return (
                      <li className={styles.desc} key={index}>
                        {item.heading}&nbsp;
                        <span>{item.description}</span>
                        <ol className="my-4">
                          {item.sublist &&  item.sublist.map((item, index) => {
                            return <li key={index}>{item}</li>
                          })}
                        </ol>
                      </li>
                    );
                  })}
              </ol>
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <p className={styles.desc}>
                Seven Vows reserves the right at all times to disclose any information as is necessary to satisfy or comply with any applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to remove any information or materials, in whole or in part, in Seven Vows sole discretion.
              </p>
              <p className={styles.desc}>
                Seven Vows does not control or endorse the content, messages or information found in any communication service and, therefore, Seven Vows specifically disclaims any liability or responsibility whatsoever with regard to the communication services and any actions resulting from the user’s participation in any communication service Materials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. User is responsible for keeping himself updated of and adhering to such limitations if they download the materials
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <ol start="7" className="mb-5">
                {
                  listData3.map((item, index) => {
                    return (
                      <li className={styles.desc} key={index}>
                        {item.heading}&nbsp;<span>{item.description}</span>
                      </li>
                    );
                  })}
              </ol>
            </Col>
          </Row>

        </Container>

        <JumbotronComponent data={jumbotronData} bgcolor="#f8f8f8" containerStyle="otherWrap" isTalkToAhwanam ={true} />

      </div>
    );
  }
}

export default PrivacyAndPolicy;
