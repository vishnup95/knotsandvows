import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';

import {
  Jumbotron,
} from 'reactstrap';
import styles from './planningTool.scss';
import Form from './form';
import * as actions from './actions';

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.sample.categories,
  pingMessage: state.sample.pingMessage
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class PlanningTool extends Component {
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchCategories());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.dispatch(actions.fetchCategories());
    }
    this.props.dispatch(actions.ping({ ping: 'hello' }));
  }

  render() {
    return (
      <div>
        <div className={styles.planningTool}>
          <Jumbotron className="mb-0" style={{ backgroundImage: "url(" + imagePath('party_planning_bg.png') + ")" }}>
            <h1 className="text-center">Yes! Plan Your Party</h1>
            <hr className="mt-3 mb-5" />
            <div className={`${styles.formContainer} ${styles.center} mt-4`}>
              <div className="position-relative">
                <img src={imagePath('home_balloons.png')} alt="Balloons" className={styles.balloons} />
              </div>
              <p className={`${styles.center} mb-4 text-center`}>
                Please tell us a bit about your event
                so we can recommend the best services
            </p>
              <Form />
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

PlanningTool.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  router: PropTypes.object,
  pingMessage: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanningTool);
