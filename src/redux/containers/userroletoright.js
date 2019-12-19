import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserRoleData,getUserRightData,userroletoright,edituserroletoright} from '../actions/userroletoright';
import UserRoleToRight from '../../views/Userroletoright/userroletoright';

class UserRoleToRightContainer extends Component {
    
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
      const {auth,getUserRoleData,getUserRightData,userroletoright,edituserroletoright } = this.props;
      return (
        <UserRoleToRight auth={auth} getUserRoleData={getUserRoleData} getUserRightData={getUserRightData} userroletoright={userroletoright} edituserroletoright={edituserroletoright}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getUserRoleData:(data) => dispatch(getUserRoleData(data)),
    getUserRightData:() => dispatch(getUserRightData()),
    userroletoright:(data) => dispatch(userroletoright(data)),
    edituserroletoright:(data) => dispatch(edituserroletoright(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserRoleToRightContainer));