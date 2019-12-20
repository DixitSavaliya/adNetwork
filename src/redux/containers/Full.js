import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from '../Auth';

import Full from '../../containers/Full/Full';

class FullContainer extends Component {
    render() {
        let auth = Auth.getAuth();
        auth = auth ? JSON.parse(auth) : '';
        this.props.auth.auth_data = auth;
       
        return (
            <Full {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user:state.auth.user
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FullContainer);
