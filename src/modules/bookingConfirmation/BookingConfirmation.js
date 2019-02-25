import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styles from './bookingConfirmation.scss';
import { imagePath } from '../../utils/assetUtils';
import * as actions from './actions';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';

const title = {
    title: 'Popular Packages',
    buttonText: '',
    subtitle: ""
}

const mapStateToProps = state => ({
    user: state.session.user,
    exclusives: state.home.exclusives
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions }),
    dispatch
});

class BookingConfirmation extends Component {
    static fetchData(store) {
        // Normally you'd pass action creators to "connect" from react-redux,
        // but since this is a static method you don't have access to "this.props".

        // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
        return store.dispatch(actions.fetchCategories());
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.exclusives.length === 0) {
            this.props.dispatch(actions.fetchCategories());
        } 
    }

    renderDetails() {

        let email = "example@gmail.com";
        let bookingId = "1234abcd";
        return (
            <div style={{ margin: '2rem' }}>
                <p className={`text-center ${styles.detail}`}>Your reference number is #<span className={styles.detailBold}>{bookingId}</span></p>
                <p className={`text-center ${styles.detail}`}> A booking confirmation email has been sent to </p>
                <p className={`text-center ${styles.detailBold}`}>{email}</p>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className={styles.headerSpace}></div>
                <div className="text-center">
                    <div className="text-center">
                        <img className={styles.image} src={imagePath('congrats.svg')} alt="congrats"></img>
                    </div>
                    <h1 className={`text-center ${styles.heading}`}>Thank you, your booking has been placed</h1>
                    {this.renderDetails()}
                    <div className={`text-center ${styles.detailLink}`}>send confirmation to another email</div>
                    <Button color="danger" className={`text-center ${styles.button}`} onClick={this.toggle}>BACK TO HOME</Button>
                </div>
                <JumbotronComponent data={title} items={this.props.exclusives} bgcolor="#f8f8f8" cardType="detailed" />
            </div>
        );
    }
}

BookingConfirmation.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    exclusives: PropTypes.array,
    router: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingConfirmation);