import React, { Component } from 'react';
import {
    Jumbotron,
    Row,
    Col,
    Button
} from 'reactstrap';
import CardComponent from '../../components/Card/card';
import PropTypes from 'prop-types';
// import { imagePath } from '../../utils/assetUtils';
import styles from './jumbotron.scss';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';


// const cardDetail = {
//   title: "Gold Package",
//   description:  "The Gold Package is designed to be all inclusive. It covers everything couples could possibly need on your wedding day, from a resident pianist to entertain your guests on arrival, a bridal suite and two guest rooms for the wedding night",
//   buttonText: "Get Quote",
//   priceNow: "₹1,600,000",
//   priceBefore: "₹1,840,000",
//   save: "₹2.4 Lacks (15% Off)"
// }

//  const mapArray = [1,2,3];

class JumbotronComponent extends Component {
    constructor(props) {
        super(props);
    }

    renderButton = (buttonText) => {
        if (!buttonText) {
            return <div></div>;
        }

        return (
            <div className="mt-5 text-center">
                {
                    this.props.isTalkToAhwanam === true ? <TalkToWeddingPlanner buttonText={buttonText}/> : <Button color="danger" className={styles.button} onClick={this.props.buttonAction}>{buttonText}</Button>
                }
            </div>
        );
    }

    renderSubtitle = (subtitle) => {
        if (!subtitle) {
            return <div></div>;
        }

        if (this.props.cardType) {
            return (
                <p className={`w-75 mb-5 text-center ${styles.center} ${styles.pSmall}`}>
                    {subtitle}
                </p>
            );
        } else {
            return (
                <p className={`${styles.pLarge} ${styles.center} col-md-6 text-center`}>
                    {subtitle}
                </p>
            )
        }

    }

    renderCards = (cardType) => {
        if (!cardType || !this.props.items || this.props.children) {
            return <div></div>;
        }

        const cards = this.props.items.map((item, index) => {

            return <Col xs="12" sm="4" key={index}>
                <CardComponent cardDetails={item} cardType={cardType} category={this.props.category}/>
            </Col>
        });

        return <Row>{cards}</Row>;
    }

    render() {
        return (
            <div>
                <Jumbotron style={{ backgroundColor: this.props.bgcolor }} className="mb-0">
                    <div className="container">
                        <h1 className="text-center">{this.props.data.title}</h1>
                        <hr className="mt-3 mb-5" />
                        {this.renderSubtitle(this.props.data.subtitle)}
                        {this.props.children}
                        {this.renderCards(this.props.cardType)}
                        {this.renderButton(this.props.data.buttonText)}
                    </div>
                </Jumbotron>
            </div>
        );
    }

}

JumbotronComponent.propTypes = {
    data: PropTypes.object,
    bgcolor: PropTypes.string,
    cardType: PropTypes.string,
    buttonAction: PropTypes.func,
    items: PropTypes.array,
    children: PropTypes.node,
    isTalkToAhwanam: PropTypes.bool,
    category: PropTypes.string
};

export default JumbotronComponent;