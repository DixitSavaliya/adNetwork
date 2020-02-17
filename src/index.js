import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
// import history from './history';

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
        props.location.pathname !== '/admin/' ? (
            Auth.isUserAuthenticated() == true ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
                )
        ) : (
                Auth.isUserAuthenticated() == true ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/admin/',
                            state: { from: props.location }
                        }} />
                    )
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
// import PageNotFound from './views/Pages/Page404/Page404';

// function requireLogin() {
//     console.log("msg")
//     console.log(" Auth.isUserAuthenticated()", Auth.isUserAuthenticated());
//     console.log("props",this.props)
//     if (Auth.isUserAuthenticated() == false) {
//         this.props.history.push(this.props.from || {pathname: '/login'});
//         // browserHistory.push('#/login');
//         // hashHistory.push('/login');
//     }
// }

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/login" exact render={(props) => (
                    Auth.isUserAuthenticated() == true ? (<Redirect to="/" />) : (<Login {...props}/>)
                )} />
                <Route exact path="/admin/" exact render={(props) => (
                    Auth.isUserAuthenticated() == true ? (<Redirect to="/" />) : (<AdminLogin {...props}/>)
                )} />
                <Route exact path="/register" exact render={() => (
                    Auth.isUserAuthenticated() == true ? (<Redirect to="/" />) : (<Register />)
                )} />
                <Route exact path="/forgot-password" exact render={() => (
                    Auth.isUserAuthenticated() == true ? (<Redirect to="/" />) : (<ForgotPassword />)
                )} />
                <PrivateRoute path="/" name="Home" component={Full} />
            </Switch>
        </Router>
    </Provider>
), document.getElementById('root'));
