import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { login,getUser } from '../actions/auth';

import LoginForm from '../../views/Pages/Login/Login';
import Auth from '../Auth';

class Login extends Component {
    
    transferToDashboardIfLoggedIn(){
        if (this.props.auth.auth_data.access_token){
            this.props.history.push(this.props.from || {pathname: '/'});
        }
    }

    componentWillMount() {
        this.transferToDashboardIfLoggedIn();
    }
    
    componentDidUpdate() {        
        this.transferToDashboardIfLoggedIn();
    }

    componentDidMount() {
        const { login } = this.props;
        // const auth = Auth.getAuth();
        // if (auth && auth.access_token) {
        //     login();
        // }
    }

    render() {
      const { auth, login, getUser } = this.props;
      return (
        <LoginForm auth={auth} login={login} getUser={getUser}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = (dispatch) => ({
    login:(info) => dispatch(login(info)),
    getUser:(info) => dispatch(getUser(info))
});

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Login));