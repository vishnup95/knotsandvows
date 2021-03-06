import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import * as actions from './actions';
import ReactPaginate from 'react-paginate';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { InputGroup, Button, InputGroupAddon, Input } from 'reactstrap';
import { imagePath, detectMobile } from '../../utils/assetUtils';

import styles from './products.scss';
import CategoryCard from '../../components/Card/cardCategory';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import FormComponent from './newForm';
import NoResultComponent from '../../components/noResult/noResult';
import LoaderComponent from '../../components/Loader/loader';
import HorizontalScrollingCarousel from '../home/horizontalScrollingCarousal';
import Helmet from 'react-helmet';

const mapStateToProps = state => ({
  user: state.session.user,
  productListData: state.products.productListData,
  productListLoading: state.products.loading,
  filterData: state.products.filterData,
  other_categories: state.products.other_categories,
  myWishListData: state.wishlist.myWishListData,
  sharedWishlistData: state.wishlist.sharedWishListData,
  location: state.router.location
  
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = { title: 'You may also be interested in..' };


class Products extends Component {

  state = {
    category: this.props.match.params.category_name,
    productListData: null,
    sortBy: 0,
    page: 1,
    dropdownOpen: false,
    modal: true,
    search: ''
  }

  static fetchData(store, match, req) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    let page = req.query.page;
    if (!page){
      page = 1;
    }
    let promises = [];
    let category = match.params.category_name;
    promises.push(store.dispatch(actions.fetchProducts(category, page)));
    promises.push(store.dispatch(actions.fetchFilters(category)));
    promises.push(store.dispatch(actions.fetchOtherCategories(category)));
    return Promise.all(promises);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  selectedCategory() {
    // return getId(this.props.match.params.category_name);
    return this.props.match.params.category_name;
  }

  getPage(){
    var page = queryString.parse(this.props.location.search).page;
    if (!page){
      page = 1;
    }
    return page;
 }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleMobileFilter() {
    this.setState({ modal: !this.state.modal });
  }

  componentWillMount() {
    let category = this.selectedCategory();
    var page = this.getPage();
    this.props.dispatch(actions.fetchProducts(category, page));
    this.props.dispatch(actions.fetchFilters(category));
    this.props.dispatch(actions.fetchOtherCategories(category));
    this.setState({ category: category, page: page });
  }

  componentDidUpdate(prevProps) {
    if (prevProps == undefined) {
      return false;
    }
    
    if (this.state.category !== this.props.match.params.category_name) {
      let category = this.selectedCategory();
      var page = this.getPage();
      this.props.dispatch(actions.fetchProducts(category, page));
      this.props.dispatch(actions.fetchFilters(category));
      this.props.dispatch(actions.fetchOtherCategories(category));
      this.setState({ category: category, page: page, sortBy: 0, search:''});
    }else if(this.state.page != this.getPage()){
      let page = this.getPage();
      this.setState({page: page}); //Pagination handler
      this.props.dispatch(actions.fetchProducts(this.state.category,page,this.state.sortBy,this.state.search));
    }

    if (this.state.productListData !== this.props.productListData) {
      this.setState({ productListData: this.props.productListData });
      window.scrollTo(0, 0);
    }

    if(this.props.user != prevProps.user && this.props.user) {
      this.props.dispatch(actions.fetchProducts(this.state.category, this.state.page, this.state.sortBy, this.state.search));
    }
  }


  pageChangeHandler(page) {
    this.navigateTo(`/categories/${this.state.category}?page=${page.selected+1}`);
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  filterSearch = (params, category) => {
    this.navigateTo(`/categories/${category}`);
    let searchParams = queryString.stringify(params);
    this.setState({ category : category, page : 1 , modal: true, search : searchParams});
    this.props.dispatch(actions.fetchProducts(category, 1, this.state.sortBy, searchParams, false));
  }

  changeSortOption = (sortOption) => {
    // let sortOption = this.props.filterData.sort_options[event.target.selectedIndex].id;
    this.props.dispatch(actions.fetchProducts(this.state.category, 1, sortOption, this.state.search));
    this.setState({ page: 1, sortBy: sortOption });
    this.toggle();
  }

  componentWillUnmount(){
    this.props.dispatch(actions.clearVendorListData());
  }

  render() {
    const { header, filters, metatag } = this.props.filterData;
    var category = "";
    if (header && header.category_name){
      category = `All ${header.category_name}`
    }
    return (
      <div>
        {metatag &&
                <Helmet>
                <title>{metatag.title}</title>
                <meta name="description" content={metatag.description + "Page-" + (queryString.parse(this.props.location.search).page == undefined ?"1":queryString.parse(this.props.location.search).page) }/>
                <meta name="keywords" content={metatag.keywords} />
                </Helmet>
        }
        {header &&
          <div className={` ${styles.categoryCover} position-relative text-center d-none d-sm-block`} style={{ background: "url(" + header.image + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          </div>
        }

        {filters && !detectMobile() &&
          <FormComponent filters={filters} filterSearch={this.filterSearch} dispatch={this.props.dispatch} selectedCategory={this.state.category} />
        }
        {this.props.productListLoading ? <LoaderComponent /> :
          ((this.props.productListData == null || this.props.productListData.results == null|| this.props.productListData.results.length === 0) ? <NoResultComponent /> :

            <Container className={`${styles.listContainer} mt-4 pb-5`}>
              <Row className="mb-3">
                <Col sm="12">
                  <h1 className={styles.imageHeading}>{header ? header.header_text : ''}</h1>
                </Col>
              </Row>

              {filters  && detectMobile() &&
                <div>
                  <InputGroup onClick={() => this.toggleMobileFilter()} className={styles.searchField}>
                    <Input placeholder='Search your vendors' disabled/>
                    <InputGroupAddon addonType="append">
                      <Button color="danger"></Button>
                    </InputGroupAddon>
                  </InputGroup>
                  
                  <div hidden={this.state.modal}>
                    <FormComponent filters={filters} filterSearch={this.filterSearch} dispatch={this.props.dispatch} selectedCategory={this.state.category} toggle={() => this.toggleMobileFilter()}/>
                  </div>
                </div>
              }


              <Row className="mb-3">
                <Col sm="6" className={styles.sideHeading}>
                  {category}
                  {/* <span>&nbsp;({this.props.productListData.total_count} results)</span> */}
                </Col>
                {/* <Col sm="6" className={styles.sort}>
                  Sort By: &nbsp;

                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggle()} className={styles.sortDropdown}>
                    <DropdownToggle className={styles.dropHeading}
                      tag="span"
                      onClick={() => this.toggle()}
                      data-toggle="dropdown"
                      aria-expanded={this.state.dropdownOpen}>
                      {sort_options && sort_options[this.state.sortBy] ? sort_options[this.state.sortBy].name : ''}
                    </DropdownToggle>
                    <DropdownMenu className={styles.dropMenu}>
                      {
                        sort_options.map((item, index) => {
                          return <div key={index} onClick={() => this.changeSortOption(item.id)} aria-hidden
                            className={`${styles.dropItemSmall} ${index === this.state.sortBy ? styles.selectedItem : ''}`}>{item.name}</div>
                        })
                      }
                    </DropdownMenu>
                  </Dropdown>

                </Col> */}
              </Row>

              <Row>
                {
                  this.props.productListData.results.map((vendor, index) => {
                    return (
                      <Col xs="6" sm="4" key={index}>
                        <CategoryCard data={vendor} category={this.state.category} id={index}/>
                      </Col>
                    );
                  })
                }
              </Row>

              {this.props.productListData.no_of_pages && this.props.productListData.no_of_pages > 1 &&
                <ReactPaginate
                  previousLabel={<img className="rotate-left" src={imagePath('arrow-small.png')} alt="arrow-previous" />}
                  nextLabel={<img src={imagePath('arrow-small.png')} alt="arrow-next" />}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  forcePage={this.state.page - 1}
                  pageCount={this.props.productListData.no_of_pages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(data) => this.pageChangeHandler(data)}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'} 
                  hrefBuilder={(page) => `/categories/${this.state.category}?page=${page}`}/>
              }

            </Container>)
        }
        {
          !this.props.productListLoading && 
          <JumbotronComponent data={jumbotronData} items={this.props.other_categories} cardType="plain" bgcolor="#f8f8f8" containerStyle="otherWrap">
          <Col xs="12" className={`${styles.mobileCarousal} no-padding d-block d-sm-none`}>
            <HorizontalScrollingCarousel data={this.props.other_categories} type="other_categories" />
          </Col>
        </JumbotronComponent>
        }
        
      </div>
    );
  }
}

Products.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  productListData: PropTypes.object,
  filterData: PropTypes.object,
  other_categories: PropTypes.array,
  match: PropTypes.object,
  productListLoading: PropTypes.bool,
  myWishListData: PropTypes.object,
  sharedWishlistData: PropTypes.object,
  location: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

