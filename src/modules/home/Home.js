import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import styles from './home.scss';
import * as actions from './actions';
import { imagePath } from '../../utils/assetUtils';
import CarouselComponent from './carousel';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import JumbotronComponentWithCols from '../../components/Jumbotron/jumbotronWithCols';
// import ReactPaginate from 'react-paginate';

const jumbotronData = [
  {
    title: 'Exclusive Ahwanam Deals',
    buttonText: 'Ahwanam Deals',
    subtitle: "We work with some of the most budget friendly and amazing vendors/merchants in the wedding industry.  We take pride in the partnerships we have with our vendors to bring wedding deals, and savings that you won’t find anywhere else!  We’ve done the legwork for you so you can shop with confidence and score a great deal on just about anything you need for your big day. Check out our list of deals below!"
  },
  {
    title: 'Browse Categories',
    buttonText: 'View All Categories',
    subtitle: 'From wedding venue to catering, wedding florists to photographer, cake makers to chair covers, you will find plenty of local suppliers who can bring your wedding to life'
  },
  {
    title: 'Ahwanam Party Planning Tool',
    buttonText: 'Plan Your Party',
    subtitle: 'Answer a few questions and our AI platform will search over 10,000 choices to create a customized party for you!'
  },
  {
    title: 'Need Help?',
    buttonText: 'Talk with wedding planner',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and they’ll help you get your party started.'
  },
  {
    title: 'Joining With Us Is Quick and Easy',
    buttonText: 'Join as a Vendor',
    subtitle: 'Ahwanam provides a full-service platform for listing services. get leads, send quotes, and collect payments all in one place.'
  }
];

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.home.categories,
  exclusives: state.home.exclusives
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }),
  dispatch
});


class Home extends Component {
  constructor(props) {
    super(props);
  }
  static fetchData(store) {
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):

    let promises = [];
    promises.push(store.dispatch(actions.fetchCategories()));
    promises.push(store.dispatch(actions.fetchExclusives()));
    return Promise.all(promises);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (this.props.categories.length === 0) {
      this.props.dispatch(actions.fetchCategories());
    }
    if (this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchExclusives());
    }
  }

  pageChangeHandler = (data) => {
    console.log('Page index is ', data);
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  render() {
    return (
      <div>
        <CarouselComponent />
        <JumbotronComponent data={jumbotronData[0]} items={this.props.exclusives} bgcolor="#ffffff" cardType="detailed" buttonAction={() => this.navigateTo('/exclusive')} />

        <JumbotronComponent data={jumbotronData[1]} items={this.props.categories} bgcolor="#f8f8f8" cardType="plain" buttonAction={() => this.navigateTo('/categories')} />

        {/* <div className="position-relative">
          <img src={imagePath('home_hearts.png')} alt="Hearts" className={styles.hearts}/>
        </div> */}

        {/* <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={9}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => this.pageChangeHandler(data)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}

        {/* <JumbotronComponentWithCols data={jumbotronData[2]} bgcolor="#ffffff" image="planning_tool.png" buttonAction={() => this.navigateTo('/planning-tool')}/> */}
        <JumbotronComponent data={jumbotronData[3]} bgcolor="#ffffff" isTalkToAhwanam={true} />

        <div className="position-relative">
          <img src={imagePath('home_balloons.png')} alt="Balloons" className={styles.balloons} />
        </div>

        <JumbotronComponentWithCols data={jumbotronData[4]} bgcolor="#fce325" image="join_with_us.png" buttonAction={() => this.navigateTo('/exclusive')} />
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  exclusives: PropTypes.array,
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
