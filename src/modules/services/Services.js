import React, { Component } from 'react';
import styles from './services.scss';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import { Row,Col} from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';

const description = 'We work with some of the most budget friendly and amazing vendors/merchants in the wedding industry. We take pride in the partnerships we have with our vendors.';
const description2 = 'We work with some of the most budget friendly and amazing vendors/merchants in the wedding industry';

const jumbotronData = [
  {
    title: 'A la carte',
    services: [
      {
        title: 'You selecting vendors',
        description: description2,
        icon: 'serv1.svg'
      },
      {
        title: 'Negotiating with vendors',
        description: description2,
        icon: 'serv2.svg'
      },
      {
        title: 'Recommending ideas',
        description: description2,
        icon: 'serv1.svg'
      },
      {
        title: 'Talk with vendors',
        description: description2,
        icon: 'serv2.svg'
      },
      {
        title: 'Service five',
        description: description2,
        icon: 'serv1.svg'
      },
    ],
    subtitle: description
  },
  {
    title: 'Full service wedding planning',
    services: [
      {
        title: 'We plan you wedding',
        description: description2,
        icon: 'serv2.svg'
      },
      {
        title: 'We set up vendors',
        description: description2,
        icon: 'serv1.svg'
      },
      {
        title: 'We create ideas',
        description: description2,
        icon: 'serv2.svg'
      },
      {
        title: 'We execute the event',
        description: description2,
        icon: 'serv1.svg'
      }
    ],
    subtitle: description
  },
];

class ServicesComponent extends Component {
  render() {
    return (
      <div>
        <JumbotronComponent data={jumbotronData[0]} bgcolor="#ffffff" containerStyle="otherWrap">
          <Row>
            {
              jumbotronData[0].services.map((item, index) => {
                return <Col sm="6" key={index} className="no-margin no-padding">
                  <div className={styles.serviceCard}>
                    <p>
                      <img src={imagePath(item.icon)} alt="icon"/>
                      {item.title}
                    </p>
                    <p>{item.description}</p>
                  </div>
                </Col>
              })
            }
          </Row>
        </JumbotronComponent>

        <JumbotronComponent data={jumbotronData[1]} bgcolor="#f9f9f9" containerStyle="otherWrap">
          <Row>
            {
              jumbotronData[1].services.map((item, index) => {
                return <Col sm="6" key={index} className="no-margin no-padding">
                  <div className={styles.serviceCard}>
                    <p>
                      <img src={imagePath(item.icon)} alt="icon"/>
                      {item.title}
                    </p>
                    <p>{item.description}</p>
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

export default ServicesComponent;
