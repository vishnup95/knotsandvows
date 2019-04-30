import React, { Component } from 'react';
import {
    Jumbotron,
    Row,
    Col,
    Button
} from 'reactstrap';
import CardComponent from '../../components/Card/card';
import PropTypes from 'prop-types';
import styles from './jumbotron.scss';
import TalkToWeddingPlanner from '../../components/TalkToWeddingPlanner/talkToWeddingPlanner';

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
                    this.props.isTalkToAhwanam === true ? <TalkToWeddingPlanner buttonText={buttonText}/> : <Button className="primary-button" onClick={this.props.buttonAction}>{buttonText}</Button>
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
                <p className={`w-75 mb-4 text-center ${styles.center} ${styles.pSmall}`}>
                    {subtitle}
                </p>
            );
        } else {
            return (
                <p className={`${styles.pLarge} ${styles.center} text-center mb-4`}>
                    {subtitle}
                </p>
            )
        }

    }

    renderCards = (cardType) => {
        if (!cardType || !this.props.items) {
            return <div></div>;
        }

        const cards = this.props.items.map((item, index) => {

            return <Col xs="12" sm="4" className="d-none d-sm-block" key={index}>
                <CardComponent cardDetails={item} cardType={cardType} category={this.props.category}/>
            </Col>
        });

        return <Row>{cards}</Row>;
    }

    render() {
        return (
            <div>
                <Jumbotron style={{ backgroundColor: this.props.bgcolor }} className="mb-0">
                    <div className={this.props.containerStyle != 'packageWrap' ? (this.props.containerStyle != 'carouselWrap' ? (this.props.containerStyle === 'otherWrap' ? styles.otherWrap : 'container') : styles.carouselWrap) : styles.packageWrap}>
                        <h2 className="text-center">{this.props.data.title}</h2>
                        {/* <hr className="mt-3 mb-5" /> */}
                        {this.renderSubtitle(this.props.data.subtitle)}
                        {this.props.insideContainer ?  this.props.children : ''}
                        {this.renderCards(this.props.cardType)}
                        {this.renderButton(this.props.data.buttonText)}
                    </div>
                    {!this.props.insideContainer ?  this.props.children : ''}
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
    category: PropTypes.string,
    insideContainer: PropTypes.bool,
    containerStyle: PropTypes.string
};

JumbotronComponent.defaultProps = {
    insideContainer: true
}

export default JumbotronComponent;