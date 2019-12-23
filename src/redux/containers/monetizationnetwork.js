import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getPublisherApplication,AddAppMonetization,getAPPMonetization,updateAppMonetization} from '../actions/monetization';
import MonetizationNetwork from '../../views/monetizationnetwork/monetizationnetwork';

class MonetizationNetworkContainer extends Component {
    
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
      const {auth,getPublisherApplication,AddAppMonetization,getAPPMonetization,updateAppMonetization} = this.props;
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <MonetizationNetwork auth={auth} getPublisherApplication={getPublisherApplication} AddAppMonetization={AddAppMonetization} getAPPMonetization={getAPPMonetization} updateAppMonetization={updateAppMonetization}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getPublisherApplication:(data) => dispatch(getPublisherApplication(data)),
    AddAppMonetization:(data) => dispatch(AddAppMonetization(data)),
    getAPPMonetization:(data) => dispatch(getAPPMonetization(data)),
    updateAppMonetization:(data) => dispatch(updateAppMonetization(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MonetizationNetworkContainer));