import React, { Component } from 'react';
import { Row, Col, Label } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import styles from './talkToWeddingPlanner.scss';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import * as modalActions from '../../reducers/modal/actions';
import { Modal } from 'reactstrap';
import ProgressButton from '../../components/ProgressButton/PorgressButton';
import DatePicker from "react-datepicker";

const mapStateToProps = state => ({
    message: state.talkToAhwanam.message,
    status: state.talkToAhwanam.status,
    isLoading: state.talkToAhwanam.loading,
    showPlanner: state.talkToAhwanam.showPlanner
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

const minDate = new Date(Date.now());
var date = new Date();
//Max date is set to 4 years from today date.
const maxDate = date.setDate(date.getDate() + 1456);

class TalkToWeddingPlanner extends Component {

    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.phoneRef = React.createRef();
        this.dateRef = React.createRef();
        this.cityRef = React.createRef();
        this.commentsRef = React.createRef();
        this.state = {
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            contactDate: '',
            comments: '',
            city: '',
            modal: false,
            servicesModal: false,
            checkboxes: [
                { label: 'Get inspired', checked: false },
                { label: 'Vendor services', checked: false },
                { label: 'Ceremony Day services', checked: false },
                { label: 'All services', checked: false },
                { label: `I'm not sure`, checked: false },
            ]
        }
        this.toggle = this.toggle.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange = (date) => {

        if (date != null) {
            var calendarDate = new Date(date.toString().split(' ')[2] + '/' + date.toString().split(' ')[1] + '/' + date.toString().split(' ')[3]);
            var todayDate = new Date(minDate.toString().split(' ')[2] + "/" + minDate.toString().split(' ')[1] + "/" + minDate.toString().split(' ')[3]);
            var afterFourYearDate = new Date(maxDate.toString().split(' ')[2] + "/" + maxDate.toString().split(' ')[1] + "/" + maxDate.toString().split(' ')[3]);

            if (calendarDate < todayDate || afterFourYearDate > calendarDate) {
                document.getElementById('contactDate').value = '';
                this.setState({ date: '' });
                return false;
            }
        }

        document.getElementById('contactDate').focus();
        this.setState({
            contactDate: date
        });
    }

    componentWillUnmount() {
        this.setState({ city: '' })
    }

    componentWillReceiveProps() {
        if ( this.props.showPlanner) {
            this.setState({modal: true})
        }
    }

    toggle() {
        if (this.state.modal) {
            this.props.dispatch(actions.hidePlanner());
        }
        
        this.setState(prevState => ({
            modal: !prevState.modal,
            contactDate: ''
        }));

        this.props.dispatch(actions.clearTalkToErrors());
        if (window != null)
            return window.gtag_report_conversion()
    }

    handleFormChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        this.props.dispatch(actions.clearTalkToErrors());
    }

    validateForm = () => {
        // let name = this.nameRef.current.validateFormInput(document.getElementById('contactName'));
        let email = this.emailRef.current.validateFormInput(document.getElementById('contactEmail'));
        let phone = this.phoneRef.current.validateFormInput(document.getElementById('contactPhone'));
        //let date = this.dateRef.current.validateFormInput(document.getElementById('contactDate'));
        // let date = this.state.contactDate;
        // let city = this.cityRef.current.validateFormInput(document.getElementById('city'));

        if (email && phone) {
            const details = {
                origin: 'CALL_BUTTON_FORM',
                name: this.state.contactName,
                phone: this.state.contactPhone,
                email: this.state.contactEmail,
                city: this.state.city,
            }
            if (this.state.contactDate != '') {
                details.event_date = this.state.contactDate
            }


            if (this.props.type !== 'services') {
                details['description'] = this.state.comments
            } else {
                let services = [];
                this.state.checkboxes.map((item, index) => { if (index !== 4 && item.checked) services.push(item.label) });
                details['services'] = services;
            }

            this.props.dispatch(actions.postContactDetails(details));
        }
        if (window != null)
            return window.gtag_report_conversion()
    }

    // handling services modal 

    toggleServicesModal() {
        this.setState(prevState => ({
            servicesModal: !prevState.servicesModal
        }));
        this.props.dispatch(actions.clearTalkToErrors());
    }

    handleCheckbox(event, checkIndex) {
        // index = 3 => 'All', index = 4 => 'None'
        if (checkIndex === 3) {
            this.setState({ checkboxes: this.state.checkboxes.map((item, index) => index <= checkIndex ? { ...item, checked: event.target.checked } : { ...item, checked: false }) });
        } else if (checkIndex === 4) {
            this.setState({ checkboxes: this.state.checkboxes.map((item, index) => index < checkIndex ? { ...item, checked: false } : { ...item, checked: event.target.checked }) });
        } else {
            this.setState({ checkboxes: this.state.checkboxes.map((item, index) => index === checkIndex ? { ...item, checked: event.target.checked } : ((index === 4 || index === 3) ? { ...item, checked: false } : item)) });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps == undefined) {
            return false;
        }
        if (this.props.status != prevProps.status && this.props.status === true) {
            this.props.dispatch(modalActions.showModal({ message: 'Our wedding consultant will get in touch with you within 24 hours.', heading: 'We are on it!', type: 'success' }));
            this.setState({ modal: false });
        }
    }
    handlePulsateRing() {
        if (window != null)
            return window.gtag_report_conversion()
    }
    render() {
        return (
            <div className={`${this.props.type != 'services' ? 'justify-center' : ''} flex`}>
                {this.props.type === 'link' && styles.footerLink && <button className={`${this.props.origin === 'footer' ? styles.footerLink : 's'} link-btn`} onClick={() => this.toggle()}>{this.props.buttonText}</button>}
                {this.props.type === 'call' && <div className="call-btn" onClick={() => this.toggle()} aria-hidden >
                    <div className="pulsateRing"></div>
                    <div className={styles.callBtnImg} role="button" tabIndex="0" onClick={() => this.handlePulsateRing} onKeyDown={() => this.handlePulsateRing}></div>
                    {/* <img src={imagePath('button-call.png')} alt="call-button" /> */}
                </div>}
                {this.props.type === '' && <button onClick={() => this.toggle()} className={`${this.props.buttonColor === 'white' ? 'white' : ''} primary-button home-btn medium-pink`}>{this.props.buttonText}</button>}
                {this.props.type === 'services' && <button onClick={() => this.toggleServicesModal()} className={`${this.props.buttonColor === 'white' ? 'white' : ''} primary-button home-btn medium-pink`}>{this.props.buttonText}</button>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={styles.talkPopup}>
                    <div className={styles.closeBtnSmall} onClick={() => this.toggle()} aria-hidden>
                        <img src={imagePath('close-blank.svg')} alt="close button" />
                    </div>
                    <div className={styles.loginForm}>
                        <img src={imagePath('planner.png')} alt="planner" />
                        <div className={styles.logoWrap}>
                            <div className={styles.heading}>Hi, My name is Nivita.</div>
                            {/* <div className={styles.mainHeading}>Congratulations!</div> */}
                            <div className={styles.heading}>Thank you for making us a part of your big day. Tell us a little bit more about the event.</div>
                        </div>
                        <Row className="position-relative">
                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Full Name" id="contactName" ref={this.nameRef} type="text" tabindex="-6" onChange={e => this.handleFormChange(e)} withBorder={true} required={false} />
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Email" id="contactEmail" ref={this.emailRef} type="email" tabIndex="-5" onChange={e => this.handleFormChange(e)} withBorder={true} />
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Phone" id="contactPhone" ref={this.phoneRef} type="tel" tabIndex="-4" onChange={e => this.handleFormChange(e)} withBorder={true} />
                            </Col>

                            <Col md="6" xs="6">
                                {/* <InputField maxLength="50" placeHolder="Event date" id="contactDate" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} required={false} withBorder={true}/> */}

                                <DatePicker
                                    selected={this.state.contactDate}
                                    onChange={e => this.handleDateChange(e)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Event date"
                                    id="contactDate"
                                    ref={this.dateRef}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    tabindex="-3"
                                />

                            </Col>

                            <Col md="6" xs="6">
                                <InputField maxLength="50" placeHolder="City" id="city" tabIndex="-2" ref={this.cityRef} type="text" onChange={e => this.handleFormChange(e)} required={false} withBorder={true} />
                            </Col>

                            <Col md="12">
                                <InputField maxLength="200" placeHolder="Comments" id="comments" tabIndex="-1" ref={this.commentsRef} type="text" onChange={e => this.handleFormChange(e)} required={false} withBorder={true} />
                            </Col>
                        </Row>

                        {this.props.status == false && this.props.message &&
                            <div className={styles.apiError}>{this.props.message}</div>
                        }
                        <div className="text-center">
                            <ProgressButton title="Send Message" onClick={() => { this.validateForm(); if (window != null) return window.gtag_report_conversion(); }} isLoading={this.props.isLoading}></ProgressButton>
                            <p className={styles.phone}>
                                <img src={imagePath('button-call.png')} alt="call-button" />
                                <a href="tel:+917032188007">+91 703 218 8007</a>
                                <span>+91 703 218 8007</span>
                            </p>
                        </div>
                    </div>
                </Modal>

                {/* services modal */}

                <Modal isOpen={this.state.servicesModal} toggle={() => this.toggleServicesModal()} centered={true} className={styles.talkPopup}>
                    <div className={styles.closeBtnSmall} onClick={() => this.toggleServicesModal()} aria-hidden>
                        <img src={imagePath('close-blank.svg')} alt="close button" />
                    </div>
                    <div className={styles.servicesForm}>
                        <img src={imagePath('planner.png')} alt="planner" />
                        <div className={styles.logoWrap}>
                            <div className={styles.heading}>Hi, My name is Nivita.</div>
                            {/* <div className={styles.heading}>Thank you for making us a part of your big day. Tell us a little bit more about the event.</div> */}
                        </div>


                        <div className={`${styles.heading} mb-4`}>Select the services you are interested in and tell us a bit more so I can call you</div>
                        <Row className="position-relative">
                            <Col md="12" className={styles.subHeading}>Personal Information</Col>
                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Full Name" id="contactName" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} withBorder={true} required={false} />
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Email" id="contactEmail" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} withBorder={true} />
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Phone" id="contactPhone" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} withBorder={true} />
                            </Col>

                            <Col md="6" xs="6">
                                <DatePicker
                                    selected={this.state.contactDate}
                                    onChange={e => this.handleDateChange(e)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Event date"
                                    id="contactDate"
                                    ref={this.dateRef}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    tabindex="-3"
                                />
                            </Col>

                            <Col md="6" xs="6">
                                <InputField maxLength="50" placeHolder="City" id="city" ref={this.cityRef} type="text" onChange={e => this.handleFormChange(e)} required={false} withBorder={true} />
                            </Col>
                        </Row>
                        <Row className="my-3"><Col md="12" className={styles.subHeading}>Choose one or choose all</Col></Row>
                        <Row className={styles.checkboxContainer}>
                            {
                                this.state.checkboxes.map((item, index) => {
                                    return (
                                        <Col md="12" key={index}>
                                            <div className="md-checkbox">
                                                <input id={`check${index + 1}`} type="checkbox" checked={item.checked}
                                                    onChange={(event) => this.handleCheckbox(event, index)} />
                                                <Label for={`check${index + 1}`}>{item.label}</Label>
                                            </div>
                                        </Col>
                                    );
                                })
                            }
                        </Row>

                        {this.props.status == false && this.props.message &&
                            <div className={styles.apiError}>{this.props.message}</div>
                        }
                        <div className="text-center">
                            <ProgressButton title="Send Message" onClick={() => this.validateForm()} isLoading={this.props.isLoading}></ProgressButton>
                            {/* <p className={styles.phone}>
                                <img src={imagePath('button-call.png')} alt="call-button" />
                                <a href="tel:+917032188007">+91 703 218 8007</a>
                                <span>+91 703 218 8007</span>
                            </p> */}
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
    isLoading: PropTypes.bool,
    origin: PropTypes.string,
    buttonColor: PropTypes.string,
    showPlanner: PropTypes.bool

};
TalkToWeddingPlanner.defaultProps = {
    type: ''
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalkToWeddingPlanner);	