import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import * as actions from '../ceremonyDetail/actions';
import { Container, Row, Col, Modal, Collapse } from 'reactstrap';
import styles from './wishlist.scss';
import LoaderComponent from '../../components/Loader/loader';
import CategoryCard from '../../components/Card/cardCategory';
import { imagePath } from '../../utils/assetUtils';
import CompareProduct from '../../components/compareProduct/compareProduct';

const mapStateToProps = state => ({
  ceremonyDetails: state.ceremonyDetails.details,
  ceremonyLoading: state.ceremonyDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const wishlist = ["My list", "Second List", "Third List"];

class CategoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      fixedCategories: [],
      selectedVendor: 0,
      isCompare: false,
      modal: false,
      collapse: [true, false, false]
    }
    this.toggle = this.toggle.bind(this);
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
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleCollapse(toggleIndex) {
    this.setState({collapse: this.state.collapse.map( (item, index) => index === toggleIndex ? !item : false)});
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
        <div className="wishlist-container">
          <Container>
            {
              this.props.ceremonyLoading &&
              <div className="row">
                <div className="col-12">
                  <LoaderComponent />
                </div>
              </div>
            }

            {
              this.state.fixedCategories.length > 0 &&
              <Row>
                <Col sm="2">
                  {
                    wishlist.map((item, index) => {
                      return (
                        <div key={index} className="mb-4">
                          <div className={styles.listTitle} onClick={() => this.toggleCollapse(index)} aria-hidden>{item}</div>
                          <Collapse isOpen={this.state.collapse[index]}>
                            <ul className={styles.vendorList}>
                              {
                                this.state.fixedCategories.map((k, index) => {
                                  return (
                                    <li key={index} className={`${styles.listItem} ${this.state.selectedVendor === index ? styles.active : ''}`} onClick={() => this.handleCategoryChange(index)} aria-hidden>{k.name}</li>
                                  );
                                })
                              }
                            </ul>
                          </Collapse> 
                        </div>
                      );
                    })
                  }

                </Col>
                <Col sm="10">
                  <Row>
                    <Col className={`${styles.collaboratorList} text-right`}>
                      <div className={styles.collaborator}>YA<div className={styles.toolTip}>Remove from list</div></div>
                      <div className={styles.collaborator}>YA<div className={styles.toolTip}>Remove from list</div></div>
                      <div className={styles.collaborator}>YA<div className={styles.toolTip}>Remove from list</div></div>
                      <div className={styles.collaborator}>YA<div className={styles.toolTip}>Remove from list</div></div>
                      <div className={styles.collaboratorCount}>5</div>
                      <div className={styles.addCollaborator}></div>
                    </Col>
                  </Row>
                  <Row className={styles.listDetailContainer}>
                    <Col>
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
                            <button className="primary-button" onClick={() => this.toggle()}>Compare Vendors</button>

                          </Col>
                        }
                      </Row>
                      {
                        this.state.isCompare &&
                        <Row>
                          <Col xs="12" className={styles.subText}>Choose two vendors of your choice to see how they compare on price, rating, and specialities. </Col>
                          <Col xs="12" className={styles.selectedCount}>You are selected lorem ipsum of 3 vendors.</Col>
                        </Row>
                      }
                      <Row>
                        {this.state.categories[0] && this.state.categories[0].vendors &&
                          this.state.categories[0].vendors.map((item, index) => {
                            return (
                              <Col sm="6" md="6" lg="4" key={index}>
                                <CategoryCard data={item} isCompare={this.state.isCompare} isWishlist={true} id={index} />
                              </Col>
                            );
                          })
                        }
                        <Col sm="6" md="6" lg="4">
                          <div className={styles.addNew}>
                            <div className={styles.addBtn}></div>
                          </div>
                        </Col>

                      </Row>
                    </Col>
                  </Row>
                  <Row className={styles.contribution}>
                    <Col xs='12' className={styles.subText}>
                      View Collaborators Contribution
                    </Col>
                    <Col xs='12'>
                      <h5>
                        Ganesh S added following vendors in your wishlist</h5>
                      <div className={styles.contributionList}>
                        <span>Venues(4)</span>
                        <span>Venues(4)</span>
                        <span>Venues(4)</span>

                      </div>
                    </Col>
                    <Col xs='12'>
                      <h5>
                        Ganesh S added following vendors in your wishlist</h5>
                      <div className={styles.contributionList}>
                        <span>Venues(4)</span>
                        <span>Venues(4)</span>
                        <span>Venues(4)</span>

                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

            }
            <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true} className={styles.comparePopup}>
              <div className={styles.compareContainer}>
                <h3>Compare Vendors</h3>
                <div className={styles.closeBtn}>
                  <img src={imagePath('close-large.svg')} alt="close button" aria-hidden onClick={this.toggle} />
                </div>
                <hr />
                <Row>
                  <Col sm="1">
                    <div className={styles.label}>
                      Price
                    </div>
                    <div className={styles.label}>
                      Rating
                    </div>
                    <div className={styles.label}>
                      Gallery
                    </div>
                  </Col>
                  <Col sm="11">
                    <Row>
                      <CompareProduct />
                      <CompareProduct />
                      <Col sm="6" md="6" lg="4">
                        <div className={styles.addNew}>
                          <div className={styles.addBtn}></div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Modal>
          </Container>
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
