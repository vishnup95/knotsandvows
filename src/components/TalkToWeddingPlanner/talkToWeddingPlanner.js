import React, { Component } from 'react';
import { Form, Button } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import styles from './talkToWeddingPlanner.scss';
import * as actions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import * as modalActions from '../../reducers/modal/actions';
import { Modal } from 'reactstrap';


const mapStateToProps = state => ({
    message: state.talkToAhwanam.message,
    status: state.talkToAhwanam.status
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
        this.commentsRef = React.createRef();
        this.state = {
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            comments: '',
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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
        let comments = this.commentsRef.current.validateFormInput(document.getElementById('comments'));

        if (name && email && phone && date && time && comments) {
            const details = {
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                event_date: this.state.date,
                time: this.state.time,
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
                this.toggle();
            }
            this.props.dispatch(modalActions.showModal(this.props.message));
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.toggle()} className={styles.button}>{this.props.buttonText}</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={styles.talkPopup}>
                    <div className={styles.loginForm}>

                        <div className={styles.logoWrap}>
                            <img className={styles.image} src={imagePath('logo.svg')} alt="logo"></img>
                            <div className={styles.heading}>Talk to our wedding planner</div>
                        </div>
                        <Form style={{ zIndex: '10000' }} className="position-relative">
                            <InputField placeHolder="Name" id="name" ref={this.nameRef} type="text" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Email Address" id="email" ref={this.emailRef} type="email" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Contact Number" id="phone" ref={this.phoneRef} type="number" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Date" id="date" ref={this.dateRef} type="date" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Time" id="time" ref={this.timeRef} type="text" onChange={e => this.handleFormChange(e)} />
                            <InputField placeHolder="Comments" id="comments" ref={this.commentsRef} type="text" onChange={e => this.handleFormChange(e)} />
                        </Form>
                        <div className="text-center">
                            <Button className={styles.cancelBtn} onClick={() => this.props.onclick()}>Cancel</Button>
                            <Button color="danger" className={styles.button} onClick={() => this.validateForm()}>Submit</Button>
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
    buttonText: PropTypes.string

};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TalkToWeddingPlanner);