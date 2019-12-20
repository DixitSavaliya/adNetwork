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
            searchData: ''
        }

        this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);

    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_app_value', e.target.value);
    }

    searchApplicationDataKeyUp(e) {
        const obj = {
            search_string: e.target.value,
            user_id:this.props.auth.auth_data.id,
            user_group:this.props.auth.auth_data.user_group
        }
        this.props.searchApplicationData(obj).then((res) => {
            this.setState({
                searchData: this.state.searchData = res.response.data
            })
            EventEmitter.dispatch('searchDataApp', this.state.searchData);
        });
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;
        console.log("props", this.props);

        return (
            <div>
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
                                                    <span>Records per page</span>
                                                    <Col md="2">
                                                        <Input
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="customSelect"
                                                            onChange={this.handleChangeEvent}
                                                        >
                                                            <option value="2">2</option>
                                                            <option value="4">4</option>
                                                        </Input>
                                                    </Col>
                                                </Row>
                                            
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <TableApp applicationCount={applicationCount} applicationPGData={applicationPGData} deleteApp={deleteApp} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListApp;