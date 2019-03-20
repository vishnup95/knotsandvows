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
  ceremonyDetails: state.ceremonyDetails.details,
  ceremonyLoading: state.ceremonyDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = {
  title: 'Need Help?',
  buttonText: 'Talk to our wedding planner!',
  subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
};
  
class CategoryListing extends Component {
  state = {
    categories: [],
    fixedCategories: []
  }

  static fetchData(store) {
    return store.dispatch(actions.fetchCeremonyDetails('wedding'));
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchCeremonyDetails('wedding'));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ceremonyDetails !== null) {
      console.log
      let filteredCategories = nextProps.ceremonyDetails.categories.filter(item => {
        return item.vendors !== null && item.vendors.length > 0
      })
      this.setState({categories: filteredCategories, fixedCategories: filteredCategories});
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCategoryChange = (index) => {
    console.log(index);
    let updatedCategories = this.state.fixedCategories.slice();
    let temp = updatedCategories[0];
    updatedCategories[0] = updatedCategories[index];
    updatedCategories[index] = temp;
    this.setState({categories: updatedCategories});
  }

  render() {
    console.log(this.props);
    return (
      <div className="full-height" style={{marginTop: '14rem'}}>
          <div className={styles.ceremonyDetail}>
            <Container>
              <Row>
                <Col className="mb-4">
                  <h2 className="text-center">Browse all vendors</h2>
                  <p className={styles.subTitle}>Guaranteed best prices from all our vendors</p>
                </Col>
              </Row>
              {this.props.ceremonyLoading && <LoaderComponent />}
              <Row className="mb-3">
                <Col className="no-padding">
                  <HorizontalSlider data={this.state.fixedCategories} type='small' buttonAction={this.handleCategoryChange}/>
                </Col>
              </Row>
              {
                this.state.categories.map((category, index) => {
                  return (
                    <CategorySection category={category} key={index} dispatch={this.props.dispatch}/>
                  );
                })
              }
            </Container>
          </div>

        <JumbotronComponent  data={jumbotronData} bgcolor="#f8f8f8" isTalkToAhwanam={true} containerStyle="otherWrap"/>
      </div>
    );
  }
}

CategoryListing.propTypes = {
  user: PropTypes.object,
  ceremonyDetails: PropTypes.object,
  ceremonyLoading: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListing);
