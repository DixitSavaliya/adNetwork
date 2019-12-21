import React, { Fragment } from 'react';
import Switch from "react-switch";
import { EventEmitter } from '../../event';
import './createaoo.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { REMOTE_URL } from '../../redux/constants/index';

import axios from 'axios';
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

class CreateApp extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            statuscheck1: true,
            statuscheck2: false,
            name: '',
            nameerror: '',
            description: '',
            descriptionerror: '',
            package: '',
            packageerrror: '',
            icon: '',
            iconerror: '',
            type: '',
            typeerror: '',
            customSelect: '',
            customSelecterror: '',
            is_live: '',
            is_liveerror: '',
            status: 1,
            statuserror: '',
            selectedFile: null,
            selectedFileerror: '',
            checked: false,
            is_live: 0,
            customSelectName: '',
            app_id: '',
            updateRightBtn: false,
            App: []
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.CreateApp = this.CreateApp.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.EditApp = this.EditApp.bind(this);

    }

    handleChangeEvent(event) {
        this.setState({

            nameerror: this.state.nameerror = '',

            descriptionerror: this.state.descriptionerror = '',

            packageerrror: this.state.packageerrror = '',

            customSelecterror: this.state.customSelecterror = '',

            statuserror: this.state.statuserror = '',

            selectedFileerror: this.state.selectedFileerror = '',
        })
        event.preventDefault();
        const state = this.state
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    validate() {
        let nameerror = "";
        let descriptionerror = "";
        let packageerrror = "";
        let selectedFileerror = "";
        let statuserror = "";
        let customSelecterror = "";

        if (!this.state.name) {
            nameerror = "please enter appname";
        }

        if (!this.state.description) {
            descriptionerror = "please enter description";
        }

        if (!this.state.package) {
            packageerrror = "please enter package";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (!this.state.customSelect) {
            customSelecterror = "please select type";
        }


        if (nameerror || descriptionerror || packageerrror || selectedFileerror || customSelecterror) {
            this.setState({ nameerror, descriptionerror, packageerrror, selectedFileerror, customSelecterror });
            return false;
        }
        return true;
    };

    componentDidMount() {
        if (this.props.id) {
            const obj = {
                application_id: this.props.id,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group
            }
            this.props.getAppDataById(obj).then((res) => {
                this.setState({
                    App: this.state.App = res.response.data
                })
                if (this.state.App.is_live == 1) {
                    this.setState({
                        updateRightBtn: this.state.updateRightBtn = true,
                        app_id: this.state.App.id,
                        name: this.state.App.name,
                        description: this.state.App.description,
                        package: this.state.App.package,
                        selectedFile: this.state.App.icon,
                        customSelect: this.state.App.type,
                        is_live: this.state.App.is_live,
                        checked: this.state.checked = true,
                        status: this.state.status = 1,
                        statuscheck1: this.state.statuscheck1 = (this.state.App.status == 1) ? true : false
                    })
                } else {
                    this.setState({
                        updateRightBtn: this.state.updateRightBtn = true,
                        app_id: this.state.App.id,
                        name: this.state.App.name,
                        description: this.state.App.description,
                        package: this.state.App.package,
                        selectedFile: this.state.App.icon,
                        customSelect: this.state.App.type,
                        is_live: this.state.App.is_live,
                        checked: this.state.checked = false,
                        status: this.state.status = 1,
                        statuscheck1: this.state.statuscheck1 = (this.state.App.status == 1) ? true : false
                    })

                }
            })
        }
    }

    handleChange(checkedvalue) {
        this.setState({
            checked: this.state.checked = checkedvalue
        })
        if (this.state.checked == false) {
            this.setState({
                is_live: this.state.is_live = 0
            })
        } else {
            this.setState({
                is_live: this.state.is_live = 1
            })
        }
    }

    onChangeHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';

        let data = new FormData();
        data.append('file_name', event.target.files[0]);
        data.append('user_id', this.props.auth.auth_data.id)
        axios.post(REMOTE_URL + "Application/uploadApplicationIcon", data)
            .then(response => {
                this.setState({
                    selectedFile: this.state.selectedFile = response.data.data
                })
            }).catch(error => {
                console.log("error", error);
            });
    }

    handleChangeStatus(event) {
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: this.state.status = event.target.defaultValue
        })
    }

    onItemSelect(event) {

        let _id = event.target.options[event.target.selectedIndex].value;
        let _name = event.target.options[event.target.selectedIndex].innerHTML;
        this.setState({
            customSelect: this.state.customSelect = _id,
            customSelectName: this.state.customSelectName = _name
        })
    }

    CreateApp() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                name: '',
                nameerror: '',
                description: '',
                descriptionerror: '',
                package: '',
                packageerrror: '',
                customSelect: '',
                customSelecterror: '',
                // status: '',
                // statuserror: '',
                selectedFile: null,
                selectedFileerror: '',
            })
            if (this.state.name && this.state.description && this.state.package && this.state.selectedFile && this.state.customSelect) {
                const obj = {
                    name: this.state.name,
                    status: this.state.status,
                    description: this.state.description,
                    package: this.state.package,
                    icon: this.state.selectedFile,
                    type: this.state.customSelect,
                    is_live: this.state.is_live,
                    user_id: this.props.auth.auth_data.id,
                    user_group: this.props.auth.auth_data.user_group

                }
                this.props.createApp(obj);
            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        };
    }

    EditApp() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                name: '',
                nameerror: '',
                description: '',
                descriptionerror: '',
                package: '',
                packageerrror: '',
                customSelect: '',
                customSelecterror: '',
                // status: '',
                // statuserror: '',
                selectedFile: null,
                selectedFileerror: '',
            })
            if (this.state.name && this.state.description && this.state.package && this.state.selectedFile && this.state.customSelect) {
                const obj = {
                    name: this.state.name,
                    status: this.state.status,
                    description: this.state.description,
                    package: this.state.package,
                    icon: this.state.selectedFile,
                    type: this.state.customSelect,
                    is_live: this.state.is_live,
                    id: this.state.app_id,
                    user_id: this.props.auth.auth_data.id,
                    user_group: this.props.auth.auth_data.user_group
                }
                this.props.editApp(obj);
            } else {
                Swal.fire("PLease Enter Field First!", "", "warning");
            }
        };
    }

    render() {
        const { auth } = this.props;

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="4" sm="4" md="4" lg="4" xl="4">
                        {
                            this.props.id ? (
                                <div>
                                    <Link to="/ListApp"><Button className="mb-2 mr-2" color="primary">
                                        Go back
                                </Button></Link>
                                    {
                                        this.props.id ? (
                                            <Button
                                                color="primary"
                                                className="mb-2 mr-2"
                                                onClick={this.EditApp}
                                            >
                                                Update
                                        </Button>
                                        ) : (
                                                <Button
                                                    color="primary"
                                                    className="mb-2 mr-2"
                                                    onClick={this.CreateApp}
                                                >
                                                    Create
                                        </Button>
                                            )
                                    }
                                </div>
                            ) : (
                                    <Button
                                        color="primary"
                                        className="mb-2 mr-2"
                                        onClick={this.CreateApp}
                                    >
                                        Create
                        </Button>
                                )
                        }
                    </Col>

                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Card>
                            <CardHeader>
                                <strong>CreateApp</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="name">Name:</Label>
                                            <Input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                defaultValue={this.state.name}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your appname"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.nameerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="package">Package:</Label>
                                            <Input
                                                type="text"
                                                id="package"
                                                name="package"
                                                className="form-control"
                                                defaultValue={this.state.package}
                                                onChange={this.handleChangeEvent}
                                                placeholder="Enter your package"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.packageerrror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="description">Description:</Label>
                                            <Input
                                                type="textarea"
                                                id="description"
                                                name="description"
                                                className="form-control"
                                                defaultValue={this.state.description}
                                                onChange={this.handleChangeEvent}
                                                rows="4"
                                                placeholder="Content..."
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.descriptionerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        {
                                            this.props.id ? (
                                                <FormGroup>
                                                    <Label for="exampleCustomSelect"><b>Select Type:</b></Label>
                                                    <Input
                                                        type="select"
                                                        className="form-control"
                                                        id="exampleCustomSelect"
                                                        name="customSelect"
                                                        onChange={this.onItemSelect}
                                                    >
                                                        <option value="">{this.state.App.type == 1 ? 'Android' : 'IOS'}</option>
                                                        <option value="1">Android</option>
                                                        <option value="2">IOS</option>
                                                        <option value="3">Both</option>

                                                    </Input>
                                                    <div style={{ fontSize: 12, color: "red" }}>
                                                        {this.state.customSelecterror}
                                                    </div>
                                                </FormGroup>
                                            ) : (

                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select Type:</Label>
                                                        <Input
                                                            type="select"
                                                            className="form-control"
                                                            id="exampleCustomSelect"
                                                            name="customSelect"
                                                            onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select Type:</option>
                                                            <option value="1">Android</option>
                                                            <option value="2">IOS</option>
                                                            <option value="3">Both</option>

                                                        </Input>
                                                        <div style={{ fontSize: 12, color: "red" }}>
                                                            {this.state.customSelecterror}
                                                        </div>
                                                    </FormGroup>
                                                )
                                        }
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup className="img-upload">
                                            {
                                                this.state.selectedFile ? (
                                                    <div>
                                                        <img className="picture" src={REMOTE_URL + this.state.selectedFile} />
                                                    </div>
                                                ) : (null)
                                            }
                                            <p>Select File:</p>
                                            <Label for="file-input"><i className="fa fa-upload fa-lg"  ></i></Label>
                                            <Input
                                                id="file-input"
                                                type="file"
                                                className="form-control"
                                                name="file"
                                                onChange={this.onChangeHandler}
                                            />

                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.selectedFileerror}
                                            </div>
                                        </FormGroup>
                                    </Col>

                                    <Col xs="6">
                                        <Label htmlFor="userrole">Status:</Label>
                                        <br />
                                        <FormGroup check inline>
                                            <Input
                                                type="radio"
                                                id="inline-radio1"
                                                defaultValue="1"
                                                checked={this.state.status == 1 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                name="status"
                                                onChange={this.handleChangeStatus}
                                            />
                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio1"
                                            >
                                                Active
                                             </Label>

                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input

                                                type="radio"
                                                id="inline-radio2"
                                                defaultValue="0"
                                                checked={this.state.status == 0 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                name="status"
                                                onChange={this.handleChangeStatus}
                                            />

                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio2"
                                            >
                                                InActive
                                             </Label>

                                        </FormGroup>
                                        <div style={{ fontSize: 12, color: "red" }}>
                                            {this.state.statuserror}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <Label>
                                            Switch:
                                        </Label>
                                        <br />
                                        <Switch onChange={this.handleChange} checked={this.state.checked} />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default CreateApp;