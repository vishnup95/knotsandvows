import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { imagePath } from '../../utils/assetUtils';
import styles from './CeremonyDetail.scss';
import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import * as actions from './actions';
import Select from 'react-select';
import LoaderComponent from '../../components/Loader/loader';


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
    selectedOption: null
  }

  selectedCategory() {
    return this.props.match.params.ceremony_name;
  }

  componentWillMount() {

    let ceremony = this.selectedCategory();
    this.props.dispatch(actions.fetchCeremonyDetails(ceremony));

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
    console.log(category);

    this.navigateTo(`/categories/${category}`)
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

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  render() {
    let details = this.props.ceremonyDetails;
    if (details !== null) {
      let allCategories = details.categories;
      var categories = allCategories.filter(function (category) {
        return category.vendors != null && category.vendors.length > 0;
      });
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
        {this.props.ceremonyLoading && <LoaderComponent/>}
        {details &&

          <div className={styles.ceremonyDetail}>
            <div className={styles.ceremonyCover} style={{ background: "url(" + details.cermony_image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
              <div className={styles.coverMask}>
                <h1 className={styles.title}>{details.description}</h1>
                <p>{details.description}</p>
              </div>
              <img className={styles.bottomCurve} src={imagePath('curveline.svg')} alt="curve" />
            </div>
            <Container>
              <Row>
                <Col>
                  <h3>Plan Your Wedding - Find and book your dream team
            </h3>
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
              <Row>
                <Col className="no-padding">
                  <HorizontalSlider data={categories} type='small' />
                </Col>
              </Row>
              {
                categories.map((category, index) => {
                  return (

                    <div key={index} >
                      <Row>
                        <Col>

                          <h3>{category.name}</h3>
                          <p className={styles.subTitle}>{category.sub_title}</p>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="no-padding">
                          <HorizontalSlider data={category.vendors} category={category.page_name} buttonAction={this.handleViewAllClick} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className={styles.viewAll} onClick={() => this.handleViewAllClick(category.page_name)} aria-hidden >View All</p>
                        </Col>
                      </Row>

                    </div>
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
