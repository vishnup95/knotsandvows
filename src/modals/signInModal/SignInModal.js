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
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

const DisplayMode = {
    signIn: 'signIn',
    signUp: 'signUp',
    forgotPassword: 'forgotPassword'
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
            },
            forgotPassword: {
                email: null
            }
        };
    }

    closeModal = () => {
        this.props.close();
    }

    showSignUp = () => {
        this.setState({
            mode: DisplayMode.signUp,
            signIn: {
                email: null,
                password: null
            },
            forgotPassword: {
                email: null
            }
        });
    }

    showForgotPassword = () => {
        this.setState({
            mode: DisplayMode.forgotPassword,
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
        });
    }

    showSignIn = () => {
        this.setState({
            mode: DisplayMode.signIn,
            signUp: {
                email: null,
                name: null,
                password: null,
                phoneno: null
            },
            forgotPassword: {
                email: null
            }
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps == undefined) {
            return false;
        }
    
        if (this.props.message != prevProps.message) {
          this.props.dispatch(modalActions.showModal(this.props.message));
        }
    }

    validateSignInForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let password = this.passwordRef.current.validateFormInput(document.getElementById('password'));

        if (email && password) {
            const params = {
                email:this.state.signIn.email,
                password:this.state.signIn.password
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

    validateForgotPasswordForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));

        if (email) {
            const data = {
                email: this.state.forgotPassword.email
            }
            this.props.dispatch(actions.forgotPasswordRequest(data));
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

    handleForgotPassordFormChange = (e) => {
        this.setState({
            forgotPassword: {
                ...this.state.forgotPassword,
                [e.target.id]: e.target.value
            }
        });
    }

    handleSocialAuthResponse = (data) =>{
        this.props.dispatch(actions.autheticateWithSocialData(data));
    }

    renderSignIn = () => {
        return this.state.mode == DisplayMode.signIn ?
            (<div>
                <Form style={{ zIndex: '10000' }} className="position-relative">
                    <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleSignInFormChange(e)}/>
                    <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleSignInFormChange(e)} pattern="[A-Za-z0-9]{5,}" />
                </Form>
                <div className={styles.formRow}>
                    <div>
                        <button className={styles.detailLink} onClick={this.showForgotPassword}>Forgot Password?</button>
                    </div>
                    <div className={styles.alignButton}><button className="primary-button" onClick={this.validateSignInForm}>Sign in</button></div>
                </div>
                <div className={styles.orLine}>
                    <span className={styles.line} ></span>
                    <span style={{ color: '#535353' }}>&nbsp; Or &nbsp;</span>
                    <span className={styles.line}></span>
                </div>
                <div className="text-center w-100 mt-5">
                    <p className={styles.pWith}>Sign in with</p>
                    <SocialAuthComponent onSuccess={data => this.handleSocialAuthResponse(data)}></SocialAuthComponent>
                    <button className={`${styles.detailLink} mt-5 pt-3 w-100`} onClick={this.showSignUp}>Create your Seven Vows account</button>
                </div>
            </div>) : null;
    }

    renderSignUp = () => {

        return this.state.mode == DisplayMode.signUp ?
            (<div>
                <div className={`${styles.footerText} ${styles.maxWidth} mb-3`}>
                    If you have a Seven Vows account please <span className={styles.bold}><Link to="/" className={styles.login} onClick={this.showSignIn}>Sign in</Link></span>
                </div>
                <Form style={{ zIndex: '10000' }} className="position-relative">
                    <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleSignUpFormChange(e)} pattern="^[a-zA-Z_ ]*$"/>
                    <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleSignUpFormChange(e)} />
                    <InputField placeHolder="Contact Number" id="phoneno" ref={this.phoneRef} type="tel" onChange={e => this.handleSignUpFormChange(e)} pattern="[0-9]{10}"/>
                    <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleSignUpFormChange(e)} pattern="[A-Za-z0-9]{5,}"/>
                </Form>
                <div className="text-center">
                    <Button color="danger" className="primary-button" onClick={this.validateSignUpForm}>Create account</Button>
                </div>
                <div className={styles.orLine}>
                    <span className={styles.line} ></span>
                    <span style={{ color: '#535353' }}>&nbsp; Or &nbsp;</span>
                    <span className={styles.line}></span>
                </div>
                <div className="text-center mt-5" style={{ width: '100%' }}>
                    <p className={styles.pWith}>Sign up with</p>
                    <SocialAuthComponent onSuccess={data => this.handleSocialAuthResponse(data)}></SocialAuthComponent>
                </div>
                <div className={`${styles.footerText} mt-4`}>
                    By creating an account, you agree to our&nbsp;
                    <span>Terms of Service</span> and <span>Privacy Policy</span>.
                </div>
            </div>) : null;
    }

    renderForgotPassword = () => {
        return this.state.mode == DisplayMode.forgotPassword ?
            (<div>
                <Form style={{ zIndex: '10000' }} className="position-relative">
                    <InputField placeHolder="Email Address" id="email" type="email" ref={this.emailRef} onChange={e => this.handleForgotPassordFormChange(e)} />
                </Form>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: "space-between" }}>
                    <span><Button className="primary-button" onClick={this.showSignIn}>CANCEL</Button></span>
                    <span><Button className="primary-button" onClick={this.validateForgotPasswordForm}>RESET PASSWORD</Button></span>
                </div>

                <div className={`${styles.footerText} mt-4 mb-3`}>
                    If You Have an Ahwanam Account Please&nbsp;
                    <span><Link className={styles.login} to="/" onClick={this.showSignIn}>Login</Link></span>.
                </div>
            </div>) : null;
    }

    render() {
        return (
            <div className={styles.loginContainer}>
                <div className={styles.loginForm}>
                    <div className={styles.logoWrap}>
                        <img className={styles.image} src={imagePath('logo.jpg')} alt="logo"></img>
                        <div className={styles.heading}>{this.state.mode === 'signIn' ? 'Sign in to Seven Vows' : this.state.mode === 'signUp' ? 'Create a Seven Vows account' : 'Forgot Password'}</div>
                    </div>
                    {this.renderSignIn()}
                    {this.renderSignUp()}
                    {this.renderForgotPassword()}
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
    message: PropTypes.string,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignInModal);