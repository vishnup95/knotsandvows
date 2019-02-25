import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styles from './socialAuthComponent.scss';
import * as actions from './actions';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const mapStateToProps = state => ({
    user: state.session.user,
    categories: state.sample.categories,
    pingMessage: state.sample.pingMessage
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class SocialAuthComponent extends Component {

    constructor(props) {
        super(props);
       
    }

    signIn = (access_token, type) => {
        let data = {
            "access_token": access_token,
            "auth_type": type
        }
        this.props.onSuccess(data);
    }

    render() {

        const responseGoogle = (response) => {
            if (response && response.accessToken){
                this.signIn(response.accessToken,"google");
            }else{
                console.log(response.error);
            }
        }

        const responseFacebook = (response) => {
            if (response && response.accessToken){
                this.signIn(response.accessToken,"facebook");
            }else{
                console.log(response);
            }
        }

        return (
            <div>
               <div className={`${styles.socialBtnWrap} text-center w-100`}>
                        <FacebookLogin
                            appId="2249060602088158"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            render={renderProps => (
                                <Button color="primary" name="facebook" className={styles.authButton} onClick={renderProps.onClick}>
                                    Sign up With Facebook
                                </Button>
                            )}
                        />
                        <GoogleLogin
                            clientId="1085846553127-ano2e37t3a3jrtm9k19a588v63grvrfp.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button  name="google" onClick={renderProps.onClick} className={`${styles.authButton} ${styles.googleButton} mt-3` }>
                                    Sign up With Google
                                </Button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        ></GoogleLogin>
                    </div>
                </div>
        );
    }
}

SocialAuthComponent.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    onFailure: PropTypes.func,
    onSuccess: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SocialAuthComponent);