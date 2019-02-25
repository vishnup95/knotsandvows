import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../home/actions';

import JumbotronComponent from '../../components/Jumbotron/jumbotron';

const jumbotronData = [
  {
      title: 'Need Help?',
      buttonText: 'Chat With Ahwanam',
      subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
  },
  {
      title: 'Exclusive Ahwanam Deals'
  }
];

const mapStateToProps = state => ({
  exclusives: state.home.exclusives
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class ExclusiveDeals extends Component {
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchExclusives());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchExclusives());
    }
  }

  render() {
    return(
      <div style={{marginTop:'6.0625rem'}}>
        <JumbotronComponent data={jumbotronData[1]} items={this.props.exclusives} bgcolor="#ffffff" cardType="detailed"/>
        <JumbotronComponent data={jumbotronData[0]} bgcolor="#f8f8f8"/>
      </div>
    );
  }
}

ExclusiveDeals.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  router: PropTypes.object,
  exclusives: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExclusiveDeals);
