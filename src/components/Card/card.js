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
      case 'ceremonies':
        return <PlainCard data={this.props.cardDetails} type={this.props.cardType}></PlainCard>;
      case 'detailed':
        return <ExclusiveCard data={this.props.cardDetails}/>
      case 'category':
        return <CategoryCard data={this.props.cardDetails} category={this.props.category}/>
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
  cardDetails: PropTypes.object,
  category: PropTypes.string
};

export default CardComponent;
