import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';
import styles from './CeremonyDetail.scss';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
// import CategoryCard from '../../components/Card/cardCategory';


const categories = [
  {
    thumb_image: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
    sub_title: "A Selection of venues quqlity and your confort",
    name: "Catering",
    page_name: "catering",
    serviceId: 2,
    vendors: [
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      }
    ]
  },
  {
    thumb_image: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
    sub_title: "A Selection of venues quqlity and your confort",
    name: "Catering",
    page_name: "catering",
    serviceId: 2,
    vendors: [
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      },
      {
        category_name: "Catering",
        charge_type: "Per Day",
        city: "Hyderabad",
        name: "Suresh ",
        page_name: "suresh_123",
        pic_url: "http://sandbox.ahwanam.com/images/card_1_1.jpg",
        price: {
          actual_price: "200.00",
          offer_price: null,
          service_price: "0"
        },
        rating: "4.06",
        reviews_count: "7"
      }
    ]
  }
];

class CeremonyDetail extends Component {
  render() {
    return (
      <div className={styles.ceremonyDetail}>
        <div className={styles.ceremonyCover} style={{ background: "url(" + imagePath('ceremony-detail.jpg') + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <h1 className={styles.title}>Plan your party</h1>
          <p>At Ahwanam find everything you need - from WOW wedding ideas to the best wedding professionals!</p>
          <img className={styles.bottomCurve} src={imagePath('curveline.svg')} alt="curve" />
        </div>
        <Container>
          <Row>
            <Col>
              <h3>Plan Your Wedding - Find and book your dream team
            </h3>
            </Col>
            {/* <Col>Select City</Col> */}
            <Col>Dropdown goes here</Col>
          </Row>
          <Row>
            <Col>
              <HorizontalSlider data={categories} type='small' />
            </Col>
          </Row>
          {
            categories.map((category, index) => {
              return (

                <div key={index} >
                  <Row>
                    <Col>

                      <h3>{category.name}</h3>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <HorizontalSlider data={category.vendors} />
                    </Col>
                  </Row>

                </div>
              );
            })
          }
        </Container>
      </div>
    );
  }
}

export default CeremonyDetail;
