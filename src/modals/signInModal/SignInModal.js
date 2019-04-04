import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import styles from './signInModal.scss';
import { imagePath } from '../../utils/assetUtils';
import * as actions from '../../reducers/session/actions';
import * as modalActions from '../../reducers/modal/actions';
import { Form, Button } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import SocialAuthComponent from '../../components/SocialAuth/SocialAuthComponent';


const mapStateToProps = state => ({
    message: state.session.message,
    error: state.session.error,
    apiStatus: state.session.apiStatus,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

const DisplayMode = {
    signIn: 'signIn',
    signUp: 'signUp'
}

class SignInModal extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.nameRef = React.createRef();
        this.phoneRef = React.createRef();

        this.state = {
            mode: DisplayMode.signIn,
            signIn: {
                email: null,
                password: null
            },
            signUp: {
                email: null,
                name: null,
                password: null,
                phoneno: null
            }
        };
    }

    closeModal = () => {
        this.props.close();
    }

    showSignUp = () => {
        this.props.dispatch(actions.clearErrors());
        this.setState({
            mode: DisplayMode.signUp,
            signIn: {
                email: null,
                password: null
            }
        });
    }

    showForgotPassword = () => {
        this.props.dispatch(actions.clearErrors());
        this.props.showForgotPassword();
        this.closeModal();
    }

    showSignIn = () => {
        this.props.dispatch(actions.clearErrors());
        this.setState({
            mode: DisplayMode.signIn,
            signUp: {
                email: null,
                name: null,
                password: null,
                phoneno: null
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps == undefined) {
            return false;
        }

        if (this.state.mode == DisplayMode.signUp && this.props.apiStatus == true) {
            this.props.dispatch(modalActions.showModal({message: `Successfully registered. A link to verify your email has been sent to your registered email address`, heading: 'Seven Vows'}));
        }
    }

    validateSignInForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let password = this.passwordRef.current.validateFormInput(document.getElementById('password'));

        if (email && password) {
            const params = {
                email: this.state.signIn.email,
                password: this.state.signIn.password
            }

            this.props.dispatch(actions.signInWithCredentail(params));
        }
    }

    validateSignUpForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let password = this.passwordRef.current.validateFormInput(document.getElementById('password'));
        let name = this.nameRef.current.validateFormInput(document.getElementById('name'));
        let phoneno = this.phoneRef.current.validateFormInput(document.getElementById('phoneno'));

        if (email && password && name && phoneno) {
            const details = {
                email: this.state.signUp.email,
                password: this.state.signUp.password,
                name: this.state.signUp.name,
                phoneno: this.state.signUp.phoneno
            }
            this.props.dispatch(actions.registerWithDetails(details));
        }
    }

    handleSignInFormChange = (e) => {
        this.setState({
            signIn: {
                ...this.state.signIn,
                [e.target.id]: e.target.value
            }
        });
    }

    handleSignUpFormChange = (e) => {
        this.setState({
            signUp: {
                ...this.state.signUp,
                [e.target.id]: e.target.value
            }
        });
    }

    handleSocialAuthResponse = (data) => {
        this.props.dispatch(actions.autheticateWithSocialData(data));
    }

    renderSignIn = () => {
        return this.state.mode == DisplayMode.signIn ?
            (<div>
                { this.props.apiStatus == false && this.props.error &&
                    <div className={styles.apiError}>{this.props.error}</div>
                }
                <Form style={{ zIndex: '10000' }} className="position-relative mt-1">
                    <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleSignInFormChange(e)} />
                    <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleSignInFormChange(e)}/>
                </Form>
                <div className={styles.formRow}>
                    <div>
                        <button className={styles.detailLink} onClick={this.showForgotPassword}>Forgot Password?</button>
                    </div>
                    <div className={styles.alignButton}><button className="primary-button" onClick={this.validateSignInForm}>Login</button></div>
                </div>
                <div className={styles.orLine}>
                    <span className={styles.line} ></span>
                    <span style={{ color: '#535353' }}>&nbsp; Or &nbsp;</span>
                    <span className={styles.line}></span>
                </div>
                <div className="text-center w-100 mt-5">
                    <p className={styles.pWith}>Login with</p>
                    <SocialAuthComponent onSuccess={data => this.handleSocialAuthResponse(data)}></SocialAuthComponent>
                    <button className={`${styles.detailLink} mt-5 pt-3 w-100`} onClick={this.showSignUp}>Create your Seven Vows account</button>
                </div>
            </div>) : null;
    }

    renderSignUp = () => {

        return this.state.mode == DisplayMode.signUp ?
            (<div>
                <div className={`${styles.footerText} ${styles.maxWidth} mb-3`}>
                    If you have a Seven Vows account please <span className={styles.bold}><Link to="/" className={styles.login} onClick={this.showSignIn}>Login</Link></span>
                </div>
                {this.props.apiStatus == false && this.props.error &&
                    <div className={styles.apiError}>{this.props.error}</div>
                }
                <Form style={{ zIndex: '10000' }} className="position-relative">
                    <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleSignUpFormChange(e)}/>
                    <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleSignUpFormChange(e)} />
                    <InputField placeHolder="Contact Number" id="phoneno" ref={this.phoneRef} type="tel" onChange={e => this.handleSignUpFormChange(e)}/>
                    <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleSignUpFormChange(e)}/>
                </Form>
                <div className="text-center">
                    <Button color="danger" className="primary-button" onClick={this.validateSignUpForm}>Create account</Button>
                </div>
                <div className={styles.orLine}>
                    <span className={styles.line} ></span>
                    <span style={{ color: '#535353' }}>&nbsp; Or &nbsp;</span>
                    <span className={styles.line}></span>
                </div>
                <div className="text-center mt-4" style={{ width: '100%' }}>
                    <p className={styles.pWith}>Sign up with</p>
                    <SocialAuthComponent onSuccess={data => this.handleSocialAuthResponse(data)}></SocialAuthComponent>
                </div>
                <div className={`${styles.footerText} mt-4`}>
                    By creating an account, you agree to our&nbsp;
                    <span>Terms of Service</span> and <span>Privacy Policy</span>.
                </div>
            </div>) : null;
    }

    render() {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <div className={styles.logoWrap}>
                        <img className={styles.image} src={imagePath('logo.svg')} alt="logo"></img>
                        <div className={styles.heading}>{this.state.mode === 'signIn' ? 'Login to the Account' : this.state.mode === 'signUp' ? 'Create an Account' : 'Forgot Password'}</div>
                    </div>
                    {this.renderSignIn()}
                    {this.renderSignUp()}
                </div>
                <div className={`${styles.loginBg}`}>
                </div>
            </div>
            
        );
    }
}

SignInModal.propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    close: PropTypes.func,
    showForgotPassword: PropTypes.func,
    message: PropTypes.string,
    apiStatus: PropTypes.bool,
    error: PropTypes.string,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInModal);