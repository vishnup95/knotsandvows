import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import * as modalActions from './reducers/modal/actions';
import Helmet from 'react-helmet';
import routes from './routes';
import * as defaultMetadata from './metadata';
import FooterComponent from './components/Footer/footer';
import Header from './components/Header/header';
import PropTypes from 'prop-types';
import { Button, Modal } from 'reactstrap';
import ReactGA from 'react-ga';
import FullStory from 'react-fullstory';
import styles from './modals/forgotPasswordModal/forgotPasswordModal.scss';
import { imagePath } from './utils/assetUtils';

const mapStateToProps = state => ({
  showModal: state.modal.show,
  modalContent: state.modal.modalContent,
  metadata : state.metadata.metadata
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

    ReactGA.initialize(process.env.GA_TRACKING_ID);
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

  handleClick = () => {
    this.props.dispatch(modalActions.hideModal());

    if (this.props.modalContent.proceedAction) {
      this.props.modalContent.proceedAction();
    }
  }

  getMetaData = () => {
    let title = defaultMetadata.title;
    let meta = [
      {
        charset: 'UTF-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      {
        httpEquiv: 'X-UA-Compatible',
        content: 'IE=edge'
      }
    ];
    
    if(this.props.metadata){
      if(this.props.metadata.title){
        title = this.props.metadata.title;
      }
      if(this.props.metadata.description){
        meta.push({
         name:'description',
         content:this.props.metadata.description
        });
      }else{
        meta.push({
          name:'description',
          content:'Wedding services and planning partners'
         });
      }

      if(this.props.metadata.keywords){
        meta.push({
         name:'keywords',
         content:this.props.metadata.keywords
        });
      }
    }else{
      meta.push({
        name:'description',
        content:'Wedding services and planning partners'
       });
    }
    return {title: title, meta: meta};
  }

  render() {

    let {title, meta} = this.getMetaData();
    return (<div className="app">
      <FullStory org={process.env.FULLSTORY_ORG_ID} />
      <Helmet
        title={title}
        meta={meta}
        link={defaultMetadata.link}
        script={defaultMetadata.script}
        noscript={defaultMetadata.noscript}
      />
      <Header history={this.props.history} />
      <div className="main">
        {routes}
      </div>

      <Modal isOpen={this.props.showModal} toggle={() => this.toggle()} className={`${styles.forgotContainer} modal-dialog-centered`}>
        <div className={styles.genericPopup}>
          <div className={styles.logoContainer}>
            <img src={imagePath('logo.svg')} alt="SevenVows"/>
            <hr/>
          </div>
          
          <div className={styles.iconContainer}>
            {
              !this.props.modalContent.type ?
              <img src={imagePath('confirmation_generic.svg')} alt="generic icon"/> :
              <img src={imagePath(this.props.modalContent.type === 'success' ?'success_generic.svg' : 'failure_generic.svg')} 
                  alt="generic icon"/>  
            }
          </div>
          <div className={styles.genericHeader}>{this.props.modalContent.heading}</div>
          
          {
            this.props.modalContent.message !== 'mobile_contact' ? <div className={styles.message}>{this.props.modalContent.message}</div> :
              <div className={styles.message}>
                <a href="tel: +91 7032188007">Click here to contact us now! </a>
              </div>
          }

          <div className="text-center mt-3">
            {
              this.props.modalContent.showCancel && 
              <Button color="secondary" className="secondary-button" onClick={() => this.toggle()}>Cancel</Button>
            }
            <Button color="primary" className="primary-button" onClick={() => this.handleClick()}>OK</Button>{' '}   
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
  dispatch: PropTypes.func,
  metadata: PropTypes.object
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
