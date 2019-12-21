import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPublisherApplication} from '../actions/createapp';
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
      const {auth,getPublisherApplication} = this.props;
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <MonetizationNetwork auth={auth} getPublisherApplication={getPublisherApplication}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getPublisherApplication:(data) => dispatch(getPublisherApplication(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MonetizationNetworkContainer));