import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import AuthService from './services/auth-service';
import PropTypes from 'prop-types';

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

// const LoadableCheckout = Loadable({
//   loader: () => import(/* webpackChunkName: 'exclusiveDeals' */ './modules/checkout/Checkout'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

const LoadableSample = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'home' */ './modules/sample/Sample'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableAbout = Loadable({
  loader: () => import(/* webpackChunkName: 'about' */ './modules/about/About'),
  loading() {
    return <div>Loading...</div>;
  }
});

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

const LoadableVerifyEmail = Loadable({
  loader: () => import(/* webpackChunkName: 'login' */ './modules/verifyEmail/VerifyEmail'),
  loading() {
    return <div>Loading...</div>;
  }
});

const LoadableResetPassword = Loadable({
  loader: () => import(/* webpackChunkName: 'resetpassword' */ './modules/resetPassword/ResetPassword'),
  loading() {
    return <div>Loading...</div>;
  }
});

// const LoadableBookingConfirmation = Loadable({
//   loader: () => import(/* webpackChunkName: 'login' */ './modules/bookingConfirmation/BookingConfirmation'),
//   loading() {
//     return <div>Loading...</div>;
//   }
// });

const PrivatePage = () => <div> private Page </div>;

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      AuthService.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/?login=true" />
      )
    }
  />
);

SecretRoute.propTypes = {
  component: PropTypes.func
};

const routes = (
  // <Suspense fallback={<Loading />}>
  <Switch>
    <Route exact path="/login" component={LoadableLogin} />
    <Route exact path="/" component={LoadableHome} />
    <Route exact path="/verify" component={LoadableVerifyEmail} />
    <Route exact path="/resetpassword" component={LoadableResetPassword} />
    <Route exact path="/category/:category_name" component={LoadableProducts} />
    <Route exact path="/categories" component={LoadableCategoryListing} />
    <Route exact path="/exclusive" component={LoadableExclusiveDeals} />
    {/* <Route exact path="/plan-your-party" component={LoadablePlanningTool} /> */}
    <Route exact path="/wishlist" component={LoadableCartPage} />
    {/* <Route exact path="/checkout" component={LoadableCheckout} /> */}
    <Route path="/about" component={LoadableAbout} />
    <Route path="/sample" component={LoadableSample} />
    <Route path="/detail" component={LoadableDetail} />
    {/* <Route path="/booking-confirmation" component={LoadableBookingConfirmation} /> Will change to secret route  */}
    <SecretRoute path="/dashboard" component={PrivatePage} />
    <Route component={LoadableNotFound} />
  </Switch>
  // </Suspense>
);

export default routes;
