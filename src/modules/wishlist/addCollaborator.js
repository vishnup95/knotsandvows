import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../modals/forgotPasswordModal/forgotPasswordModal.scss';
import { Form } from 'reactstrap';
import InputField from '../../components/InputField/inputField';
import ProgressButton from '../../components/ProgressButton/PorgressButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { getDataFromResponse } from '../../utils/utilities';

const mapStateToProps = state => ({
    wishlistId: state.wishlist.current.wishlist_id,
    isLoading: state.wishlist.loading
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
  });

class AddCollaboratorModal extends Component {

    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.nameRef = React.createRef();
        this.state = {
            email: null,
            name: null,
            error : null
        };
    }

    closeModal = () => {
        this.props.close();
    }

    validateForm = () => {
        let email = this.emailRef.current.validateFormInput(document.getElementById('email'));
        let name = this.nameRef.current.validateFormInput(document.getElementById('name'));

        if (email && name) {
            const params = {
                email: this.state.email,
                name: this.state.name,
                wishlist_id : this.props.wishlistId
            }
            this.props.dispatch(actions.addCollaborator(params)).then((response) => {
              let error = getDataFromResponse(response);
              if (error == null){
                 this.closeModal();
              }else{
                  this.setState({error:error});
              }
            });
        }
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        return (
            <div className={styles.forgotPassword}>
            <div className={`text-left ${styles.header}`}>Share your wishlist</div>
            <div className={styles.subheading}>Invite your collaborator to view your wishlist</div>
            <Form className="position-relative mt-3">
                <InputField placeHolder="Name" id="name" type="text" ref={this.nameRef} onChange={e => this.handleFormChange(e)} />
                <InputField placeHolder="Email Address" id="email" type="email" ref={this.emailRef} onChange={e => this.handleFormChange(e)} />
            </Form>
            
            <div className="text-center mt-4 position-relative">
                <ProgressButton title="Share" onClick={this.validateForm} isLoading={this.props.isLoading}></ProgressButton>
                <div className={styles.error}>{this.state.error}</div>
            </div>
        </div>
        );
    }
}

AddCollaboratorModal.propTypes = {
    close: PropTypes.func,
    wishlistId: PropTypes.number,
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCollaboratorModal);