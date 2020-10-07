import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/Actions/index';
import AsyncComponent from './HOC/asyncComponent';

const asyncCheckout = AsyncComponent(() => import('./containers/Checkout/Checkout'));

const asyncOrders = AsyncComponent(() => import('./containers/Orders/Orders'));

const asyncAuth = AsyncComponent(() => import('./containers/Auth/Auth'));



class App extends Component {
  componentDidMount() {
    this.props.TryAutoSignin();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />  
          <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuth ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} /> 
          <Redirect to="/" />
      </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    TryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
