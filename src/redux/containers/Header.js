import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../actions/auth';

import Header from '../../components/Header/Header';

class HeaderContainer extends Component {
    transferToDashboardIfLogout(){
        if (!this.props.auth.auth_data.access_token){
            this.props.history.push(this.props.from || { pathname: '/login' });
        }
    }
    componentWillMount() {
        if (!this.props.auth.auth_data.access_token){
            this.transferToDashboardIfLogout();
        }
    }
    componentDidUpdate() {
        if (!this.props.auth.auth_data.access_token){
            this.transferToDashboardIfLogout();
        }
    }

    render() {
      const { auth, logout } = this.props;

        return (
            <Header auth={auth} logout={logout} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
    logout:() => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderContainer));
