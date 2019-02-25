import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExclusiveCard from './cardExclusive';
import CategoryCard from './cardCategory';
import PlainCard from './plainCard';

class CardComponent extends Component {

  renderCardBody() {
    switch(this.props.cardType) {
      case 'plain':
        return <PlainCard data={this.props.cardDetails}></PlainCard>;
      case 'detailed':
        return <ExclusiveCard data={this.props.cardDetails}/>
      case 'category':
        return <CategoryCard data={this.props.cardDetails}/>
    }
  }

  render() {
    return (
      <div>
        {this.renderCardBody()}
      </div>
    );
  }
}

CardComponent.propTypes = {
  cardType: PropTypes.string,
  cardDetails: PropTypes.object
};

export default CardComponent;
