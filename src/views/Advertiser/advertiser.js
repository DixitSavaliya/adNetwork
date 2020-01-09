import React, { Component } from 'react';
// import './userrole.css';
// import TableRole from '../Tables/tablerole';
import { EventEmitter } from '../../event';
import Swal from 'sweetalert2';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,

} from 'reactstrap';

class Advertiser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            statuscheck1: true,
            userrole: '',
            userroleerror: '',
            status: 1,
            statuserror: '',
            isDeleted: false,
            modal: false,
            emit: false,
            user: [],
            roleId: '',
            searchData: '',
            delete: false,
            updateRoleBtn: false
        }
        // this.userRoleData = this.userRoleData.bind(this);
        // this.UpdateUserRoleData = this.UpdateUserRoleData.bind(this);
        // this.handleChangeStatus = this.handleChangeStatus.bind(this);
        // this.searchUserRoleDataKeyUp = this.searchUserRoleDataKeyUp.bind(this);
        // this.handleChangeEvent = this.handleChangeEvent.bind(this);

        // EventEmitter.subscribe('editData', (data) => {
        //     this.setState({
        //         updateRoleBtn: this.state.updateRoleBtn = true,
        //         roleId: this.state.roleId = data.id
        //     })
        //     this.setState({
        //         userrole: this.state.userrole = data.name,
        //         status: this.state.status = 1,
        //         statuscheck1: this.state.statuscheck1 = (data.status == 1) ? true : false
        //     })
        // });
    }

    // validate() {
    //     let userroleerror = "";
    //     let statuserror = "";

    //     if (!this.state.userrole) {
    //         userroleerror = "please enter userrole";
    //     }

    //     if (!this.state.status) {
    //         statuserror = "please enter status";
    //     }

    //     if (userroleerror || statuserror) {
    //         this.setState({ userroleerror, statuserror });
    //         return false;
    //     }
    //     return true;
    // };

    // userRoleData() {
    //     const isValid = this.validate();
    //     if (isValid) {
    //         this.setState({
    //             userrole: '',
    //             userroleerror: '',
    //             status: '',
    //             statuserror: ''
    //         })
    //         if (this.state.userrole && this.state.status) {
    //             const data = {
    //                 name: this.state.userrole,
    //                 status: this.state.status
    //             }
    //             this.props.addUserRole(data);
    //             EventEmitter.dispatch('role_added', 1);
    //             this.setState({
    //                 userrole: this.state.userrole = '',
    //                 status: this.state.status = ''
    //             })
    //         } else {
    //             Swal.fire("PLease Enter Field First!", "", "warning");
    //         }
    //     };
    // }

    // handleChangeStatus(event) {
    //     this.setState({
    //         statuscheck1: this.state.statuscheck1 = event.target.checked,
    //         status: this.state.status = event.target.defaultValue
    //     })
    // }

    // UpdateUserRoleData() {
    //     const isValid = this.validate();
    //     if (isValid) {
    //         this.setState({
    //             userrole: '',
    //             userroleerror: '',
    //             status: '',
    //             statuserror: ''
    //         })
    //         if (this.state.userrole && this.state.status) {
    //             this.setState({
    //                 checked: false
    //             })
    //             const obj = {
    //                 name: this.state.userrole,
    //                 status: this.state.status = this.state.status,
    //                 id: this.state.roleId
    //             }
    //             this.props.updateRole(obj);
    //             EventEmitter.dispatch('role_updated', 1);
    //             this.setState({
    //                 userrole: this.state.userrole = '',
    //                 status: this.state.status = '',
    //                 updateRoleBtn: this.state.updateRoleBtn = false
    //             })
    //         } else {
    //             Swal.fire("Please enter filed first!", "", "warning");
    //         }
    //     };
    // };

    // handleChangeEvent(e) {
    //     EventEmitter.dispatch('per_page_changed', e.target.value);
    // }


    // searchUserRoleDataKeyUp(e) {
    //     const obj = {
    //         search_string: e.target.value
    //     }
    //     this.props.searchRole(obj);
    //     EventEmitter.dispatch('searchData', this.state.searchData);
    // }

    render() {
        const { auth } = this.props;

        return (
            <div className="animated fadeIn">
               <h1>Advertiser</h1>
            </div>
        );
    }
}

export default Advertiser;
