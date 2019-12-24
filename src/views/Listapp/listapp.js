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
            ownership: '',
            isDisplay: false
        }

        this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChangeAppEvent = this.handleChangeAppEvent.bind(this);

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

    searchApplicationDataKeyUp(e) {
        if (this.props.auth.auth_data.user_group == "publisher") {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership
            }
            this.props.searchApplicationData(obj).then((res) => {
                this.setState({
                    searchData: this.state.searchData = res.response.data
                })
                EventEmitter.dispatch('searchDataApp', this.state.searchData);
            });
        } else {
            const obj = {
                search_string: e.target.value,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = ""
            }
            this.props.searchApplicationData(obj).then((res) => {
                this.setState({
                    searchData: this.state.searchData = res.response.data
                })
                EventEmitter.dispatch('searchDataApp', this.state.searchData);
            });
        }
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp, activeAppAds, InactiveAppAds } = this.props;

        return (
            <div>
                {
                    this.props.auth.auth_data.user_group == "publisher" ? (
                        <Row>
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
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
                                                        <Col md="1">
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
                                                        {
                                                            this.props.auth.auth_data.user_group == "publisher" ? (
                                                                <Col md="3">
                                                                    <Input
                                                                        type="select"
                                                                        id="exampleCustomSelect"
                                                                        name="customSelect"
                                                                        onChange={this.handleChangeAppEvent}
                                                                    >
                                                                        <option value="">All</option>
                                                                        <option value="1">My Only</option>
                                                                        <option value="2">Advertisers</option>
                                                                    </Input>
                                                                </Col>
                                                            ) : (
                                                                    null
                                                                )
                                                        }
                                                        <Col md="8">
                                                            <div>
                                                                <Row>
                                                                    <Col md="8">
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            placeholder="Search"
                                                                            aria-label="Search"
                                                                            onKeyUp={this.searchApplicationDataKeyUp}
                                                                        />
                                                                    </Col>
                                                                    <span style={{ marginTop: '8px' }}>Records per page</span>
                                                                    <Col md="2">
                                                                        <Input
                                                                            type="select"
                                                                            id="exampleCustomSelect"
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
                                                ) : (
                                                        null
                                                    )
                                            }

                                        </div>
                                        <br />
                                        <TableApp {...this.props} InactiveAppAds={InactiveAppAds} activeAppAds={activeAppAds} auth={auth} applicationCount={applicationCount} applicationPGData={applicationPGData} deleteApp={deleteApp} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                            <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
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
                                                            <Col md="1">
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

                                                            <Col md="11">
                                                                <div>
                                                                    <Row>
                                                                        <Col md="8">
                                                                            <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                placeholder="Search"
                                                                                aria-label="Search"
                                                                                onKeyUp={this.searchApplicationDataKeyUp}
                                                                            />
                                                                        </Col>
                                                                        <span style={{ marginTop: '8px' }}>Records per page</span>
                                                                        <Col md="2">
                                                                            <Input
                                                                                type="select"
                                                                                id="exampleCustomSelect"
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