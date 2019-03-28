import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import * as modalActions from './reducers/modal/actions';
import Helmet from 'react-helmet';
import routes from './routes';
import * as metadata from './metadata';
import FooterComponent from './components/Footer/footer';
import Header from './components/Header/header';
import PropTypes from 'prop-types';
import { Button, Modal } from 'reactstrap';
import ReactGA from 'react-ga';
import FullStory from 'react-fullstory';
import styles from './modals/forgotPasswordModal/forgotPasswordModal.scss';

const mapStateToProps = state => ({
  showModal: state.modal.show,
  modalContent: state.modal.modalContent
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...modalActions }),
  dispatch
});

class App extends Component {
  constructor(props) {
    super(props);
    this.initializeReactGA();
  }

 initializeReactGA = () => {
    const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
    ReactGA.initialize(GA_TRACKING_ID);
    this.props.history.listen(location => {
      ReactGA.pageview(location.pathname);
    });
}

  toggle() {
    if (this.props.showModal) {
      this.props.dispatch(modalActions.hideModal());
    } else {
      this.props.dispatch(modalActions.showModal());
    }
  }

  navigateTo(route) {
    this.props.dispatch(modalActions.hideModal());
    this.props.dispatch(push(route));
  }

  render() {
    
    const FS_ORG_ID = process.env.REACT_APP_FS_ORG_ID;
    return (<div className="app">
    <FullStory org={FS_ORG_ID} />
    <Helmet
      title={metadata.title}
      meta={metadata.meta}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />
    <Header history={this.props.history}/>
    <div className="main">
    {routes}
    </div>

    <Modal  isOpen={this.props.showModal} toggle={() => this.toggle()} className={`${styles.forgotContainer} modal-dialog-centered`}>
      <div className={styles.forgotPassword}>
        <div className={styles.header}>{this.props.modalContent.heading}</div>
        {
          this.props.modalContent.message !== 'mobile_contact' ? <div className={styles.message}>{this.props.modalContent.message}</div>:
          <div className={styles.message}>
            <a href="tel: +91 7702053510">Click here to contact us now! </a>
          </div>
        }
        
        <div className="text-center mt-5">
          <Button color="primary" className="primary-button" onClick={() => this.navigateTo('/')}>OK</Button>{' '}
        </div> 
      </div>
    </Modal>

    <FooterComponent />
  </div>);
  }
}
App.propTypes = {
  history: PropTypes.any,
  showModal: PropTypes.bool,
  modalContent: PropTypes.object,
  dispatch: PropTypes.func
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
