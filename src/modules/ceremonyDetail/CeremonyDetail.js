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

const cities = {
  display_name:"City",
  name:"city",
  values:[
      {name: "Hyderabad", id: 0},
      {name: "Secunderabad", id: 1},
      {name: "Vijayawada", id: 2},
      {name: "Vizag", id: 3}
  ]
}

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
    ceremony: this.selectedCategory(),
    selectedOption: null,
    categories: [],
    fixedCategories: []
  }
  options = [];

  selectedCategory() {
    return this.props.match.params.ceremony_name;
  }

  componentWillMount() {
    let ceremony = this.selectedCategory();
    this.props.dispatch(actions.fetchCeremonyDetails(ceremony));
    this.option = Array.from(cities.values, (value) => ({
      label: value.name,
      value: value.id
}));
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

  handleViewAllClick = (category) => {
    this.navigateTo(`/categories/${category}`)
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
                  <Col>
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleDropDownChange}
                      options={this.option}
                      placeholder="City"
                      isClearable={false}
                    />
                  </Col>
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
