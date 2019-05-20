import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './CeremonyDetail.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import LoaderComponent from '../../components/Loader/loader';
import CategorySection from './categorySection';
import NoResultComponent from '../../components/noResult/noResult';
import { getId, hyphonatedString } from '../../utils/utilities';
import Helmet from 'react-helmet';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import { push } from 'connected-react-router';

// const cities = {
//   display_name:"City",
//   name:"city",
//   values:[
//       {name: "Hyderabad", id: 0},
//       // {name: "Secunderabad", id: 1},
//       {name: "Vijayawada", id: 2},
//       {name: "Vizag", id: 3}
//   ]
// }

const mapStateToProps = state => ({
  user: state.session.user,
  ceremonyDetails: state.ceremonyDetails.details,
  ceremonyLoading: state.ceremonyDetails.loading,
  all_ceremonies : state.home.ceremonies,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

class CeremonyDetail extends Component {
  
  state = {
    ceremony: this.props.match.params.ceremony_name,
    selectedOption: null,
  }
  options = [];

  static fetchData(store, match) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    let promises = [];
    let ceremony = match.params.ceremony_name;
    promises.push(store.dispatch(actions.fetchCeremonyDetails(ceremony)));
    return Promise.all(promises);
  }

  selectedCategory() {
    return this.props.match.params.ceremony_name;
  }

  componentWillMount() { 
    if (this.props.ceremonyDetails == null || getId(this.state.ceremony) != this.props.ceremonyDetails.ceremony_id){
      this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
    } 
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  componentWillUnmount(){
    this.props.dispatch(actions.clearCeremonyData());
  }

  componentDidUpdate(prevProps) {
    if (prevProps == undefined) {
      return false;
    }

    if (this.state.ceremony !== this.props.match.params.ceremony_name) {
      let ceremony = this.props.match.params.ceremony_name;
      this.props.dispatch(actions.fetchCeremonyDetails(ceremony));
      this.setState({ ceremony: ceremony, filter: { name: "", id: null } });
      window.scrollTo(0, 0);
    }

    if(this.props.user != prevProps.user && this.props.user) {
      this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
      window.scrollTo(0, 0);
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleViewAllClick = (category) => {
    this.navigateTo(`/categories/${category}`)
    window.scrollTo(0, 0);
  }

  handleCeremonyClick = (ceremony, event) => {
    this.navigateTo(`/ceremonies/${hyphonatedString(ceremony.ceremony_name, ceremony.ceremony_id)}`);
    event.preventDefault();
  }

  // handleCategoryChange = (index) => {
  //   let updatedCategories = this.state.fixedCategories.slice();
  //   let temp = updatedCategories[1];
  //   updatedCategories[1] = updatedCategories[index + 1];
  //   updatedCategories[index + 1] = temp;
  //   this.setState({ categories: updatedCategories });
  // }

  // handleDropDownChange = (option) => {
  //   if (option) {
  //     this.setState({ selectedOption: option });
  //     this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony, option.value));
  //   }
  //   // else{
  //   //   this.setState({ selectedOption : null });
  //   //   this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
  //   // }
  // }

  render() {
    let details = this.props.ceremonyDetails;
    let similar_ceremonies = [];
    if (details && this.props.all_ceremonies){
      similar_ceremonies = this.props.all_ceremonies.filter((ceremony) => ceremony.ceremony_id != details.ceremony_id);
    }
    return (
      <div className="full-height">
      {details && details.metatag &&
                <Helmet>
                <title>{details.metatag.title}</title>
                <meta name="description" content={details.metatag.description} />
                <meta name="keywords" content={details.metatag.keywords} />
                </Helmet>
        }
        {this.props.ceremonyLoading && <LoaderComponent />}
        {details &&

          <div className={styles.ceremonyDetail}>
            <div className={styles.ceremonyCover} style={{ background: "url(" + details.cermony_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
              <div className={styles.coverMask}>
                <h1 className={styles.title}>{details.ceremony_name}</h1>
                <p>{details.description}</p>
                {/* <TalkToWeddingPlanner buttonText={'Let us help you'}/> */}
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
                  {/* <div className={styles.selectCity}>
                    <Select
                      value={this.state.selectedOption}
                      onChange={this.handleDropDownChange}
                      options={this.option}
                      placeholder="Select city"
                      isClearable={false}
                      className={styles.selectDrop}
                    />
                    </div> */}
                  </Col>
              </Row>
              {details.fixedCategories.length == 0 && 
                  <NoResultComponent></NoResultComponent>
              }

              {details.fixedCategories && details.fixedCategories.length > 0  && 
              <div>
              {
                details.fixedCategories.length > 0 ?
                  <CategorySection category={details.fixedCategories[0]} dispatch={this.props.dispatch} /> : ''
              }

              {/* 
              this section removed temporerly
              <Row>
                <Col>
                  <h2 className="text-center">You may also be interested in</h2>
                </Col>
              </Row>
              <Row>
                <Col className="no-padding">
                  <HorizontalSlider data={this.state.fixedCategories.slice(1)} type='small' buttonAction={this.handleCategoryChange} />
                </Col>
              </Row> */}
              {
                details.categories.slice(1).map((category, index) => {
                  return (
                    <CategorySection category={category} key={index} dispatch={this.props.dispatch} />
                  );
                })
              }
              </div>
              }
              
            </Container>
          </div>
        }
        
        {similar_ceremonies && !this.props.ceremonyLoading &&
        <Container className={styles.homeContainer}>
        <Row className="mt-5" id="ceremonies">
          <Col className={`${styles.ceremony} text-center`}>
            <h2>Other Ceremonies</h2>
              <Col xs="12" className={` no-padding mb-5 mt-5`}>
                <HorizontalSlider data={similar_ceremonies} type="ceremony" onSelect={(ceremony, event) => this.handleCeremonyClick(ceremony, event)} />
              </Col>
          </Col>
        </Row>
      </Container>}
      </div>
    );
  }
}

CeremonyDetail.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  ceremonyDetails: PropTypes.object,
  all_ceremonies: PropTypes.array,
  match: PropTypes.object,
  ceremonyLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CeremonyDetail);
