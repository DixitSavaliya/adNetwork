import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createApp,getAppDataById,editApp} from '../actions/createapp';
import CreateApp from '../../views/Createapp/createapp';

class CreateAppContainer extends Component {
    
    transferToDashboardIfLoggedIn(){
        if (!this.props.auth.auth_data.access_token){
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
    }

    render() {
      const {auth , createApp,getAppDataById,editApp} = this.props;
      console.log("props",this.props);
      this.id = this.props.location.pathname.split('/')[2];
      return (
        <CreateApp auth={auth} createApp={createApp} id={this.id} getAppDataById={getAppDataById} editApp={editApp}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    createApp:(data) => dispatch(createApp(data)),
    getAppDataById:(data) => dispatch(getAppDataById(data)),
    editApp:(data) => dispatch(editApp(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAppContainer));