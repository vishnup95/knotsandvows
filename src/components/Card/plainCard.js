import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './card.scss';
import { imagePath } from '../../utils/assetUtils';

const mapDispatchToProps = dispatch => ({
  dispatch
});

class PlainCard extends Component {

  navigateTo(route) {
    this.props.dispatch(push(route));
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div>
        <Card className="mb-5" style={{backgroundColor: '#ffffff'}} onClick={() => this.navigateTo(`/categories/${this.props.data.page_name}`)}>
          <CardImg
            top
            width="100%"
            src={this.props.data.image}
            alt="Categories"
            onError={(e)=>{e.target.onerror = null; e.target.src=imagePath('card_2_1.jpg')}}
          />
          <CardBody>
            <CardTitle className={styles.cardTitleSimple}>{this.props.data.name}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

PlainCard.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapDispatchToProps
)(PlainCard);