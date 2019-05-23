import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styles from './socialAuthComponent.scss';
import * as actions from './actions';
import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';



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
                // console.log(response.error);
            }
        }
// temporarily removed
        // const responseFacebook = (response) => {
        //     if (response && response.accessToken){
        //         this.signIn(response.accessToken,"facebook");
        //     }else{
        //         // console.log(response);
        //     }
        // }

        return (
            <div>
               <div className={`${styles.socialBtnWrap} text-center w-100`}>
                        {/* temporarily removed
                        <FacebookLogin
                            appId={process.env.FACEBOOK_APP_ID}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            disableMobileRedirect={true}
                            render={renderProps => (
                                <Button color="primary" name="facebook" className={styles.authButton} onClick={renderProps.onClick}>
                                    <span className={styles.fbimage}></span>
                                    <span>Facebook</span>
                                </Button>
                            )}
                        /> */}
                        <GoogleLogin
                            clientId={process.env.GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <Button  name="google" onClick={renderProps.onClick} className={`${styles.authButton} ${styles.googleButton} mt-3` }>
                                    <span className={styles.gmimage}></span>
                                    <span>Google</span>
                                </Button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            onClick={()=>{if(window!=null) window.gtag_report_conversion()}}
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