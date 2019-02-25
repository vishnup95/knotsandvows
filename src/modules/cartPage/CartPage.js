import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import styles from './cartPage.scss';
import * as actions from './actions';
import OrderSummaryComponent from './orderSummary';
import InputField from '../../components/InputField/inputField';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';

const mapStateToProps = state => ({
  user: state.session.user,
  exclusives: state.home.exclusives
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = {
  title: 'Popular Packages'
}

const BuyerDetail = () => {
  return(
     <Col md="12" className={styles.cartCard}>
        <Row className={styles.headerRow}>
            <Col className={styles.cartTitle}>Your Details</Col>
        </Row>
        <Row className={`${styles.headerRow} py-5`}>
            <Col md="6">
              <InputField placeHolder="Name" id="text1"/>
            </Col>
            <Col md="6">
              <InputField placeHolder="Mobile Number" id="text2"/>
            </Col>
            <Col md="6">
              <InputField placeHolder="Email ID" id="text3"/>
            </Col>
        </Row>
      </Col>
  );
}

const CartItem = () => {
  return(
    <Row className={styles.headerRow}>
      <Col md="4" className={styles.editRemoveLink}>
        <span>Edit</span>
        <span> | </span>
        <span>Remove</span>
      </Col>
      <Col md="4">Item dfdsf dfsdfsfwerwe strwexfrtcdgetrgcfxe</Col>
      <Col md="4" className={styles.cartItemPrice}>₹ 1,35,000.00</Col>
    </Row>
  );
}

class CartComponent extends Component {
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchCategories());
  }

  componentWillMount() {
    if (this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchCategories());
    }
  }

  

  render() {
    return (
      <div style={{marginTop:'6.0625rem'}}>
        <div className="text-center mb-5 pt-5">
          <h3 className={styles.cartPageTitle}>Your Wishlist</h3>
        </div>
        <div className={styles.cartContainer}>
          <Row>
            <Col md="7" name="cart-items-display">
        
              <Col md="12" className={styles.cartCard}>
                <Row className={styles.headerRow}>
                  <Col md="4" className={styles.cartTitleSmall}>Item</Col>
                  <Col md="4" className={styles.cartTitleSmall}>Details</Col>
                  <Col md="4" className={styles.cartTitleSmall}>Price</Col>
                </Row>

                {
                  [1,2,3].map((key, index) => {
                    return <CartItem key={index}/>;
                  })
                }
              
                <Row className={styles.headerRow}>
                  <Col className={styles.backLink}>
                    Back to Categories
                  </Col>
                </Row>
              </Col>
            
              <BuyerDetail/>

            </Col>

            <Col md="5" name="cart-total display">
              <OrderSummaryComponent/>
            </Col>

          </Row>
        </div>

        <JumbotronComponent data={jumbotronData} items={this.props.exclusives} bgcolor="#f8f8f8" cardType="detailed"/>
      </div>
      
    );
  }
}

CartComponent.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  exclusives: PropTypes.array,
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);
