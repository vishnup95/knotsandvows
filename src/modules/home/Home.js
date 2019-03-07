import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';

import styles from './home.scss';
import * as actions from './actions';
import CarouselComponent from './carousel';
import JumbotronComponent from '../../components/Jumbotron/jumbotron';
import PackageComponent from './packageComponent';
import HorizontalMultiCarousel from './multiCarouselHorizontal';
import VerticalMultiCarousel from './multiCarouselVertical';

const jumbotronData = [
  {
    title: 'Start planning your wedding!',
    subtitle: "Find and book your dream team of local vendors based on your style and budget"
  },
  {
    title: 'Overbound With Choices?',
    subtitle: 'You will be looking for ideas, and all exciting but there are so many that you realise how much planning you need to do and basically we offering the in packages so that also preferred '
  },
  {
    title: 'We are here for you',
    subtitle: 'From helping you select vendors to planning all your ceremonies we will be with you every step of the way'
  },
  {
    title: 'Need Help?',
    buttonText: 'Talk with wedding planner',
    subtitle: 'Let our expert party planners help with fantastic ideas to make your event great. Talk to one of our expert planners by click the Chat button below and theyâ€™ll help you get your party started.'
  },
  {
    title: 'Joining With Us Is Quick and Easy',
    buttonText: 'Join as Vendor',
    subtitle: 'Ahwanam provides a full-service platform for listing services. get leads, send quotes, and collect payments all in one place.'
  }
];

const staticData = [
  {
    title: 'Browse all vendors',
    description: 'Guaranteed best prices from all our vendors',
    image: '/images/home_static1.jpg',
  },
  {
    title: 'Wedding Dashboard',
    description: 'Add to wishlist, compare services, share ideas with family, finalize vendors and more!',
    image: '/images/home_static2.jpg',
  },
  
];

const mapStateToProps = state => ({
  user: state.session.user,
  categories: state.home.categories,
  exclusives: state.home.exclusives,
  ceremonies: state.home.ceremonies
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
    promises.push(store.dispatch(actions.fetchExclusives()));
    promises.push(store.dispatch(actions.fetchCeremonies()));
    return Promise.all(promises);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillMount() {
    if (this.props.exclusives.length === 0) {
      this.props.dispatch(actions.fetchExclusives());
    }
    if (this.props.ceremonies.length === 0) {
      this.props.dispatch(actions.fetchCeremonies());
    }
  }

  navigateTo(route) {
    this.props.dispatch(push(route));
  }

  handleCeremonyClick = (ceremony) => {
    console.log(ceremony.page_name);
  }

  render() {
    return (
      <div>
        <CarouselComponent />
    
        <JumbotronComponent data={jumbotronData[0]} bgcolor="#ffffff">
          <Row>
            <Col xs="12" sm="5" className="no-padding no-margin">
              {
                staticData.map((item, index) => {
                  return(
                    <div key={index} className={styles.staticItem} style={{ backgroundImage: `url(${item.image})`}} 
                      onClick={() => this.navigateTo('/categories')} aria-hidden>
                      <h4>{item.title}</h4>
                      <p className={styles.pSmall}>{item.description}</p>
                    </div>
                  );
                })
              }
            </Col>
            <Col xs="12" sm="7" className="no-padding" style={{margin: '-10px 0'}}>
              <VerticalMultiCarousel ceremonies={this.props.ceremonies} onSelect={(ceremony) => this.handleCeremonyClick(ceremony)}/>
            </Col>
          </Row>
        </JumbotronComponent>

        <JumbotronComponent data={jumbotronData[1]} bgcolor="#ffffff">
          <div>
            {this.props.exclusives.map((exclusivePackage, index) => {
              return <PackageComponent key={index} details={exclusivePackage}/>;
            })}
          </div>     
        </JumbotronComponent>

        <JumbotronComponent data={jumbotronData[2]} bgcolor="#fef9f9" insideContainer={false}>
          <HorizontalMultiCarousel/>
        </JumbotronComponent>

        {/* <JumbotronComponent data={jumbotronData[3]} bgcolor="#ffffff" isTalkToAhwanam={true} /> */}
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  categories: PropTypes.array,
  exclusives: PropTypes.array,
  ceremonies: PropTypes.array,
  router: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);