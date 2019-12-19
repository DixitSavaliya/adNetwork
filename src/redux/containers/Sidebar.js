import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { list } from '../actions/sidebar';

import Sidebar from '../../components/Sidebar/Sidebar';

class SidebarContainer extends Component {
    componentDidMount() {
        /* this.props.list(); */
    }

    render() {
      const { sidebar } = this.props;

        return (
            <Sidebar sidebar={sidebar} {...this.props}/>
        );
    }
}

const mapStateToProps = state => ({
    sidebar: state.sidebar, auth: state.auth
});

/* const mapDispatchToProps = (dispatch) => ({
    list:() => dispatch(list()), nav:(info) => dispatch(nav(info))
}); */

export default connect(mapStateToProps)(SidebarContainer);
