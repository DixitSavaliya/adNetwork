import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {getPublisherApplication} from '../actions/monetization';

import Notifications from '../../views/notifications/notifications';
import Auth from '../Auth';

class NotificationContainer extends Component {

    transferToDashboardIfLogout() {
        console.log("props", this.props);
        if (!this.props.auth.auth_data.access_token) {
            this.props.history.push(this.props.from || {pathname: '/login'});
        }
    }
    componentWillMount() {
        this.transferToDashboardIfLogout();
    }
    componentDidUpdate() {
        this.transferToDashboardIfLogout();
    }

    componentDidMount() {
      
    }

    render() {
        const { auth,getPublisherApplication } = this.props;
        return (
            <Notifications auth={auth} getPublisherApplication={getPublisherApplication} {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    getPublisherApplication: (data) => dispatch(getPublisherApplication(data)),
   
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
