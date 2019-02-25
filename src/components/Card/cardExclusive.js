import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CardText,
    CardTitle,
    Card,
    CardImg,
    CardBody,
    Button
  } from 'reactstrap';
import styles from './card.scss';
import { formatMoney, imagePath } from '../../utils/assetUtils';
class ExclusiveCard extends Component {
    
    constructor(props){
        super(props);
        this.launchLandingPage = this.launchLandingPage.bind(this);
    }

    launchLandingPage(){
       window.open(this.props.data.targetUrl,"_blank");
    }
    renderCardBody() {
        
        return(
            <div> 
                <CardTitle className={styles.cardTitle}>{this.props.data.name}</CardTitle>
                <CardText className={styles.cardText}>
                    {this.props.data.description}
                </CardText>

                <p className={styles.price}>
                    <span className={`mr-3 ${styles.priceNow}`}>{formatMoney(this.props.data.price.offer_price)}</span>
                    <strike style={{color:'red'}}>
                        <span className={`${styles.priceBefore}`}>{formatMoney(this.props.data.price.actual_price)}</span>
                    </strike>
                </p>

                <p className={styles.price}>
                    <span className={`mr-1 ${styles.priceBefore}`}>You Save: </span>
                    <span className={styles.priceNow}>₹{this.props.data.price.save_amount} ({this.props.data.price.save_percentage}% Off) </span>
                </p>

                <div className="text-center">
                    <Button color="secondary" className={styles.cardButton} onClick={this.launchLandingPage}>Get Quote</Button>
                </div>
                
            </div> 
        );
    }

    render() {
        
        return (
          <div>
            <Card className="mb-4" style={{backgroundColor: '#f7f7f7'}}>
              <CardImg
                top
                width="100%"
                src={this.props.data.imageUrl}
                alt="Exclusives"
                onError={(e)=>{e.target.onerror = null; e.target.src=imagePath('card_1_1.jpg')}}
                />
              <CardBody>
                {this.renderCardBody()}
              </CardBody>
            </Card>
          </div>
        );
      }
}

ExclusiveCard.propTypes = {
    data: PropTypes.object
};

export default ExclusiveCard;