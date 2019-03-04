import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { imagePath } from '../../utils/assetUtils';
import * as actions from './actions';
import ReactPaginate from 'react-paginate';
import { 
  Container, 
  Row, 
  Col,
  FormGroup,
  Input
} from 'reactstrap';

import styles from './products.scss';
import CategoryCard from '../../components/Card/cardCategory';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import FormComponent from './forms';
import NoResultComponent from '../../components/noResult/noResult';

const mapStateToProps = state => ({
  user: state.session.user,
  productListData: state.products.productListData,
  filterData: state.products.filterData,
  other_categories: state.products.other_categories
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = [
  {
      title: 'Other Categories'
  }
];


class Products extends Component {
  state = {currentCategory: this.props.match.params.category_name}

  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchProducts(this.selectedCategory()));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  selectedCategory(){
    return this.props.match.params.category_name;
  }

  componentWillMount() {
    let category = this.selectedCategory();
    this.props.dispatch(actions.fetchProducts(category));
    this.props.dispatch(actions.fetchFilters(category));
    this.props.dispatch(actions.fetchOtherCategories(category));
  }

  componentDidUpdate(prevProps) {
    if(prevProps == undefined) {
        return false;
    }

    if (this.state.currentCategory !== this.props.match.params.category_name) {
      let category = this.selectedCategory();
      this.props.dispatch(actions.fetchProducts(category));
      this.props.dispatch(actions.fetchFilters(category));
      this.props.dispatch(actions.fetchOtherCategories(category));
      this.setState({currentCategory: category});
    }
  }

  pageChangeHandler(data){
    let category = this.selectedCategory();
    this.props.dispatch(actions.fetchProducts(category, data.selected+1));
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  render() {
    const {header, sort_options, filters} = this.props.filterData;
    return(
      <div>
        <div className={` ${styles.categoryCover} position-relative text-center`} style={{ background: "url(" + imagePath('wedding_venue.jpg') + ")", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <h1 className={styles.imageHeading}>{header ? header.header_text : ''}</h1>
        </div>

        {filters.length > 0 ? <FormComponent filters={filters} selectedCategory={this.state.currentCategory}/> : <div></div>}

        {
          this.props.productListData == null || this.props.productListData.results.length === 0 ? <NoResultComponent/> :
          
          <Container className={`${styles.listContainer} mt-4 pb-5`}>
            <Row className="mb-3">
              <Col sm="6" className={styles.sideHeading}>
                Wedding Venues in all cities
                <span>&nbsp;({this.props.productListData.total_count} results)</span>
              </Col>
              <Col sm="6" className={styles.sort}>
                Sort By: &nbsp;
                <FormGroup className="d-inline-block">
                  <Input type="select" name="select" id="exampleSelect" className={styles.sortSelect}>
                      {sort_options.map((item, index) => {
                          return(
                              <option key={index}>{item.name}</option>
                          );
                      })}
                  </Input>
                </FormGroup>

              </Col>
            </Row>
            
            <Row>
              {
                this.props.productListData.results.map((product, index) => {
                  return(
                    <Col xs="12" sm="4" key={index}>
                      <CategoryCard data={product} buttonAction={() => this.navigateTo(`/${this.selectedCategory()}/${product.page_name}`)}/>
                    </Col>
                  );
                })
              }
            </Row>

            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.props.productListData.no_of_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(data) => this.pageChangeHandler(data)}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}/>

          </Container>
        }
        
        <JumbotronComponent data={jumbotronData[0]} items={this.props.other_categories} cardType="plain" bgcolor="#f8f8f8"/>
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
  match: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

