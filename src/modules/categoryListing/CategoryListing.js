import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import * as actions from '../ceremonyDetail/actions';
import { Container, Row, Col } from 'reactstrap';
import styles from '../ceremonyDetail/CeremonyDetail.scss';
import LoaderComponent from '../../components/Loader/loader';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import CategorySection from '../ceremonyDetail/categorySection';
import Helmet from 'react-helmet';


let meta = {
  title:"Wedding Vendors - Explore Packages and Book Online",
  description:'One stop destination for all wedding vendors like photographers, caterers, decorators, makeup artists. Browse categories, compare prices & select as per your requirement & budget.',
  keywords:""
}

const mapStateToProps = state => ({
  allVendorDetails: state.ceremonyDetails.allVendorDetails,
  isLoading: state.ceremonyDetails.loading,
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = {
  title: 'Need Help?',
  buttonText: 'Talk to our experts!',
  subtitle: 'We have you covered. Our expert planners will work with you to make your event fantastic and make sure your needs are met.'
};
  
class CategoryListing extends Component {
  

  static fetchData(store) {
    return store.dispatch(actions.fetchAllVendors());
  }

  componentWillMount() {
    if(!this.props.allVendorDetails  || !this.props.allVendorDetails.categories || this.props.allVendorDetails.categories == 0) {
      this.props.dispatch(actions.fetchAllVendors());
    }
  }
  
  componentWillUnmount(){
    this.props.dispatch(actions.clearCeremonyData());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user != nextProps.user && nextProps.user) {
      this.props.dispatch(actions.fetchAllVendors());
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCategoryChange = (index) => {
    this.props.dispatch(actions.updateCategoryOrder(index));
  }

  render() {
    
    return (
      <div className="full-height">
      <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
       </Helmet>
            <Container className={styles.browseAllContainer}>
              <Row>
                <Col className="mb-4">
                  <h2 className="text-center">Browse all VowVendors</h2>
                </Col>
              </Row>
              {this.props.isLoading && <LoaderComponent />}
              {this.props.allVendorDetails.fixedCategories.length > 0 && <Row className={`mb-3 ${styles.fullWidthListing}`}>
                <Col>
                  <HorizontalSlider data={this.props.allVendorDetails.fixedCategories} type='small' buttonAction={this.handleCategoryChange}/>
                </Col>
              </Row>}
              {
                this.props.allVendorDetails.categories.map((category, index) => {
                  return (
                    <CategorySection category={category} key={index} dispatch={this.props.dispatch}/>
                  );
                })
              }
            </Container>

        <JumbotronComponent  data={jumbotronData} bgcolor="#f8f8f8" isTalkToAhwanam={true} containerStyle="otherWrap"/>
      </div>
    );
  }
}

CategoryListing.propTypes = {
  user: PropTypes.object,
  allVendorDetails: PropTypes.object,
  isLoading: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListing);
