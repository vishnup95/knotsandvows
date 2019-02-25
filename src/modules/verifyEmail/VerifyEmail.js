import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';

import styles from './verifyEmail.scss';
import * as actions from './actions';
import queryString from 'query-string';
import { replace } from 'connected-react-router';

const mapStateToProps = state => ({
  location: state.router.location,
  verified: state.verifyEmail.emailVerified
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class VerifyEmail extends Component {

  constructor(props){
    super(props);
    this.state = ({
        
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    
  }

  navigateTo(route) {
    this.props.dispatch(replace(route));
  }

  componentWillReceiveProps(nextProps){
    if (this.props.location.search != nextProps.location.search){
      console.log("receive Props "+nextProps.location);
      const values = queryString.parse(nextProps.location.search);
      console.log("Verify" +JSON.stringify(values));
      if (values.activation_code && values.email){
        console.log("Verify Email" +values.email);
        this.props.dispatch(actions.verifyEmail(values.activation_code, values.email));
      }else{
        this.navigateTo("/");
      }
    }
  }

  render() {
    return (
        <div>
          <div className={styles.headerSpace}></div>
          <div className="text-center">
            <div className="text-center">
              <img className={styles.image} src={imagePath('congrats.svg')} alt="congrats"></img>
            </div>
            <h1 className={`text-center ${styles.heading}`}>Email verified successfuly</h1>
            <div style={{ margin: '2rem' }}>
                <p className={`text-center ${styles.detail}`}>Login To continue<span className={styles.detailBold}></span></p>
            </div>
            {/* <Button color="danger" className={`text-center ${styles.button}`} onClick={this.toggle}>Login</Button> */}
          </div>
        </div>
    );
  }
}

VerifyEmail.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  verified : PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
