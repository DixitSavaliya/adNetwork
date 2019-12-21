import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { createApp,getAppDataById,editApp} from '../actions/createapp';
import Publisher from '../../views/Publisher/publisher';

class PublisherContainer extends Component {
    
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
      const {auth} = this.props;
      console.log("props",this.props);
    //   this.id = this.props.location.pathname.split('/')[2];
      return (
        <Publisher auth={auth}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    // createApp:(data) => dispatch(createApp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublisherContainer));