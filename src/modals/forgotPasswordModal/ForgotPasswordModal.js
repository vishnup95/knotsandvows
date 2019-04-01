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
            let heading = 'Reset Password';
            if (this.props.hash != null){
                this.props.dispatch(modalActions.showModal({message: 'Password changed successfully', heading}));
            }else{
                this.props.dispatch(modalActions.showModal({message: `A link to reset your password has been sent to ${this.state.email} address`, heading}));
            }
        }
    }

    validateForm = () => {
        if (this.props.hash != null){
            let password = this.passwordRef.current.validateFormInput(document.getElementById('password'));
            let confirmPassword = this.confirmPasswordRef.current.validateFormInput(document.getElementById('confirmPassword'));
            if (password && confirmPassword){
               if(this.state.password === this.state.confirmPassword) {
                const data = {
                  hash: this.props.hash,
                  password: this.state.password
                }
                this.setState({error: ''});
                this.props.dispatch(actions.resetPassword(data));
              } else {
                this.setState({error: 'Passwords does not match!'});
              }
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
        if (!this.state.password || !this.state.email) {
            this.setState({error:''})
        }
    }

    renderForgotPassword = () =>{
        return this.props.hash == null ?
        (<div className={styles.forgotPassword}>
            <div className={styles.header}>Forgot Password</div>
            <Form className="position-relative">
                <InputField placeHolder="Email Address" id="email" type="email" ref={this.emailRef} onChange={e => this.handleFormChange(e)} />
            </Form>
            <div className="text-center mt-4">
                <Button color="danger" className="primary-button" onClick={this.validateForm}>Send</Button>
                <div className={styles.error}>{this.props.message}</div>
            </div>
        </div>) : null;
    }

    renderResetPassword = () =>{
        return this.props.hash != null ?
        (<div className={styles.forgotPassword}>
            <div className={styles.header}>Reset Password</div>
            <div className={styles.message}>You are resetting the password for {this.props.email}</div>
            <Form className="position-relative mt-3">
                <InputField placeHolder="New Password" id="password" type="password" ref={this.passwordRef} onChange={e => this.handleFormChange(e)} />
                <InputField placeHolder="Confirm password" id="confirmPassword" type="password" ref={this.confirmPasswordRef} onChange={e => this.handleFormChange(e)} />
            </Form>
            
            <div className="text-center mt-4 position-relative">
                <Button color="danger" className="primary-button" onClick={this.validateForm}>Reset</Button>
                <div className={styles.error}>{this.state.error}</div>
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