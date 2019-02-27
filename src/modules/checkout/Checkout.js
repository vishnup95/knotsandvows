import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'reactstrap';
// import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import styles from '../cartPage/cartPage.scss';
import InputField from '../../components/InputField/inputField';
import OrderSummaryComponent from '../cartPage/orderSummary';
import * as actions from './actions';

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.sample.categories,
  pingMessage: state.sample.pingMessage
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class Sample extends Component {
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchCategories());
  }

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.dispatch(actions.fetchCategories());
    }
    this.props.dispatch(actions.ping({ ping: 'hello' }));
  }

  render() {
    return (
      <div style={{marginTop:'10.33125rem'}}>
      <div className="text-center mb-5 pt-5">
        <h3 className={styles.cartPageTitle}>Place Your Order</h3>
      </div>
      <div className={styles.cartContainer} style={{backgroundColor: '#f8f8f8'}}>
          <Row>
            <Col md="7" name="cart-items-display">
              <Row>
                <Col md="6" name="party-info">
                  <Col md="12" className={styles.cartCard}>
                    <Row className={styles.headerRow}>
                        <Col className={styles.cartTitle}>Party Information</Col>
                    </Row>
                    <Row className={`${styles.headerRow}`}>
                        <Col md="12">
                          <InputField placeHolder="Your Name" id="text1"/>
                        </Col>
                        <Col md="12">
                          <InputField placeHolder="Last Name" id="text2"/>
                        </Col>
                        <Col md="12">
                          <InputField placeHolder="Mobile Phone" id="text3"/>
                        </Col>
                        <Col md="12">
                          <InputField placeHolder="Address 1" id="text3"/>
                        </Col>
                        <Col md="12">
                          <InputField placeHolder="Address 2 (Optional)" id="text3"/>
                        </Col>
                        <Col md="12">
                          <InputField placeHolder="City" id="text3"/>
                        </Col>
                        <Col md="6">
                          <InputField placeHolder="State" id="text3"/>
                        </Col>
                        <Col md="6">
                          <InputField placeHolder="ZIP" id="text3"/>
                        </Col>

                        <Col name="sign-in-box" className={styles.partyLogin}>
                          <Col md="12">
                            <p className={styles.pText}>
                              Please create an account to place your order. Already a member?
                              <span>Log In here.</span>
                            </p>
                          </Col>
                          <Col md="12">
                            <InputField placeHolder="Your Name" id="text1"/>
                          </Col>
                          <Col md="12">
                            <InputField placeHolder="Email Address" id="text2"/>
                          </Col>
                          <Col md="12">
                            <InputField placeHolder="Password" id="text3"/>
                          </Col>
                        </Col>
                        
                    </Row>
                  </Col>
                  
                </Col>
                
                <Col md="6" name="billing-info">
                  <Col md="12" className={styles.cartCard}>
                    <Row className={styles.headerRow}>
                        <Col className={styles.cartTitle}>Billing Information</Col>
                    </Row>
                    <Row className={`${styles.headerRow}`}>
                      <Col md="12">
                        <InputField placeHolder="Name on the Card" id="text1"/>
                      </Col>
                      <Col md="12">
                        <InputField placeHolder="Card Number" id="text2"/>
                      </Col>
                      <Col md="12">
                        <InputField placeHolder="Another Name" id="text3"/>
                      </Col>
                      <Col md="6">
                        <InputField placeHolder="Expiry Date" id="text3"/>
                      </Col>
                      <Col md="6">
                        <InputField placeHolder="CVV" id="text3"/>
                      </Col>
                    </Row>
                  </Col>  
                </Col>

              </Row>

            </Col>

            <Col md="5" name="cart-total display">
              <OrderSummaryComponent iAgree={true}/>
            </Col>

          </Row>
        </div>

      </div>
    );
  }
}

Sample.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  router: PropTypes.object,
  pingMessage: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sample);
