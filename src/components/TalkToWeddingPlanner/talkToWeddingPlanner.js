import React, { Component } from 'react';
import { Form } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import styles from './talkToWeddingPlanner.scss';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { imagePath, detectMobile } from '../../utils/assetUtils';
import * as modalActions from '../../reducers/modal/actions';
import { Modal } from 'reactstrap';
import ProgressButton from '../../components/ProgressButton/PorgressButton';

const mapStateToProps = state => ({
    message: state.talkToAhwanam.message,
    status: state.talkToAhwanam.status,
    isLoading: state.talkToAhwanam.loading
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class TalkToWeddingPlanner extends Component {

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();
        this.dateRef = React.createRef();
        this.timeRef = React.createRef();
        this.cityRef = React.createRef();
        this.commentsRef = React.createRef();
        this.state = {
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            comments: '',
            city:'',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.dispatch(actions.clearTalkToErrors());
    }
    handleFormChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    validateForm = () => {
        let name = this.nameRef.current.validateFormInput(document.getElementById('name'));
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let phone = this.phoneRef.current.validateFormInput(document.getElementById('phone'));
        let date = this.dateRef.current.validateFormInput(document.getElementById('date'));
        let time = this.timeRef.current.validateFormInput(document.getElementById('time'));
        let city = this.cityRef.current.validateFormInput(document.getElementById('city'));
        let comments = this.commentsRef.current.validateFormInput(document.getElementById('comments'));

        if (name && email && phone && date && time && city && comments) {
            const details = {
                origin:'CALL_BUTTON_FORM',
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                event_date: this.state.date,
                time: this.state.time,
                city: this.state.city,
                description: this.state.comments
            }
            this.props.dispatch(actions.postContactDetails(details));
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps == undefined) {
            return false;
        }

        if (this.props.message !== prevProps.message) {
            if (this.props.status === true) {
                this.setState({ modal: false });

                if (detectMobile()) {
                    this.props.dispatch(modalActions.showModal({ message: 'mobile_contact', heading: 'Talk to wedding planner' }));
                } else {
                    this.props.dispatch(modalActions.showModal({ message: 'We will contact you soon!', heading: 'Talk to wedding planner' }));
                }
            }
        }
    }
    componentWillMount() {
        this.props.dispatch(actions.clearTalkToErrors());
    }

    render() {
        return (
            <div>
                {this.props.type === 'link' && <button className="link-btn" onClick={() => this.toggle()}>{this.props.buttonText}</button>}
                {this.props.type === 'call' && <div className="call-btn" onClick={() => this.toggle()} aria-hidden >
                    <div className="pulsateRing"></div>
                    <img src={imagePath('button-call.png')} alt="call-button" />
                </div>}
                {this.props.type === '' && <button onClick={() => this.toggle()} className="primary-button">{this.props.buttonText}</button>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={styles.talkPopup}>
                    <img className={styles.closeBtn} src={imagePath('close-blank.svg')} alt="close button" aria-hidden onClick={() => this.toggle()} />
                    <div className={styles.loginForm}>

                        <div className={styles.logoWrap}>
                            <div className={styles.heading}>Talk to <br /> our wedding planner</div>
                        </div>
                        {this.props.status == false && this.props.message &&
                            <div className={styles.apiError}>{this.props.message}</div>
                        }
                        <Form className="position-relative">
                            <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Phone number" id="phone" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Your event date" id="date" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} required={false} />
                            <InputField placeHolder="Preferred time to contact" id="time" ref={this.timeRef} type="text" onChange={e => this.handleFormChange(e)} required={false} />
                            <InputField placeHolder="City" id="city" ref={this.cityRef} type="text" onChange={e => this.handleFormChange(e)} required={false} />
                            <InputField placeHolder="Comments" id="comments" ref={this.commentsRef} type="text" onChange={e => this.handleFormChange(e)} required={false} />
                        </Form>
                        <div className="text-center">
                            <ProgressButton title="Submit" onClick={() => this.validateForm()} isLoading={this.props.isLoading}></ProgressButton>
                            <p>Call sevenvows <a href="tel:+917702053510">+91 770 205 3510</a></p>

                        </div>
                    </div>

                </Modal>

            </div>

        );
    }
}

TalkToWeddingPlanner.propTypes = {
    dispatch: PropTypes.func,
    onclick: PropTypes.func,
    message: PropTypes.string,
    status: PropTypes.bool,
    buttonText: PropTypes.string,
    type: PropTypes.string,
    isLoading: PropTypes.bool

};
TalkToWeddingPlanner.defaultProps = {
    type: ''
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalkToWeddingPlanner);