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
  buttonText: 'Talk to our wedding planner!',
  subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by clicking the Chat button below and they’ll help you get your party started.'
};
  
class CategoryListing extends Component {
  state = {
    categories: [],
    fixedCategories: []
  }

  static fetchData(store) {
    return store.dispatch(actions.fetchAllVendors());
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchAllVendors());
  }

  updateData(props){
    let filteredCategories = props.allVendorDetails.categories.filter(item => {
      return item.vendors !== null && item.vendors.length > 0
    })
    this.setState({categories: filteredCategories, fixedCategories: filteredCategories});
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.allVendorDetails !== null && nextProps.allVendorDetails.categories !== null) {
      this.updateData(nextProps);
    }else{
      this.setState({categories: [], fixedCategories: []});
    }
    if(this.props.user != nextProps.user && nextProps.user) {
      this.props.dispatch(actions.fetchAllVendors());
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCategoryChange = (index) => {
    let updatedCategories = this.state.fixedCategories.slice();
    let temp = updatedCategories[0];
    updatedCategories[0] = updatedCategories[index];
    updatedCategories[index] = temp;
    this.setState({categories: updatedCategories});
  }

  render() {
    
    return (
      <div className="full-height">
            <Container className={styles.browseAllContainer}>
              <Row>
                <Col className="mb-4">
                  <h2 className="text-center">Browse all VowVendors</h2>
                </Col>
              </Row>
              {this.props.isLoading && <LoaderComponent />}
              {this.state.fixedCategories.length > 0 && <Row className={`mb-3 ${styles.fullWidthListing}`}>
                <Col>
                  <HorizontalSlider data={this.state.fixedCategories} type='small' buttonAction={this.handleCategoryChange}/>
                </Col>
              </Row>}
              {
                this.state.categories.map((category, index) => {
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
