import InputField from '../../components/InputField/inputField';
import PropTypes from 'prop-types';
// import styles from './myProfile.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../reducers/session/actions';
// import * as modalActions from '../../reducers/modal/actions';
import { Form, Button } from 'reactstrap';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';


const jumbotronData = {
    title: 'Need Help?',
    buttonText: 'Talk to our wedding planner! ',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
};


const mapStateToProps = state => ({
    user: state.session.user,
    message: state.session.message,
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
        this.state = {
            name: null,
            phoneno: null
        };
    }

    componentWillMount() {

    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {

        return (
            <div>
            <div className="text-center" style={{ zIndex: '10000', width: '30%', marginTop:"100px"}}>
                {/* {this.props.user && */}
                <div>My Profile</div>
                    <div>
                        <Form>
                            <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} pattern="^[a-zA-Z_ ]*$" />
                            <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} disabled={true}  />
                            <InputField placeHolder="Contact Number" id="phoneno" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} pattern="[0-9]{10}" />
                            {/* <InputField placeHolder="Password" id="password" ref={this.passwordRef} type="password" onChange={e => this.handleFormChange(e)} pattern="[A-Za-z0-9]{5,}" /> */}
                        </Form>
                        <div className="text-center">
                            <Button className="primary-button" onClick={this.validateSignUpForm}>Update Changes</Button>
                        </div>
                    </div>
                {/* } */}
                
            </div>
            <JumbotronComponent  data={jumbotronData} bgcolor="#f8f8f8" isTalkToAhwanam={true} containerStyle="otherWrap"/>
            </div>
        );
    }
}

MyProfile.propTypes = {
    dispatch: PropTypes.func,
    actions: PropTypes.object,
    user: PropTypes.object,
    message: PropTypes.string,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyProfile);