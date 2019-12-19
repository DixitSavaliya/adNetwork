import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import history from './history';

import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import api from './redux/middleware/api';
const middleware = [thunk, api];
import reducers from './redux/reducers';
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

import Auth from './redux/Auth'
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
// Containers
import Full from './redux/containers/Full'

// Views
import Login from './redux/containers/login';
import AdminLogin from './redux/containers/adminlogin'
import Register from './redux/containers/register'
import ForgotPassword from './redux/containers/forgot'

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" name="Login Page" component={Login} />
                <Route exact path="/admin/" name="AdminLogin Page" component={AdminLogin} />
                <Route exact path="/register" name="Register Page" component={Register} />
                <Route exact path="/forgot-password" name="Forgot Password" component={ForgotPassword} />
                <PrivateRoute path="/" name="Home" component={Full} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
