import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// import {
//   Card,
//   CardImg,
//   CardBody,
//   CardTitle,
// } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from './card.scss';
import { imagePath } from '../../utils/assetUtils';
import {hyphonatedString} from '../../utils/utilities';

const mapDispatchToProps = dispatch => ({
  dispatch
});

class PlainCard extends Component {

  navigateTo(route) {
    this.props.dispatch(push(route));
    window.scrollTo(0, 0);
  }
  
  render() {
    let name = "";
    let imageUrl = "";
    let id = "";
    if (this.props.type == "ceremonies"){
      name = this.props.data.ceremony_name;
      imageUrl = this.props.data.thumb_image;
      id = this.props.data.ceremony_id;
    }else{
      name = this.props.data.name;
      imageUrl = this.props.data.image;
      id = this.props.data.category_id;
    }
    return (
      <div>
        <div className={`${styles.ceremonyCard} mb-5`} onClick={() => this.navigateTo(`/${this.props.type}/${hyphonatedString(name,id)}`)} aria-hidden>
          <img src={imageUrl}
            alt="Categories"
            onError={(e)=>{e.target.onerror = null; e.target.src=imagePath('card_2_1.jpg')}}
            className={styles.ceremonyIg}
            
          />
            <h3>{name}</h3>
        </div>
      </div>
    );
  }
}

PlainCard.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  type: PropTypes.string
};

PlainCard.defaultProps = {
  type:'categories'
}

export default connect(
  mapDispatchToProps
)(PlainCard);