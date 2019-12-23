import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getPublisherApplication} from '../actions/monetization'
// import { createApp,getAppDataById,editApp} from '../actions/createapp';
import CustomAds from '../../views/customads/customads';

class CustomAdsContainer extends Component {
    
    transferToDashboardIfLoggedIn(){
        if (!this.props.auth.auth_data.access_token){
            this.props.history.push(this.props.from || {pathname: '/login'});
        }
    }

    componentWillMount() {
        this.transferToDashboardIfLoggedIn();
    }
    
    componentDidUpdate() {        
        this.transferToDashboardIfLoggedIn();
    }

    componentDidMount() {
    }

    render() {
      const {auth,getPublisherApplication} = this.props;
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <CustomAds auth={auth} getPublisherApplication={getPublisherApplication}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getPublisherApplication:(data) => dispatch(getPublisherApplication(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomAdsContainer));