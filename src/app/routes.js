import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated, isAdmin } from './auth';

import Home from './pages/Home';
import Belts from './pages/Belts';
import Blows from './pages/Blows';
import Exams from './pages/Exams';
import Login from './pages/Login';
import Logout from './pages/Logout';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Register';
import Profile from './pages/Profile';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated()
      ? (<Component {...props} />)
      : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
  )} />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAdmin()
      ? (<Component {...props} />)
      : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
  )} />
);

const Routes = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sair" component={Logout} />
      <PrivateRoute exact path="/exames" component={Exams} />
      <PrivateRoute exact path="/faixas" component={Belts} />
      <PrivateRoute exact path="/golpes/:faixaId" component={Blows} />
      <PrivateRoute exact path="/cadastro/:facebookId" component={Register} />
      <PrivateRoute exact path="/meus-dados" component={Profile} />
      <AdminRoute exact path="/admin/" component={Profile} />
      <Route path="*" component={PageNotFound} />
    </Switch>
);

export default Routes;
