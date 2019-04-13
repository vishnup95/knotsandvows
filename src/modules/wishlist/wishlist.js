import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import * as actions from './actions';
import * as modalActions from '../../reducers/modal/actions';
import { Container, Row, Col, Modal, Collapse } from 'reactstrap';
import styles from './wishlist.scss';
import LoaderComponent from '../../components/Loader/loader';
import CategoryCard from '../../components/Card/cardCategory';
import { imagePath } from '../../utils/assetUtils';
import { hyphonatedString } from '../../utils/utilities';
import CompareProduct from '../../components/compareProduct/compareProduct';
import AddCollabratorModal from './addCollabrator'
import modalStyles from '../../modals/forgotPasswordModal/forgotPasswordModal.scss';

const mapStateToProps = state => ({
  wishlistLoading: state.wishlist.loading,
  myWishListData: state.wishlist.wishListData
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const wishlist = ["My list"];

class CategoryListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWishListCategories: [],
      selectedVendor: 0,
      isCompare: false,
      modal: false,
      collapse: [true, false, false],
      vendorSelectedToCompare: [],
      showAddCollabrator : false
    }
    this.toggle = this.toggle.bind(this);
  }
  
  static fetchData(store) {
    return store.dispatch(actions.fetchMyWishlist());
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchMyWishlist());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myWishListData !== null && nextProps.myWishListData.wishlistitems) {
      this.setState({myWishListCategories: nextProps.myWishListData.wishlistitems});
    }
  }

  toggle() {
    if (this.state.modal){
      this.setState({ modal: false});
    }else if (this.state.vendorSelectedToCompare.length > 1){
      this.setState({ modal: true});
    }
  }

  toggleAddCollabratorModal = () => {
      this.setState({ showAddCollabrator: !this.state.showAddCollabrator});
  }

  toggleCollapse(toggleIndex) {
    this.setState({collapse: this.state.collapse.map( (item, index) => index === toggleIndex ? !item : false)});
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCategoryChange = (index) => {
    this.setState({selectedVendor: index, vendorSelectedToCompare:[]});
  }

  setCompare = () => {

    this.setState({ isCompare: !this.state.isCompare, vendorSelectedToCompare:[]});
  }

  addToCompare = (vendor, isRemoving) => {
    var newArray = [];
    if (isRemoving){
      newArray = this.state.vendorSelectedToCompare.slice();
      newArray.splice(newArray.indexOf(vendor),1)
      this.setState({vendorSelectedToCompare: newArray, modal: newArray.length == 0 ? false : this.state.modal});
      return
    }
    if (this.state.vendorSelectedToCompare.length < 3){
      newArray = this.state.vendorSelectedToCompare.slice();    
      newArray.push(vendor); 
      this.setState({vendorSelectedToCompare: newArray});
    }
  }

  checkIfSelectedForComparison = (vendor) => {
    if (this.isCompare == false) {
      return false;
    }
    let isChecked = this.state.vendorSelectedToCompare.some( vendorSelected => vendorSelected.vendor_id === vendor.vendor_id);
    return isChecked;
  }

  renderCompareVendors = (vendors) => {
    const compareVendors = vendors.map((vendor, index) => {

      return <CompareProduct data={vendor} key={index} dispatch={this.props.dispatch} removeAction={(vendor) => this.addToCompare(vendor, true)}/>

  });
  return compareVendors;
  }

  removeCollaborator(collaborator) {
    this.props.dispatch(actions.removeCollabrator(collaborator))
  }

  confirmRemoveCollaborator = (collaborator) => {
    let modalContent = {
      heading: 'Remove Collaborator',
      message: 'Are you sure you want to remove this collaborator?',
      proceedAction: () => this.removeCollaborator(collaborator)
    };
    this.props.dispatch(modalActions.showModal(modalContent));
  }

  render() {
    return (
      <div className="full-height" style={{ marginTop: '14rem' }}>
        <div className="wishlist-container">
          <Container>
            {
              this.props.wishlistLoading &&
              <div className="row">
                <div className="col-12">
                  <LoaderComponent />
                </div>
              </div>
            }

            {
              this.state.myWishListCategories.length > 0 &&
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
                                this.state.myWishListCategories.map((item, index) => {
                                  return (
                                    <li key={index} className={`${styles.listItem} ${this.state.selectedVendor === index ? styles.active : ''}`} onClick={() => this.handleCategoryChange(index)} aria-hidden>
                                      {item.category_name}
                                    </li>
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
                      { this.props.myWishListData.collaborators && this.props.myWishListData.collaborators.map((collaborator, index) => {
                        return(
                          <div className={styles.collaborator} key={index} aria-hidden onClick={() => this.confirmRemoveCollaborator(collaborator.collabrator_id)}>
                          NU
                          <div className={styles.toolTip}>Remove {collaborator.email} from list</div>
                        </div>
                        ); 
                      })}
                      
                      <div className={styles.collaboratorCount}>
                        {(this.props.myWishListData.collaborators && this.props.myWishListData.collaborators.length) || 0}
                      </div>
                      <div className={styles.addCollaborator} onClick={this.toggleAddCollabratorModal} aria-hidden></div>
                    </Col>
                  </Row>
                  <Row className={styles.listDetailContainer}>
                    <Col>
                      <Row>

                        {
                          this.state.myWishListCategories.length > 0 &&
                          <Col className="text-left">
                            <span className={styles.vendorName}>{this.state.myWishListCategories[`${this.state.selectedVendor}`].category_name}</span>
                            {!this.state.isCompare && <button className="text-btn small" onClick={() => this.setCompare()}>Compare {this.state.myWishListCategories[`${this.state.selectedVendor}`].category_name}</button>}
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
                          <Col xs="12" className={styles.selectedCount}>You are selected {this.state.vendorSelectedToCompare.length} of 3 vendors.</Col>
                        </Row>
                      }
                      <Row>
                        {this.state.myWishListCategories[this.state.selectedVendor].vendors.map((item, index) => {
                            !item.notes ? item.notes = [] : item.notes;
                            let category = hyphonatedString(this.state.myWishListCategories[this.state.selectedVendor].category_name, this.state.myWishListCategories[this.state.selectedVendor].category_id);
                            
                            return (
                              <Col sm="6" md="6" lg="4" key={index}>
                                <CategoryCard data={item} category={category} isChecked={this.checkIfSelectedForComparison(item)} selectedToCompare={(vendor,isRemoving) => this.addToCompare(vendor,isRemoving)} isCompare={this.state.isCompare} isWishlist={true} id={index} />
                              </Col>
                            );
                          })
                        }
                        <Col sm="6" md="6" lg="4">
                          <div className={styles.addNew} aria-hidden
                            onClick={() => this.navigateTo(`/categories/${hyphonatedString(this.state.myWishListCategories[this.state.selectedVendor].category_name, this.state.myWishListCategories[this.state.selectedVendor].category_id)}`)}>
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
                      {this.renderCompareVendors(this.state.vendorSelectedToCompare)}
                      {this.state.vendorSelectedToCompare.length < 3 && 
                      <Col sm="6" md="6" lg="4">
                        <div className={styles.addNew}>
                          <button className={styles.addBtn} onClick={this.toggle}></button>
                        </div>
                      </Col>}
                    </Row>
                  </Col>
                </Row>
              </div>
            </Modal>
            <Modal isOpen={this.state.showAddCollabrator} toggle={this.toggleAddCollabratorModal} className={modalStyles.forgotContainer} centered={true}>
                    <AddCollabratorModal close={this.toggleAddCollabratorModal}></AddCollabratorModal>
                </Modal>
          </Container>
        </div>
      </div>
    );
  }
}

CategoryListing.propTypes = {
  user: PropTypes.object,
  wishlistLoading: PropTypes.bool,
  myWishListData: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListing);
