import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import TableApp from '../Tables/tableapp';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import './listapp.css';
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

class ListApp extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData: '',
            ownership: 1,
            isDisplay: false,
            adminownership: ''
        }

        this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChangeAppEvent = this.handleChangeAppEvent.bind(this);
        this.handleChangeAppEventAdmin = this.handleChangeAppEventAdmin.bind(this);

    }

    componentDidMount() {
        EventEmitter.subscribe('isDisplay', (value) => {
            this.setState({ isDisplay: this.state.isDisplay = true });
        });
    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_app_value', e.target.value);
    }

    handleChangeAppEvent(e) {
        EventEmitter.dispatch('select_app', e.target.value);
        this.setState({
            ownership: this.state.ownership = e.target.value
        })
    }

    handleChangeAppEventAdmin(e) {
        EventEmitter.dispatch('select_app_admin', e.target.value);
        this.setState({
            adminownership: this.state.adminownership = e.target.value
        })
    }

    searchApplicationDataKeyUp(e) {
        if (this.props.auth.auth_data.user_group == "publisher") {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership
            }
            this.props.searchApplicationData(obj).then((res) => {
                if (res && res.response) {
                    if (res.response.status == 1) {
                        this.setState({
                            searchData: this.state.searchData = res.response.data
                        })
                        EventEmitter.dispatch('searchDataApp', this.state.searchData);
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                } else {
                    Swal.fire({
                        text: res.error,
                        icon: 'warning'
                    });
                }

            });
        } else if (this.props.auth.auth_data.user_group == "advertiser") {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = 2
            }
            this.props.searchApplicationData(obj).then((res) => {
                if (res && res.response) {
                    if (res.response.status == 1) {
                        this.setState({
                            searchData: this.state.searchData = res.response.data
                        })
                        EventEmitter.dispatch('searchDataApp', this.state.searchData);
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                } else {
                    Swal.fire({
                        text: res.error,
                        icon: 'warning'
                    });
                }

            });
        } else if (this.props.auth.auth_data.user_group == "admin") {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.adminownership
            }
            this.props.searchApplicationData(obj).then((res) => {
                if (res && res.response) {
                    if (res.response.status == 1) {
                        this.setState({
                            searchData: this.state.searchData = res.response.data
                        })
                        EventEmitter.dispatch('searchDataApp', this.state.searchData);
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                } else {
                    Swal.fire({
                        text: res.error,
                        icon: 'warning'
                    });
                }

            });
        } else {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = ""
            }
            this.props.searchApplicationData(obj).then((res) => {
                if (res && res.response) {
                    if (res.response.status == 1) {
                        this.setState({
                            searchData: this.state.searchData = res.response.data
                        })
                        EventEmitter.dispatch('searchDataApp', this.state.searchData);
                    } else {
                        Swal.fire({
                            text: res.response.message,
                            icon: 'warning'
                        });
                    }
                } else {
                    Swal.fire({
                        text: res.error,
                        icon: 'warning'
                    });
                }

            });
        }
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp, activeAppAds, InactiveAppAds, AddAppMonetization } = this.props;

        return (
            <div>
                {
                    this.props.auth.auth_data.user_group == "publisher" ? (
                        <Row>
                            <Col className="cols" xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card className="main-card mb-3">
                                    <CardHeader>
                                        <CardTitle
                                            className="font"
                                        >
                                            Applications
                                                </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div>
                                            {
                                                this.state.isDisplay == true ? (
                                                    <Row>
                                                        <Col className="cols" sm="12" md="3" lg="3" xl="3">
                                                            <div className="rightapp">
                                                                <Link to="/createapp">
                                                                    <Button
                                                                        className="mb-2 mr-2"
                                                                        color="primary"
                                                                    >
                                                                        Add
                                                                        </Button>
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                        <Col className="cols" sm="12" md="9" lg="9" xl="9">
                                                            {
                                                                this.props.auth.auth_data.user_group == "publisher" ? (
                                                                    <div className="searchA">
                                                                        <Input
                                                                            type="select"
                                                                            className="form-control role_select"
                                                                            id="exampleCustomSelect"
                                                                            name="customSelect"
                                                                            onChange={this.handleChangeAppEvent}
                                                                        >
                                                                            <option value="1">My Only</option>
                                                                            <option value="">All</option>
                                                                            <option value="2">Advertisers</option>
                                                                        </Input>
                                                                        <input
                                                                            className="form-control search"
                                                                            type="text"
                                                                            placeholder="Search"
                                                                            aria-label="Search"
                                                                            onKeyUp={this.searchApplicationDataKeyUp}
                                                                        />
                                                                        <span style={{ marginRight: '5px' }}>Records per page</span>
                                                                        <Input
                                                                            type="select"
                                                                            className="form-control drop"
                                                                            id="exampleCustomSelect"
                                                                            name="customSelect"
                                                                            onChange={this.handleChangeEvent}
                                                                        >
                                                                            <option value="5">5</option>
                                                                            <option value="10">10</option>
                                                                            <option value="25">25</option>
                                                                            <option value="50">50</option>
                                                                            <option value="100">100</option>
                                                                        </Input>
                                                                    </div>
                                                                 
                                                                ) : (
                                                                        null
                                                                    )
                                                            }

                                                        </Col>
                                                    </Row>
                                                ) : (
                                                        null
                                                    )
                                            }

                                        </div>
                                        <br />
                                        <TableApp {...this.props} AddAppMonetization={AddAppMonetization} InactiveAppAds={InactiveAppAds} activeAppAds={activeAppAds} auth={auth} applicationCount={applicationCount} applicationPGData={applicationPGData} deleteApp={deleteApp} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                            <Row>
                                <Col className="cols" xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Card className="main-card mb-3">
                                        <CardHeader>
                                            <CardTitle
                                                className="font"
                                            >
                                                Applications
                                                </CardTitle>
                                        </CardHeader>
                                        <CardBody>
                                            <div>
                                                {
                                                    this.state.isDisplay == true ? (
                                                        <div>
                                                            {
                                                                this.props.auth.auth_data.user_group == "admin" ? (
                                                                    <Row>
                                                                        <Col className="cols" sm="12" md="4" lg="4" xl="4">
                                                                            <div className="rightapp">
                                                                                <Input
                                                                                    type="select"
                                                                                 
                                                                                    className="form-control role_select"
                                                                                    id="exampleCustomSelect1"
                                                                                    name="customSelect1"
                                                                                    onChange={this.handleChangeAppEventAdmin}
                                                                                >
                                                                                    <option value="">All</option>
                                                                                    <option value="1">Publisher</option>
                                                                                    <option value="2">Advertisers</option>
                                                                                </Input>


                                                                            </div>
                                                                        </Col>
                                                                        <Col className="cols" sm="12" md="8" lg="8" xl="8">
                                                                            <div className="searchP">
                                                                                <input
                                                                                    className="form-control search"
                                                                                    type="text"
                                                                                    placeholder="Search"
                                                                                    aria-label="Search"
                                                                                    onKeyUp={this.searchApplicationDataKeyUp}
                                                                                />
                                                                                <span>Records per page</span>
                                                                                <Input
                                                                                    type="select"
                                                                                    className="form-control drop"
                                                                                    id="exampleCustomSelect"
                                                                                    name="customSelect"
                                                                                    onChange={this.handleChangeEvent}
                                                                                >
                                                                                    <option value="5">5</option>
                                                                                    <option value="10">10</option>
                                                                                    <option value="25">25</option>
                                                                                    <option value="50">50</option>
                                                                                    <option value="100">100</option>
                                                                                </Input>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>

                                                                ) : (
                                                                        <Row>
                                                                            <Col className="cols" sm="12" md="3" lg="3" xl="3">
                                                                                <div className="rightapp">
                                                                                    {
                                                                                        this.props.auth.auth_data.user_group == "publisher" || this.props.auth.auth_data.user_group == "advertiser" ? (
                                                                                            <Link to="/createapp">
                                                                                                <Button
                                                                                                    className="mb-2 mr-2"
                                                                                                    color="primary"
                                                                                                >
                                                                                                    Add
                                                                        </Button>
                                                                                            </Link>
                                                                                        ) : (null)
                                                                                    }

                                                                                </div>
                                                                            </Col>


                                                                            <Col className="cols" sm="12" md="9" lg="9" xl="9">
                                                                                <div className="searchP">
                                                                                    <input
                                                                                        className="form-control search"
                                                                                        type="text"
                                                                                        placeholder="Search"
                                                                                        aria-label="Search"
                                                                                        onKeyUp={this.searchApplicationDataKeyUp}
                                                                                    />
                                                                                    <span>Records per page</span>
                                                                                    <Input
                                                                                        type="select"
                                                                                        className="form-control drop"
                                                                                        id="exampleCustomSelect"
                                                                                        name="customSelect"
                                                                                        onChange={this.handleChangeEvent}
                                                                                    >
                                                                                        <option value="5">5</option>
                                                                                        <option value="10">10</option>
                                                                                        <option value="25">25</option>
                                                                                        <option value="50">50</option>
                                                                                        <option value="100">100</option>
                                                                                    </Input>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    )
                                                            }

                                                        </div>
                                                    ) : (
                                                            null
                                                        )
                                                }
                                            </div>
                                            <br />
                                            <TableApp {...this.props} InactiveAppAds={InactiveAppAds} auth={auth} applicationCount={applicationCount} activeAppAds={activeAppAds} applicationPGData={applicationPGData} deleteApp={deleteApp} />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )
                }

            </div>
        );
    }
}

export default ListApp;