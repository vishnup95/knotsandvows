import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styles from './resetPassword.scss';
import * as actions from '../../reducers/session/actions';
import * as modalActions from '../../reducers/modal/actions';
import { 
  Container, Button
} from 'reactstrap';
import queryString from 'query-string';
import InputField from '../../components/InputField/inputField';

const mapStateToProps = state => ({
  user: state.session.user,
  message: state.session.message,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

let hashValue = '';

class ResetPassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    error: ''
  }

  constructor(props) {
    super(props);
    this.newRef = React.createRef();
    this.confirmRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if(prevProps == undefined) {
        return false;
    }

    if (this.props.message !== prevProps.message) {
      this.props.dispatch(modalActions.showModal(this.props.message));
    }
}

  componentDidMount() {
    hashValue = queryString.parse(this.props.location.search).code;
  }

  handleInputChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }

  validatePasswordFields = () => {
    let newPassword = this.newRef.current.validateFormInput(document.getElementById('newPassword'));
    let confirmPassword = this.confirmRef.current.validateFormInput(document.getElementById('confirmPassword'));

    if (newPassword && confirmPassword && this.state.newPassword === this.state.confirmPassword) {
      const data = {
        hash: hashValue,
        password: this.state.newPassword
      }
      this.setState({error: ''});
      this.props.dispatch(actions.resetPassword(data));
    } else {
      this.setState({error: 'Password do not match!'});
    }
  }

  render() {
    return (
      <Container className={`${styles.container} pt-5 pb-5`}>
        <h1 className=" mb-5">Change Password</h1>
        <InputField placeHolder="New Password" id="newPassword" ref={this.newRef} type="password" onChange={e => this.handleInputChange(e)} />
        <InputField placeHolder="Confirm Password" id="confirmPassword" ref={this.confirmRef} type="password" onChange={e => this.handleInputChange(e)} />
        <Button color="danger" onClick={() => this.validatePasswordFields()}>Reset Password</Button>
        <div className="mt-5">{this.state.error}</div>
      </Container>
    );
  }
}

ResetPassword.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  message: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
