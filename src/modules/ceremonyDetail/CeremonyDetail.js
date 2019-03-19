import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './CeremonyDetail.scss';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import Select from 'react-select';
import LoaderComponent from '../../components/Loader/loader';
import CategorySection from './categorySection';
// import { workerData } from 'worker_threads';

const mapStateToProps = state => ({
  user: state.session.user,
  ceremonyDetails: state.ceremonyDetails.details,
  ceremonyLoading: state.ceremonyDetails.loading,
  other_ceremonenies: state.products.other_categories
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class CeremonyDetail extends Component {
  state = {
    ceremony: this.props.match.params.ceremony_name,
    selectedOption: null,
    categories: [],
    fixedCategories: []
  }

  selectedCategory() {
    return this.props.match.params.ceremony_name;
  }

  componentWillMount() {
    let ceremony = this.selectedCategory();
    this.props.dispatch(actions.fetchCeremonyDetails(ceremony));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ceremonyDetails !== null) {
      let filteredCategories = nextProps.ceremonyDetails.categories.filter(item => {
        return item.vendors !== null && item.vendors.length > 0
      })
      this.setState({categories: filteredCategories, fixedCategories: filteredCategories});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps == undefined) {
      return false;
    }

    if (this.state.ceremony !== this.props.match.params.ceremony_name) {
      let ceremony = this.props.match.params.ceremony_name;
      this.props.dispatch(actions.fetchCeremonyDetails(ceremony));
      this.setState({ ceremony: ceremony, filter: { name: "", id: null } });
    }
  }

  handleCategoryChange = (index) => {
    let updatedCategories = this.state.fixedCategories.slice();
    let temp = updatedCategories[1];
    updatedCategories[1] = updatedCategories[index+1];
    updatedCategories[index+1] = temp;
    this.setState({categories: updatedCategories});
  }

  handleDropDownChange = (option) => {
    if (option) {
      this.setState({ selectedOption: option });
      this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony, option.value));
    }
    // else{
    //   this.setState({ selectedOption : null });
    //   this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
    // }
  }

  render() {
    let details = this.props.ceremonyDetails;
    if (details !== null) {
      var options = [];
      if (details.filters && details.filters.length > 0 && details.filters[0].values && details.filters[0].values.length > 0) {
        options = Array.from(details.filters[0].values, (value) => ({
          label: value.name,
          value: value.id
        }));
      }
    }

    return (
      <div className="full-height">
        {this.props.ceremonyLoading && <LoaderComponent />}
        {details &&

          <div className={styles.ceremonyDetail}>
            <div className={styles.ceremonyCover} style={{ background: "url(" + details.cermony_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
              <div className={styles.coverMask}>
                <h1 className={styles.title}>{details.ceremony_name}</h1>
                <p>{details.description}</p>
              </div>
            </div>
            <Container>
              <Row>
                <Col>
                  {/* <h3>Plan Your Wedding - Find and book your dream team
            </h3> */}
                </Col>
                {/* <Col>Select City</Col> */}
                {details.filters && details.filters.length > 0 &&
                  <Col>
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleDropDownChange}
                      options={options}
                      placeholder="City"
                      isClearable={false}
                    />
                  </Col>
                }
              </Row>
              
              {
                this.state.fixedCategories.length > 0 ? 
                <CategorySection category={this.state.fixedCategories[0]} dispatch={this.props.dispatch}/> : ''
              }
              
              <Row>
                <Col>
                <h2 className="text-center">You may also be interested in</h2>
                </Col>
              </Row>
              <Row>
                <Col className="no-padding">
                  <HorizontalSlider data={this.state.fixedCategories.slice(1)} type='small' buttonAction={this.handleCategoryChange}/>
                </Col>
              </Row>
              {
                this.state.categories.slice(1).map((category, index) => {
                  return (
                    <CategorySection category={category} key={index} dispatch={this.props.dispatch}/>
                  );
                })
              }
            </Container>
          </div>
        }
      </div>
    );
  }
}

CeremonyDetail.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  ceremonyDetails: PropTypes.object,
  other_ceremonenies: PropTypes.array,
  match: PropTypes.object,
  ceremonyLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CeremonyDetail);
