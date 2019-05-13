import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './CeremonyDetail.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from './actions';
import LoaderComponent from '../../components/Loader/loader';
import CategorySection from './categorySection';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import HorizontalScrollingCarousel from '../home/horizontalScrollingCarousal'
import NoResultComponent from '../../components/noResult/noResult';
import { getId } from '../../utils/utilities';
import Helmet from 'react-helmet';
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
  similar_ceremonenies: state.ceremonyDetails.similar_ceremonenies
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = { title: 'Other Ceremonies' };
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
    promises.push(store.dispatch(actions.fetchSimilarCeremonies(ceremony)));
    return Promise.all(promises);
  }

  selectedCategory() {
    return this.props.match.params.ceremony_name;
  }

  componentWillMount() { 
    if (this.props.ceremonyDetails == null || getId(this.state.ceremony) != this.props.ceremonyDetails.ceremony_id){
      this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
      this.props.dispatch(actions.fetchSimilarCeremonies(this.state.ceremony));
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
      this.props.dispatch(actions.fetchSimilarCeremonies(ceremony));
      this.setState({ ceremony: ceremony, filter: { name: "", id: null } });
      window.scrollTo(0, 0);
    }

    if(this.props.user != prevProps.user && this.props.user) {
      this.props.dispatch(actions.fetchCeremonyDetails(this.state.ceremony));
      window.scrollTo(0, 0);
    }
  }

  handleViewAllClick = (category) => {
    this.navigateTo(`/categories/${category}`)
    window.scrollTo(0, 0);
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
              {this.props.ceremonyDetails.fixedCategories.length == 0 && 
                  <NoResultComponent></NoResultComponent>
              }

              {this.props.ceremonyDetails.fixedCategories && this.props.ceremonyDetails.fixedCategories.length > 0  && 
              <div>
              {
                this.props.ceremonyDetails.fixedCategories.length > 0 ?
                  <CategorySection category={this.props.ceremonyDetails.fixedCategories[0]} dispatch={this.props.dispatch} /> : ''
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
                this.props.ceremonyDetails.categories.slice(1).map((category, index) => {
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
        {this.props.similar_ceremonenies && !this.props.ceremonyLoading &&
          <JumbotronComponent data={jumbotronData} items={this.props.similar_ceremonenies.slice(0,3)} cardType="ceremonies" bgcolor="#f8f8f8" containerStyle="otherWrap">
            <Col xs="12" className={`${styles.mobileCarousal} no-padding d-block d-sm-none`}>
              <HorizontalScrollingCarousel data={this.props.similar_ceremonenies} type="similar_ceremonies" />
            </Col>
          </JumbotronComponent>
        }
      </div>
    );
  }
}

CeremonyDetail.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  ceremonyDetails: PropTypes.object,
  similar_ceremonenies: PropTypes.array,
  match: PropTypes.object,
  ceremonyLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CeremonyDetail);
