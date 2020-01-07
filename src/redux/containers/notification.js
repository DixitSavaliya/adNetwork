import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {getPublisherApplication} from '../actions/monetization';
import {sendNotification} from '../actions/notification';
import {removeImage} from '../actions/auth';
import Notifications from '../../views/notifications/notifications';
import Auth from '../Auth';

class NotificationContainer extends Component {

    transferToDashboardIfLogout() {
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
        const { auth,getPublisherApplication,sendNotification,removeImage } = this.props;
        return (
            <Notifications auth={auth} getPublisherApplication={getPublisherApplication} {...this.props} sendNotification={sendNotification} removeImage={removeImage}/>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    getPublisherApplication: (data) => dispatch(getPublisherApplication(data)),
    sendNotification:(data) => dispatch(sendNotification(data)),
    removeImage:(data) => dispatch(removeImage(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
