import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as Profiles from '../actions/profile';
import { getUser, avatarUpload ,updateprofile } from '../actions/auth';

import Profile from '../../views/Profile/profile';
import Auth from '../Auth';

class PorfileContainer extends Component {

    transferToDashboardIfLogout() {
        console.log("props", this.props);
        if (!this.props.auth.auth_data.access_token) {
            this.props.history.push(this.props.from || { pathname: '/login' });
        }
    }
    componentWillMount() {
        this.transferToDashboardIfLogout();
    }
    componentDidUpdate() {
        this.transferToDashboardIfLogout();
    }

    componentDidMount() {
        this.props.getUser(this.props.auth.auth_data.id);
      
    }

    render() {
        const { auth, profile, avatarUpload ,avtar,updateprofile} = this.props;
        console.log("render() this.props", this.props)
        return (
            <Profile auth={auth} profile={profile} avtar={avtar} avatarUpload={avatarUpload} updateprofile={updateprofile}/>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.auth.user,
    avtar: state.auth.avtar
})

const mapDispatchToProps = (dispatch) => ({
    getUser: (data) => dispatch(getUser(data)),
    avatarUpload: (data) => dispatch(avatarUpload(data)),
    updateprofile:(data) => dispatch(updateprofile(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PorfileContainer);
