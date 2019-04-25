import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './goldPackage.scss';
// import { Link } from 'react-router-dom';
// import { imagePath } from '../../../utils/assetUtils';
import * as actions from '../../../components/TalkToWeddingPlanner/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as talkToPlannerActions from '../../components/TalkToWeddingPlanner/actions';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class GoldPackage extends Component {
  constructor(props) {
    super(props);
  }

  sendDetailsToWeddingPlanner() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let date = document.getElementById('date').value;
    let city = document.getElementById('city').value;
    let comments = document.getElementById('comments').value;

    if (name || email || phone || date || city || comments) {
      const params = {};
      params['origin'] = 'GOLD_PACKAGE';
      params['name'] = name;
      params['email'] = email;
      params['phone'] = phone;
      params['date'] = date;
      params['city'] = city;
      params['comments'] = comments;
      this.props.dispatch(actions.postContactDetails(params));
    }
  }
  render() {
    return (
      <div className={styles.goldPackage}>
        <div className="col-md-6 contact-wrap">
          <div className="contact-form">
            <h5>Contact Us</h5>
            <form action="">
              <input maxLength="75" type="text" name="name" id="name" placeholder="Name" />
              <input maxLength="75" type="email" name="email" id="email" placeholder="Email" />
              <input pattern="[0-9]*" required maxLength="10" type="Number" name="phone" id="phone" placeholder="Phone" />
              <input type="date" name="date" id="date" placeholder="Eg: 18-12-2018" />
              <input maxLength="50" type="text" name="city" id="city" placeholder="City" />
              <textarea maxLength="200" name="comments" id="comments" rows="5" placeholder="Additional comments about the wedding"></textarea>
            </form>
            <input type="submit" value="Get Quote" className="get-package" onClick={() => this.sendDetailsToWeddingPlanner()} />

          </div>
          <div className="bottom-corner-contact"></div>
        </div>
      </div>
    );
  }
}

GoldPackage.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapDispatchToProps
)(GoldPackage);