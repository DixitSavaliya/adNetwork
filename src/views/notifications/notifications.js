import React, { Component } from 'react';
import Swal from 'sweetalert2';
import './notification.css';
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
import { REMOTE_URL } from '../../redux/constants/index';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

class Notifications extends Component {
    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            publisherapp: '',
            app_id: '',
            title: '',
            titleerror: '',
            message: '',
            time: '',
            status: 0,
            statuserror: '',
            statuscheck1: true,
            url: '',
            urlerror: '',
            click_action: '',
            isVisible: false,
            date: new Date(),
            selectedFile: null,
            selectedFileerror: '',
            app_list: '',
            time: '',
            inputFormat: "YY-MM-DD h:mm A",
            once: true,
            daily: false,
            weekly: false,
            monthly: false,
            time_type: 1,
            sheduleType: 1,
            inputProps: {
                placeholder: "Please Select Date & Time"
            },
            filename:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendNotifications = this.sendNotifications.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleSheduleType = this.handleSheduleType.bind(this);
    }

    componentDidMount() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: 1,
            search_string: ''
        }
        this.props.getPublisherApplication(obj).then((res) => {
            this.setState({
                publisherapp: res.response.data
            })
        })
    }

    checkMaster(data) {
        data.forEach(element => {
            if (element._rowChecked == true) {
                element._rowChecked = true;
            } else {
                element._rowChecked = false;
            }
        });

        this.setState({
            publisherapp: data
        });
        let applist = [];
        for (var i = 0; i < this.state.publisherapp.length; i++) {
            if (this.state.publisherapp[i]._rowChecked == true) {
                applist.push(this.state.publisherapp[i])
            }
        }
        this.setState({
            app_list: this.state.app_list = applist
        })
    }

    handleChange(item, e) {
        let _id = item.id;
        this.setState({
            app_id: this.state.app_id = _id
        })
        let ind = this.state.publisherapp.findIndex((x) => x.id == _id);
        let data = this.state.publisherapp;
        if (ind > -1) {
            let newState = !item._rowChecked;
            data[ind]._rowChecked = newState;
            if (!newState) {
                data[ind]._rowChecked = false;

            } else {
                data[ind]._rowChecked = true;
            }
            this.setState({
                publisherapp: data
            });
        }
        this.checkMaster(data);
    }

    handleChangeStatus(event) {
        this.setState({
            statuscheck1: this.state.statuscheck1 = event.target.checked,
            status: this.state.status = event.target.defaultValue
        })
        if (this.state.status == 1) {
            this.setState({
                isVisible: this.state.isVisible = true
            })
        } else {
            this.setState({
                isVisible: this.state.isVisible = false
            })
        }
    }

    handleSheduleType(event) {
        this.setState({
            sheduleType: this.state.sheduleType = event.target.defaultValue,
            time_type: this.state.time_type = event.target.defaultValue
        })
        if (this.state.time_type == 1) {
            this.setState({
                once: this.state.once = true,
                daily: this.state.daily = false,
                weekly: this.state.weekly = false,
                monthly: this.state.monthly = false
            })
        } else if (this.state.time_type == 2) {
            this.setState({
                once: this.state.once = false,
                daily: this.state.daily = true,
                weekly: this.state.weekly = false,
                monthly: this.state.monthly = false
            })
        } else if (this.state.time_type == 3) {
            this.setState({
                once: this.state.once = false,
                daily: this.state.daily = false,
                weekly: this.state.weekly = true,
                monthly: this.state.monthly = false
            })
        } else if (this.state.time_type == 4) {
            this.setState({
                once: this.state.once = false,
                daily: this.state.daily = false,
                weekly: this.state.weekly = false,
                monthly: this.state.monthly = true
            })
        }
    }

    onChange(date) {
        this.convert(date._d);
    }

    convert(str) {
        var month, day, year, hours, minutes, seconds;
        var date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        hours = ("0" + date.getHours()).slice(-2);
        minutes = ("0" + date.getMinutes()).slice(-2);
        seconds = ("0" + date.getSeconds()).slice(-2);
        var mySQLDate = [date.getFullYear(), month, day].join("-");
        var mySQLTime = [hours, minutes, seconds].join(":");
        let valueDate = [mySQLDate, mySQLTime].join(" ");
        this.setState({
            time: this.state.time = valueDate
        })
    }

    onChangeHandler(event) {
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

    onURLChangeHandler(event) {
        let auth = this.props.auth.auth_data;
        axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
        axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
        let _this = this;
        let data = {
            data:{
              module_name: 'Notification',
              primary_id: "",
            },
            imageURL:this.state.filename
        }

        if(this.state.imageURL) {
            axios.post(REMOTE_URL + "AP/uploadImageByURL", data)
                .then(response => {
                    if (response.data.status == 1) {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'success'
                        });
                        this.setState({
                            selectedFile: this.state.selectedFile = response.data.data
                        })
                    } else {
                        Swal.fire({
                            text: response.data.message,
                            icon: 'warning'
                        });
                    }
                    // _this.props.updateProfileData().then((res) =>{
                    // })
                }).catch(error => {
                    console.log("error", error);
                });
        } else {
            Swal.fire("PLease Enter URL!", "", "warning");
        }
    }

    removeIcon(data) {
        const obj = {
          id: this.props.auth.auth_data.id,
          image_path: data
        }
        this.props.removeImage(obj).then((res) => {
          if (res.response.status == 1) {
            Swal.fire({
              text: res.response.message,
              icon: 'success'
            });
          
            this.setState({
              selectedFile: this.state.selectedFile = null
            })
         
          } else {
            Swal.fire({
              text: res.response.message,
              icon: 'warning'
            });
          }
        })
      }


    validate() {
        let titleerror = "";
        let urlerror = "";
        let selectedFileerror = "";

        if (!this.state.title) {
            titleerror = "please enter title";
        }

        if (!this.state.url) {
            urlerror = "please enter url";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (titleerror || urlerror || selectedFileerror) {
            this.setState({ titleerror, urlerror, selectedFileerror });
            return false;
        }
        return true;
    };


    sendNotifications() {
        const isValid = this.validate();
        if (isValid) {
            const obj = {
                id: "",
                user_id: this.props.auth.auth_data.id,
                type: this.state.status,
                status: 1,
                time: this.state.time,
                time_type: this.state.time_type,
                data: {
                    notification: {
                        title: this.state.title,
                        message: this.state.message,
                        icon: this.state.selectedFile,
                        url: this.state.url,
                        click_action: this.state.click_action
                    },
                    app_list: this.state.app_list,
                    status: 1,
                    type: this.state.status,
                    time: this.state.time,
                    time_type: {
                        once: this.state.once,
                        daily: this.state.daily,
                        weekly: this.state.weekly,
                        monthly: this.state.monthly
                    }
                }
            }
            this.props.sendNotification(obj).then((res) => {
                if (res.response.status == 1) {
                    Swal.fire({
                        text: res.response.message,
                        icon: 'success'
                    });
                    this.props.history.push(this.props.from || { pathname: '/list-notifications' });
                } else {
                    Swal.fire({
                        text: res.response.message,
                        icon: 'warning'
                    });
                }
            })
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Publisher Application</strong>
                    </CardHeader>
                    <CardBody className="app_list">
                        {
                            this.state.publisherapp.length > 0 ? (
                                <Row>
                                    {
                                        this.state.publisherapp.map((data, index) =>
                                            <Col md="4" key={index}>
                                                <Form>
                                                    <Card className="shadow_card">

                                                        <CardBody className="padding">
                                                            <Row>
                                                                <Col md="2">
                                                                    <img src={REMOTE_URL + data.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                                </Col>
                                                                <Col md="10" className="content">
                                                                    <div className="app_detail">
                                                                        <Input
                                                                            type="checkbox"
                                                                            id="no"
                                                                            onChange={() => this.handleChange(data)}
                                                                            checked={this.state.publisherapp[index]['_rowChecked'] == true}
                                                                        />
                                                                        <h6>Name: <p>{data.name}</p></h6>
                                                                        <h6>Package: <p>{data.package}</p></h6>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Form>
                                            </Col>
                                        )
                                    }
                                </Row>
                            ) : (
                                    null
                                )
                        }
                    </CardBody>
                </Card>

                {/** Notification form */}
                < Row >
                    <Col xs="8" sm="8">
                        <Card>
                            <CardHeader>
                                <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Notification</strong>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="8">
                                        <FormGroup>
                                            <Label htmlFor="title"><b>Title:</b></Label>
                                            <Input
                                                type="text"
                                                id="title"
                                                name="title"
                                                className="form-control"
                                                defaultValue={this.state.title}
                                                onChange={(e) =>
                                                    this.state.title = e.target.value
                                                }
                                                placeholder="Enter Title"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.titleerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <FormGroup>
                                            <Label htmlFor="message"><b>Message:</b></Label>
                                            <Input
                                                type="textarea"
                                                id="message"
                                                name="message"
                                                className="form-control"
                                                defaultValue={this.state.message}
                                                onChange={(e) =>
                                                    this.state.message = e.target.value
                                                }
                                                rows="4"
                                                placeholder="Content..."
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <FormGroup className="img-upload">
                                            {
                                                this.state.selectedFile != null ? (
                                                    <div>
                                                        {
                                                            this.state.selectedFile ? (
                                                                <div>
                                                                    <img className="picture" src={REMOTE_URL + this.state.selectedFile} />
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.removeIcon(this.state.selectedFile)}></i>
                                                                </div>
                                                            ) : (null)
                                                        }
                                                    </div>
                                                ) : (
                                                        <div>
                                                            <p>Select File:</p>
                                                            <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg"></i></Label>
                                                            <span style={{ marginLeft: '20px' }}> <b>Or</b> Enter URL</span>
                                                            <Input
                                                                type="url"
                                                                id="image"
                                                                name="filename"
                                                                className="form-control"
                                                                defaultValue={this.state.filename}
                                                                onChange={(e) =>
                                                                  this.state.filename = e.target.value
                                                                }
                                                                style={{ display: 'inline-block', width: 'calc(100% - 240px)', marginLeft: '20px' }}
                                                                placeholder="Please Enter URL"
                                                                required
                                                            />
                                                            <Button style={{ marginLeft: '15px' }} className="mt-0" type="button" size="sm" color="primary" onClick={this.onURLChangeHandler.bind(this)}>Upload</Button>
                                                            <Input
                                                                id="file-input"
                                                                type="file"
                                                                className="form-control"
                                                                name="file"
                                                                onChange={this.onChangeHandler.bind(this)}
                                                            />

                                                        </div>
                                                    )
                                            }
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.selectedFileerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <FormGroup>
                                            <Label htmlFor="url"><b>URL:</b></Label>
                                            <Input
                                                type="text"
                                                id="url"
                                                name="url"
                                                className="form-control"
                                                defaultValue={this.state.url}
                                                onChange={(e) =>
                                                    this.state.url = e.target.value
                                                }
                                                placeholder="Enter URL"
                                                required
                                            />
                                            <div style={{ fontSize: 12, color: "red" }}>
                                                {this.state.urlerror}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="8">
                                        <FormGroup>
                                            <Label htmlFor="click_action"><b>Click_Action:</b></Label>
                                            <Input
                                                type="text"
                                                id="click_action"
                                                name="click_action"
                                                className="form-control"
                                                defaultValue={this.state.click_action}
                                                onChange={(e) =>
                                                    this.state.click_action = e.target.value
                                                }
                                                placeholder="Enter Click_Action"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col xs="8">
                                        <Label htmlFor="userrole"><b>Status:</b></Label>
                                        <br />
                                        <FormGroup check inline>
                                            <Input
                                                type="radio"
                                                id="inline-radio1"
                                                defaultValue="0"
                                                checked={this.state.status == 0 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                name="status"
                                                onChange={this.handleChangeStatus}
                                            />
                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio1"
                                            >
                                                Immediate
                                             </Label>

                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input

                                                type="radio"
                                                id="inline-radio2"
                                                defaultValue="1"
                                                checked={this.state.status == 1 ? this.state.statuscheck1 : !this.state.statuscheck1}
                                                name="status"
                                                onChange={this.handleChangeStatus}
                                            />

                                            <Label
                                                className="form-check-label"
                                                check htmlFor="inline-radio2"
                                            >
                                                Later
                                             </Label>

                                        </FormGroup>
                                    </Col>
                                </Row>
                                {
                                    this.state.isVisible == true ? (
                                        <div>
                                            <Row>
                                                <Col xs="6">
                                                    <Label><b>Select shedule Time & Date:</b></Label>
                                                    <Datetime
                                                        dateFormat="YYYY-MM-DD"
                                                        timeFormat="h:mm A"
                                                        onChange={this.onChange}
                                                        utc={false}
                                                        inputProps={this.state.inputProps}
                                                    />
                                                </Col>
                                            </Row>
                                            {/* <Row style={{ marginTop: '10px' }}>
                                                <Col xs="6">
                                                    <Label><b>Select shedule Time_Type:</b></Label>
                                                    <br />
                                                    <FormGroup check inline>
                                                        <Input
                                                            type="radio"
                                                            name="shedule"
                                                            defaultValue="1"
                                                            onChange={this.handleSheduleType}
                                                            checked={this.state.sheduleType == 1 ? true : false}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="radio5"
                                                        >
                                                            Once
                                             </Label>

                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Input
                                                            type="radio"
                                                            name="shedule"
                                                            defaultValue="2"
                                                            onChange={this.handleSheduleType}
                                                            checked={this.state.sheduleType == 2 ? true : false}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="radio6"
                                                        >
                                                            Daily
                                             </Label>
                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Input
                                                            type="radio"
                                                            name="shedule"
                                                            defaultValue="3"
                                                            onChange={this.handleSheduleType}
                                                            checked={this.state.sheduleType == 3 ? true : false}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            htmlFor="radio3"
                                                        >
                                                            Weekly
                                             </Label>
                                                    </FormGroup>
                                                    <FormGroup check inline>
                                                        <Input
                                                            type="radio"
                                                            name="shedule"
                                                            defaultValue="4"
                                                            onChange={this.handleSheduleType}
                                                            checked={this.state.sheduleType == 4 ? true : false}
                                                        />
                                                        <Label
                                                            className="form-check-label"
                                                            check htmlFor="radio4"
                                                        >
                                                            Monthly
                                             </Label>
                                                    </FormGroup>
                                                </Col>
                                            </Row> */}
                                        </div>
                                    ) : (
                                            null
                                        )
                                }
                                <Row style={{ marginTop: '5px' }}>
                                    <Button
                                        color="primary"
                                        className="mb-2 ml-3"
                                        onClick={this.sendNotifications}
                                    >
                                        Send Notification
                                        </Button>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Notifications;