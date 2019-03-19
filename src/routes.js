import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import { isLoggedIn } from '../src/utils/utilities';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './modules/home/Home'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableProducts = Loadable({
  loader: () => import(/* webpackChunkName: 'category' */ './modules/products/Products'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableCategoryListing = Loadable({
  loader: () => import(/* webpackChunkName: 'category' */ './modules/categoryListing/CategoryListing'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableExclusiveDeals = Loadable({
  loader: () => import(/* webpackChunkName: 'exclusiveDeals' */ './modules/exclusiveDeals/ExclusiveDeals'),
  loading() {
    return <div>Loading...</div>;
  }
});

// const LoadablePlanningTool = Loadable({
//   loader: () => import(/* webpackChunkName: 'exclusiveDeals' */ './modules/planningTool/PlanningTool'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

const LoadableCartPage = Loadable({
  loader: () => import(/* webpackChunkName: 'exclusiveDeals' */ './modules/cartPage/CartPage'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableSample = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'home' */ './modules/sample/Sample'),
  loading() {
    return <div>Loading...</div>;
  }
});

// const LoadableAbout = Loadable({
//   loader: () => import(/* webpackChunkName: 'about' */ './modules/about/About'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

const LoadableLogin = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ './modules/login/Login'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ './modules/detailPage/detailPageComponent'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableNotFound = Loadable({
  loader: () => import(/* webpackChunkName: 'notFound' */ './modules/notFound/NotFound'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableCeremonyDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'planyourparty' */ './modules/ceremonyDetail/CeremonyDetail'),
  loading() {
    return <div>Loading...</div>;
  }
});
const LoadableTermsAndConditions = Loadable({
  loader: () => import(/* webpackChunkName: 'termsandconditions' */ './modules/TermsAndConditions/termsAndConditions'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableMyProfile = Loadable({
  loader: () => import(/* webpackChunkName: 'planyourparty' */ './modules/myProfile/MyProfile'),
  loading() {
    return <div>Loading...</div>;
  }
});

const PrivatePage = () => <div> private Page </div>;

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       isLoggedIn() ?
       (
        <Component {...props} />
      ) : (
         <Redirect to="/?login=true" />
        // <Redirect to={{
        //   pathname: '/?login=true',
        //   state: { from: props.location }
        // }} />
      )
    }
  />
);

SecretRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
};

const routes = (
  // <Suspense fallback={<Loading />}>
  <Switch>
    <Route exact path="/login" component={LoadableLogin} />
    <Route exact path="/" component={LoadableHome} />
    <Route exact path="/verify" component={LoadableHome} />
    <Route exact path="/resetpassword" component={LoadableHome} />
    <Route exact path="/categories/:category_name" component={LoadableProducts} />
    <Route exact path="/categories" component={LoadableCategoryListing} />
    <Route exact path="/packages" component={LoadableExclusiveDeals} />
    {/* <Route exact path="/plan-your-party" component={LoadablePlanningTool} /> */}
    <Route exact path="/wishlist" component={LoadableCartPage} />
    {/* <Route path="/about" component={LoadableAbout} /> */}
    <Route path="/sample" component={LoadableSample} />
    <Route path="/ceremonies/:ceremony_name" component={LoadableCeremonyDetail} />
    <Route path="/:category_name/:vendor_name" component={LoadableDetail} />
    <Route exact path="/terms-and-conditions" component={LoadableTermsAndConditions} />
    <SecretRoute path="/dashboard" component={PrivatePage} />
    <Route path="/profile" component={LoadableMyProfile} />
    <Route component={LoadableNotFound} />
  </Switch>
  // </Suspense>
);

export default routes;
