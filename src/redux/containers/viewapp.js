import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAppDataById} from '../actions/createapp';
import ViewApp from '../../views/Viewapp/viewapp';

class ViewAppContainer extends Component {
    
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
      const {auth,getAppDataById} = this.props;
      console.log("props",this.props);
      this.id = this.props.location.pathname.split('/')[2];
      return (
        <ViewApp auth={auth} id={this.id} getAppDataById={getAppDataById}/>
      );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    getAppDataById:(data) => dispatch(getAppDataById(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewAppContainer));