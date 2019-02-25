import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import { InputGroup, Button, InputGroupAddon, Input, Jumbotron, Container, Row, Col } from 'reactstrap';
import styles from './categoryListing.scss';
import * as actions from '../home/actions';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import NoResultComponent from '../../components/noResult/noResult';
import CardComponent from '../../components/Card/card';

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.home.categories,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});

const jumbotronData = {
  title: 'Need Help?',
  buttonText: 'Chat With Ahwanam',
  subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
};
  
class CategoryListing extends Component {
  state = {filteredItems : [], searchTerm: ''};
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    return store.dispatch(actions.fetchCategories());
  }

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.dispatch(actions.fetchCategories());
    } else {
      this.setState({filteredItems: this.props.categories});
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filteredItems: nextProps.categories});
  }

  onSearchInputChange(e) {
    this.setState({searchTerm: e.target.value});

    if (e.target.value.length === 0) {
      this.setState({ filteredItems: this.props.categories });    
    } else {
      let filteredItems = this.props.categories.filter((item) => {
        let itemName = item.name.toLowerCase();
        return itemName.indexOf(
          e.target.value.toLowerCase()) !== -1
      });
  
      this.setState({filteredItems});
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  render() {
    return (
      <div style={{marginTop:'6.0625rem'}}>
        <Jumbotron className="mb-0 bg-white">
            <h1 className="text-center">Browse Categories</h1>
            <hr className="mt-3 mb-5" />

            <InputGroup className={styles.searchField}>
              <Input bsSize="lg" placeholder="Search Categories" onChange={(event) => this.onSearchInputChange(event)} value={this.state.searchTerm}/>
              <InputGroupAddon addonType="append">
                <Button color="danger"></Button>
              </InputGroupAddon>
            </InputGroup>

            {
              this.state.filteredItems.length === 0 ? <NoResultComponent/> : 

              <Container>
                <Row>
                  {
                    this.state.filteredItems.map((item, index) => {
                      return  <Col xs="12" sm="4" key={index}>
                                <CardComponent cardDetails={item} cardType="plain"/>
                              </Col>
                    })
                  }
                </Row>
              </Container>
            }

        </Jumbotron>

        <JumbotronComponent  data={jumbotronData} bgcolor="#f8f8f8" />
      </div>
    );
  }
}

CategoryListing.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  router: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListing);
