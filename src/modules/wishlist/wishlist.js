import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import * as actions from '../ceremonyDetail/actions';
import { Container, Row, Col } from 'reactstrap';
import styles from './wishlist.scss';
import LoaderComponent from '../../components/Loader/loader';
// import HorizontalSlider from '../../components/HorizontalSlider/horizontalSlider';
// import CategorySection from '../ceremonyDetail/categorySection';
import CategoryCard from '../../components/Card/cardCategory';


const mapStateToProps = state => ({
  ceremonyDetails: state.ceremonyDetails.details,
  ceremonyLoading: state.ceremonyDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const wishlist = ["My list", "Subin's List", "Hayas Lis"];

class CategoryListing extends Component {
  state = {
    categories: [],
    fixedCategories: [],
    selectedVendor: 0,
    isCompare: false
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
    if (nextProps.ceremonyDetails !== null) {
      let filteredCategories = nextProps.ceremonyDetails.categories.filter(item => {
        return item.vendors !== null && item.vendors.length > 0
      })
      this.setState({ categories: filteredCategories, fixedCategories: filteredCategories });
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
    this.setState({ categories: updatedCategories, selectedVendor: index });
  }
  setCompare = () => {
    this.setState({ isCompare: !this.state.isCompare });
  }

  render() {
    return (
      <div className="full-height" style={{ marginTop: '14rem' }}>
        <div className={styles.wishlistContainer}>
          <Container>
            {
              this.props.ceremonyLoading ?
                <Row>
                  <Col>
                    <LoaderComponent />
                  </Col>
                </Row> :
                <Row>
                  <Col sm="3">
                    {
                      wishlist.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className={styles.listTitle}>{item}</div>
                            <ul className={styles.vendorList}>
                              {
                                this.state.fixedCategories.map((k, index) => {
                                  return (
                                    <li key={index} className={`${styles.listItem} ${this.state.selectedVendor === index ? styles.active : ''}`} onClick={() => this.handleCategoryChange(index)} aria-hidden>{k.name}</li>
                                  );
                                })
                              }
                            </ul>
                          </div>
                        );
                      })
                    }

                  </Col>
                  <Col sm="9" className={styles.listDetailContainer}>
                    <Row>
                      {
                        this.state.fixedCategories.length > 0 &&
                        <Col className="text-left">
                          <span className={styles.vendorName}>{this.state.fixedCategories[`${this.state.selectedVendor}`].name}</span>
                          {!this.state.isCompare && <button className="text-btn small" onClick={() => this.setCompare()}>Compare {this.state.fixedCategories[`${this.state.selectedVendor}`].name}</button>}
                        </Col>
                      }
                      {
                        this.state.isCompare &&
                        <Col className="text-right">
                          <button className="text-btn small" onClick={() => this.setCompare()}>Cancel</button>
                          <button className="primary-button">Compare Vendors</button>

                        </Col>
                      }
                    </Row>
                    <Row>
                      {this.state.categories[0] && this.state.categories[0].vendors &&
                        this.state.categories[0].vendors.map((item, index) => {
                          return (
                            <Col sm="6" md="6" lg="4" key={index}>
                              <CategoryCard data={item} isCompare={this.state.isCompare} />
                            </Col>
                          );
                        })
                      }
                      <Col sm="6" md="6" lg="4">
                        <div className={styles.addNew}>
                          <div className={styles.addBtn}> + </div>
                        </div>
                      </Col>

                    </Row>
                  </Col>
                </Row>
            }
          </Container>
          {/* <Container>
            <Row>
              <Col className="mb-4">
                <h2 className="text-center">Browse all vendors</h2>
                <p className={styles.subTitle}>Handpicked collection of vendors for the wedding</p>
              </Col>
            </Row>
            <Row>
              <Col>
                {this.props.ceremonyLoading && <LoaderComponent />}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col className="no-padding">
                <HorizontalSlider data={this.state.fixedCategories} type='small' buttonAction={this.handleCategoryChange} />
              </Col>
            </Row>
            {
              this.state.categories.map((category, index) => {
                return (
                  <CategorySection category={category} key={index} dispatch={this.props.dispatch} />
                );
              })
            }
          </Container> */}
        </div>
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
