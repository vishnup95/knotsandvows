import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
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
        }
        this.toggle = this.toggle.bind(this);
    }

    componentWillUnmount() {
        this.setState({city: ''})
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.dispatch(actions.clearTalkToErrors());
    }
    
    handleFormChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        this.props.dispatch(actions.clearTalkToErrors());
    }
    validateForm = () => {
        let name = this.nameRef.current.validateFormInput(document.getElementById('contactName'));
        let email = this.emailRef.current.validateFormInput(document.getElementById('contactEmail'));
        let phone = this.phoneRef.current.validateFormInput(document.getElementById('contactPhone'));
        let date = this.dateRef.current.validateFormInput(document.getElementById('contactDate'));
        let city = this.cityRef.current.validateFormInput(document.getElementById('city'));
        let comments = this.commentsRef.current.validateFormInput(document.getElementById('comments'));

        if (name && email && phone && date && comments && city) {
            const details = {
                origin:'CALL_BUTTON_FORM',
                name: this.state.contactName,
                phone: this.state.contactPhone,
                email: this.state.contactEmail,
                event_date: this.state.contactDate,
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
       if (this.props.status != prevProps.status && this.props.status === true) {
            this.props.dispatch(modalActions.showModal({ message: 'Our wedding consultant will get in touch with you within 24 hours.', heading: 'We are on it!', type: 'success' }));   
            this.setState({modal: false});
         }
    }
   
    render() {
        console.log(styles.footerLink);
        
        return (
            <div className="flex justify-center">
                {this.props.type === 'link' && styles.footerLink && <button className={`${this.props.origin === 'footer' ? styles.footerLink : 's'} link-btn`} onClick={() => this.toggle()}>{this.props.buttonText}</button>}
                {this.props.type === 'call' && <div className="call-btn" onClick={() => this.toggle()} aria-hidden >
                    <div className="pulsateRing"></div>
                    <img src={imagePath('button-call.png')} alt="call-button" />
                </div>}
                {this.props.type === '' && <button onClick={() => this.toggle()} className={`${this.props.buttonColor === 'white' ? 'white' : ''} primary-button home-btn medium-pink`}>{this.props.buttonText}</button>}

                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={styles.talkPopup}>
                    <div className={styles.loginForm}>
                        <img src={imagePath('planner.png')} alt="planner"/>
                        <div className={styles.logoWrap}>
                            <div className={styles.heading}>Hi, my name is Nivita.</div>
                            <div className={styles.mainHeading}>Congratulations!</div>
                            <div className={styles.heading}>We have been expecting you, tell us <span className="tab-only"><br/></span> a bit more so I can call you</div>
                        </div>
                        <Row className="position-relative">
                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Full Name" id="contactName" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} withBorder={true} required={false}/>
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Email" id="contactEmail" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} withBorder={true}/>
                            </Col>

                            <Col md="12">
                                <InputField maxLength="50" placeHolder="Phone" id="contactPhone" ref={this.phoneRef} type="tel" onChange={e => this.handleFormChange(e)} withBorder={true}/>
                            </Col>

                            <Col md="6" xs="6">
                                <InputField maxLength="50" placeHolder="Event date" id="contactDate" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} required={false} withBorder={true}/>
                            </Col>

                            <Col md="6" xs="6">
                                <InputField maxLength="50" placeHolder="City" id="city" ref={this.cityRef} type="text" onChange={e => this.handleFormChange(e)} required={false} withBorder={true}/>                           
                            </Col>

                            <Col md="12">
                                <InputField maxLength="200" placeHolder="Comments" id="comments" ref={this.commentsRef} type="text" onChange={e => this.handleFormChange(e)} required={false} withBorder={true}/>
                            </Col>
                        </Row>

                        {this.props.status == false && this.props.message &&
                            <div className={styles.apiError}>{this.props.message}</div>
                        }
                        <div className="text-center">
                            <ProgressButton title="SEND MESSAGE" onClick={() => this.validateForm()} isLoading={this.props.isLoading}></ProgressButton>
                            <p className={styles.phone}>Call Seven Vows<span className="mobile-only"><br/></span> <a href="tel:+917702053510">+91 770 205 3510</a></p>

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
    buttonColor: PropTypes.string

};
TalkToWeddingPlanner.defaultProps = {
    type: ''
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalkToWeddingPlanner);