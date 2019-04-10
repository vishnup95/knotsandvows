import InputField from '../../components/InputField/inputField';
import PropTypes from 'prop-types';
import styles from './myProfile.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../reducers/session/actions';
import { Form, Button } from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';


const jumbotronData = {
    title: 'Need Help?',
    buttonText: 'Talk to our wedding planner! ',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by clicking the Chat button below and they’ll help you get your party started.'
};

const mapStateToProps = state => ({
    user: state.session.user,
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
            email: this.emailRef.value
        };
    }

    componentWillMount() {

    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    validateMyProfileForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let name = this.nameRef.current.validateFormInput(document.getElementById('name'));
        let phoneno = this.phoneRef.current.validateFormInput(document.getElementById('phoneno'));

        if (email && name && phoneno) {
           console.log('Cool');
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
                        <Button className="primary-button" onClick={() => this.validateMyProfileForm()}>Update Changes</Button>
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
    actions: PropTypes.object,
    user: PropTypes.object,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyProfile);