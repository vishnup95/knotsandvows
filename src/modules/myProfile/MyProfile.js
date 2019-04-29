import InputField from '../../components/InputField/inputField';
import PropTypes from 'prop-types';
import styles from './myProfile.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../reducers/session/actions';
import { Form } from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import ProgressButton from '../../components/ProgressButton/PorgressButton';
import * as modalActions from '../../reducers/modal/actions';

const jumbotronData = {
    title: 'Need Help?',
    buttonText: 'Talk to our experts! ',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by clicking the Chat button below and they’ll help you get your party started.'
};

const mapStateToProps = state => ({
    user: state.session.user,
    isLoading : state.session.loading,
    error : state.session.error,
    apiStatus : state.session.apiStatus

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.nameRef = React.createRef();
        this.phoneRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            name: this.nameRef.value,
            phoneno: this.phoneRef.value,
        };
    }

    componentWillMount() {
        if (this.props.user){
            this.setState({name: this.props.user.name , phoneno: this.props.user.phoneno});
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    componentDidUpdate(prevProps){
        if (this.props.user != prevProps.user){
            this.setState({name: this.props.user.name , phoneno: this.props.user.phoneno});
        }
        if ((this.props.apiStatus != prevProps.apiStatus) && this.props.apiStatus == true){
            let modalContent = {
                heading: '',
                message: "Update successful!",
                type: 'success'
              };
            this.props.dispatch(modalActions.showModal(modalContent));
        }
    }

    validateMyProfileForm = () => {
       
        let name = this.nameRef.current.validateFormInput(document.getElementById('name'));
        let phoneno = this.phoneRef.current.validateFormInput(document.getElementById('phoneno'));
        if (name && phoneno) {
            const params = {
                name: this.state.name,
                phoneno: this.state.phoneno
            }
            this.props.dispatch(actions.updateProfile(params));
        }
    }

    render() {
        return (
            <div>
                {this.props.user &&
            <div className={styles.profileContainer}>
                <h1 className="mb-5 text-center">My Profile</h1>
                <div>
                    <Form>
                        <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} value={this.props.user.name}/>
                        <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} value={this.props.user.email} disabled={true}/>
                        <InputField placeHolder="Contact Number" id="phoneno" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} value={this.props.user.phoneno}/>
                        <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleFormChange(e)} value="samplepassword" disabled={true}/>
                    </Form>
                    <div className="text-center mt-4">
                        <ProgressButton className="primary-button" onClick={() => this.validateMyProfileForm()} title="Update Changes" isLoading={this.props.isLoading}></ProgressButton>
                        <div className={styles.error}>{this.props.error}</div>
                    </div>
                </div>
            </div>
                }
            <JumbotronComponent  data={jumbotronData} bgcolor="#f8f8f8" isTalkToAhwanam={true} containerStyle="otherWrap"/>
            </div>
        );
    }
}

MyProfile.propTypes = {
    dispatch: PropTypes.func,
    isLoading: PropTypes.bool,
    user: PropTypes.object,
    apiStatus : PropTypes.object,
    error : PropTypes.string
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyProfile);