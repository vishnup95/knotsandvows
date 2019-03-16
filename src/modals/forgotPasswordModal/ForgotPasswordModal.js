import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../reducers/session/actions';
import * as modalActions from '../../reducers/modal/actions';
import { Form, Button } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import styles from './forgotPasswordModal.scss';

const mapStateToProps = state => ({
    message: state.session.message,
    apiStatus: state.session.apiStatus,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error:''
        };
    }

    closeModal = () => {
        this.props.close();
    }

    componentDidUpdate(prevProps) {
        if(prevProps == undefined) {
            return false;
        }
    
        if (this.props.apiStatus == true) {
            if (this.props.hash != null){
                this.props.dispatch(modalActions.showModal(`Password reseted successfully`));
            }else{
                this.props.dispatch(modalActions.showModal(`A link to reset your password has been sent to ${this.state.email} address`));
            }
        }
    }

    validateForm = () => {
        if (this.props.hash != null){
            let password = this.passwordRef.current.validateFormInput(document.getElementById('password'));
            let confirmPassword = this.confirmPasswordRef.current.validateFormInput(document.getElementById('confirmPassword'));
            if (password && confirmPassword && this.state.password === this.state.confirmPassword) {
                const data = {
                  hash: this.props.hash,
                  password: this.state.password
                }
                this.setState({error: ''});
                this.props.dispatch(actions.resetPassword(data));
              } else {
                this.setState({error: 'Password do not match!'});
              }
        }else{
            let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
            if (email) {
                const data = {
                    email: this.state.email
                }
                this.props.dispatch(actions.forgotPasswordRequest(data));
            }
        }
        
    }

    handleFormChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    }

    renderForgotPassword = () =>{
        return this.props.hash == null ?
        (<div className={styles.forgotPassword}>
            <div className={styles.header}>Reset Password</div>
            <div className="mt-5">{this.props.message}</div>
            <Form style={{ zIndex: '10000' }} className="position-relative">
                <InputField placeHolder="Email Address" id="email" type="email" ref={this.emailRef} onChange={e => this.handleFormChange(e)} />
            </Form>
            <div className="text-center mt-4">
                <Button color="danger" className="primary-button" onClick={this.validateForm}>Send</Button>
            </div>
        </div>) : null;
    }

    renderResetPassword = () =>{
        return this.props.hash != null ?
        (<div className={styles.forgotPassword}>
            <div className="text-center">Reset Password</div>
            <p className="text-center">You are resetting the password for ganesh@qburst.com</p>
            <p className="text-center">{this.props.message}</p>
            <Form style={{ zIndex: '10000' }} className="position-relative">
                <InputField placeHolder="New Password" id="password" type="password" ref={this.passwordRef} onChange={e => this.handleFormChange(e)} />
                <InputField placeHolder="Confirm password" id="confirmPassword" type="password" ref={this.confirmPasswordRef} onChange={e => this.handleFormChange(e)} />
            </Form>
            <div className="mt-5">{this.state.error}</div>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: "space-between" }}>
                {/* <span><Button color="danger" className={`${styles.button} ${styles.forgotButton}`} onClick={this.showSignIn}>CANCEL</Button></span> */}
                <span><Button color="danger" className={`${styles.button} ${styles.forgotButton}`} onClick={this.validateForm}>Reset</Button></span>
            </div>
        </div>) : null;
    }

    render() {
        return (
            <div>
                {this.renderForgotPassword()}
                {this.renderResetPassword()}
            </div>
        
        );
    }
}

ForgotPassword.propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    hash: PropTypes.string,
    email: PropTypes.string,
    close: PropTypes.func,
    message: PropTypes.string,
    apiStatus: PropTypes.object,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ForgotPassword);