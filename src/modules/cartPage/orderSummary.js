import React, {Component} from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import styles from './cartPage.scss';
import PropTypes from 'prop-types';

class OrderSummaryComponent extends Component {
    
    render() {
        const buttonText = this.props.iAgree ? 'place the order' : 'Get quote';
        return(
            <Col md="12" className={styles.cartCard}>
                <Row className={styles.headerRow}>
                    <Col className={styles.cartTitle}>Order Summary</Col>
                </Row>

                <Row className={styles.headerRow}>
                <Col md="12" className={`${styles.summaryText}`}>1 Item in Cart</Col>
                <Col md="12" className={`${styles.summaryText} text-uppercase`}>Payment Details</Col>
                <Col md="12" className={`${styles.summaryTextSub}`}>
                    <span className="float-left">Booking Amount</span> 
                    <span className="float-right">₹ 1,35,000.00 </span>  
                </Col>

                <Col md="12" className={`${styles.summaryTextSub}`}>
                    <span className="float-left">Price Dropped (10% Off)</span> 
                    <span className="float-right">- ₹ 1,35,00.00 </span>  
                </Col>

                <Col md="12" className={`${styles.summaryTextSub}`}>Promocode / Discount Coupon</Col>
                <Col md="12" className={`${styles.summaryTextSub} mt-2 mb-5`}>
                    <span className="float-left w-50">
                    <Input placeholder="CODE" className={styles.cartInput} />  
                    <Button color="danger" className= {`${styles.buttonSmall} d-inline-block`}>APPLY</Button>
                    </span> 
                    <span className="float-right">- ₹ 1,35,00.00</span>  
                </Col>
                    
                

                <Col md="12" className={`${styles.summaryTextSub}`}>
                    <span className="float-left">GST @20%</span> 
                    <span className="float-right">₹ 27,000.00 </span>  
                </Col>

                <Col md="12" className={`${styles.summaryTextSubTotal}`}>
                    <span className="float-left">Sub Total</span> 
                    <span className="float-right">₹ 1,08,000.00</span>  
                </Col>

                <Col md="12" className={`${styles.summaryTotal} mb-4`}>
                    <span className="float-left">
                    Payable Amount
                    <div className={styles.summaryTextSub} style={{lineHeight:'0', color: '#707070'}}>Inclusive of taxes</div>
                    </span> 
                    <span className="float-right">₹ 1,35,00.00</span>  
                </Col>
                </Row>

                <Row className={styles.headerRow}>
                <Col>
                    <div className="my-2 text-center">
                        <Button color="danger" className={styles.button}>{buttonText}</Button>
                    </div>
                    {this.props.iAgree && <p className={`${styles.summaryTextSub} mt-5`} style={{lineHeight: '1.7'}}>
                        By “clicking”, I confirm that I accept the Ahwanam Terms of Service 
                        and Privacy Policy and any additional terms included 
                        in the listing by the service providers.
                    </p>}
                </Col>
                </Row>
            </Col>
        );
    }
}

OrderSummaryComponent.propTypes = {
    iAgree: PropTypes.bool
};

export default OrderSummaryComponent;