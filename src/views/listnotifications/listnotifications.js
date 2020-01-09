import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import TableNotifications from '../Tables/tablenotifications';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import './listnotifications.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    CardTitle,
    DropdownToggle,
    Fade,
    Form,
    CustomInput,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

class ListNotifications extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData: '',
            ownership: '',
            isDisplay: false,
            deletedata: '',
            delete: false
        }

        // this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        // this.handleChangeEvent = this.handleChangeEvent.bind(this);
        // this.handleChangeAppEvent = this.handleChangeAppEvent.bind(this);
        this.deleteNotificationData = this.deleteNotificationData.bind(this);

    }

    componentDidMount() {
        EventEmitter.subscribe('deletenotificationpagedata', (data) => {
            this.setState({
                deletedata: this.state.deletedata = data,
                delete: this.state.delete = true
            })
        });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_notification_value', e.target.value);
    }

    // handleChangeAppEvent(e) {
    //     EventEmitter.dispatch('select_app', e.target.value);
    //     this.setState({
    //         ownership: this.state.ownership = e.target.value
    //     })
    // }

    // searchApplicationDataKeyUp(e) {
    //     if (this.props.auth.auth_data.user_group == "publisher") {
    //         const obj = {
    //             search_string: e.target.value,
    //             user_id: this.props.auth.auth_data.id,
    //             user_group: this.props.auth.auth_data.user_group,
    //             ownership: this.state.ownership
    //         }
    //         this.props.searchApplicationData(obj).then((res) => {
    //             this.setState({
    //                 searchData: this.state.searchData = res.response.data
    //             })
    //             EventEmitter.dispatch('searchDataApp', this.state.searchData);
    //         });
    //     } else {
    //         const obj = {
    //             search_string: e.target.value,
    //             user_id: this.props.auth.auth_data.id,
    //             user_group: this.props.auth.auth_data.user_group,
    //             ownership: this.state.ownership = ""
    //         }
    //         this.props.searchApplicationData(obj).then((res) => {
    //             this.setState({
    //                 searchData: this.state.searchData = res.response.data
    //             })
    //             EventEmitter.dispatch('searchDataApp', this.state.searchData);
    //         });
    //     }
    // }

    deleteNotificationData() {
        const remove = {
            data: this.state.deletedata
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                this.props.deleteNotificationData(remove);
                setTimeout(() => {
                    // this.userRoleData();
                }, 1200)
            }
        })
    }


    render() {
        const { auth, notificationCount, notificationPGData } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Card className="main-card mb-3">
                            <CardHeader>
                                <CardTitle
                                    className="font"
                                >
                                    Notifications
                                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div>

                                    <Row>
                                        <Col md="4">
                                            <Row>
                                                <Col md="6">
                                                    <div className="rightapp">
                                                        <Link to="/notifications">
                                                            <Button
                                                                className="mb-2 mr-2"
                                                                color="primary"
                                                            >
                                                                Add
                                                                    </Button>
                                                        </Link>
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="rightapp">
                                                        <Link to="/list-notifications">
                                                            <Button
                                                                className="mb-2 mr-2"
                                                                color="danger"
                                                                onClick={this.deleteNotificationData}
                                                                disabled={!this.state.delete}
                                                            >
                                                                Delete
                                                                    </Button>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>

                                        </Col>
                                        <Col md="8">
                                            <div className="pull-right">
                                                <Row>
                                                    {/* <Col md="8">
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    placeholder="Search"
                                                                    aria-label="Search"
                                                                    onKeyUp={this.searchApplicationDataKeyUp}
                                                                />
                                                            </Col> */}
                                                    <span style={{ marginTop: '8px' }}>Records per page</span>
                                                    <Col md="2">
                                                        <Input
                                                            type="select"
                                                            id="rightid"
                                                            name="customSelect"
                                                            onChange={this.handleChangeEvent}
                                                        >
                                                            <option value="5">5</option>
                                                            <option value="10">10</option>
                                                        </Input>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <TableNotifications {...this.props} auth={auth} notificationCount={notificationCount} notificationPGData={notificationPGData} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListNotifications;