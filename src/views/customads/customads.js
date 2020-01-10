import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { REMOTE_URL } from '../../redux/constants/index';
import { EventEmitter } from '../../event';
import './customads.css';
import { Link } from 'react-router-dom';
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

class CustomAds extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            publisherapp: '',
            advertiserapp: '',
            _maincheck: false,
            app_id: '',
            app_package: '',
            isDelete: false,
            items: [],
            ownership: ''
        }
        this.checkMainHandler = this.checkMainHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCustomAds = this.addCustomAds.bind(this);
        this.removeCustomAds = this.removeCustomAds.bind(this);
        this.filterList = this.filterList.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);

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
        this.getAdvertiserApplication();
    }

    getAdvertiserApplication() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: 2,
            search_string: ''
        }
        this.props.getPublisherApplication(obj).then((res) => {
            this.setState({
                advertiserapp: res.response.data
            })
        })
    }

    checkMainHandler(e) {
        let _val = e.target.checked;
        this.state.advertiserapp.forEach(element => {
            element._rowChecked = _val
        });
        this.setState({
            advertiserapp: this.state.advertiserapp
        })
        this.setState({
            _maincheck: _val
        })
    }

    checkMaster(data) {
        let count = 0;
        data.forEach(element => {
            if (element._rowChecked == true) {
                element._rowChecked = true;
                count++;
            } else {
                element._rowChecked = false;
            }
        });
        if (count == data.length) {
            this.setState({
                _maincheck: true
            })
        } else {
            this.setState({
                _maincheck: false
            })
        }
        this.setState({
            advertiserapp: data
        });
    }

    handleChange(item, e) {
        let _id = item.id;
        let ind = this.state.advertiserapp.findIndex((x) => x.id == _id);
        let data = this.state.advertiserapp;
        if (ind > -1) {
            let newState = !item._rowChecked;
            data[ind]._rowChecked = newState;
            if (!newState) {
                data[ind]._rowChecked = false;

            } else {
                data[ind]._rowChecked = true;
            }
            this.setState({
                advertiserapp: data
            });
        }

    }

    handleAppClick(data, event) {
        let _id = event;
        let _package = data;
        this.setState({
            app_id: this.state.app_id = _id,
            app_package: this.state.app_package = _package
        })
        const obj = {
            app_id: this.state.app_id
        }
        this.props.getCustomAds(obj).then((res) => {

            if (res.response.data.app_list.length > 0) {
                this.setState({
                    isDelete: this.state.isDelete = true
                })
            }
            let obj = res.response.data.app_list;
            for (var i = 0; i < this.state.advertiserapp.length; i++) {
                for (var j = 0; j < obj.length; j++) {
                    if (this.state.advertiserapp[i].id == obj[j].app_id) {
                        if (this.state.advertiserapp[i]._rowChecked == true && (obj[j].row_checked == 1) ? true : false) {
                            this.setState({
                                _maincheck: this.state._maincheck = true
                            })
                        }
                    }
                    if (this.state.advertiserapp[i].id == obj[j].app_id) {

                        this.state.advertiserapp[i]._rowChecked = (obj[j].row_checked == 1) ? true : false
                    }
                }
            }
            this.setState({
                advertiserapp: this.state.advertiserapp = this.state.advertiserapp
            })

        })
    }

    addCustomAds() {
        var selectedAppArray = [];
        for (var i = 0; i < this.state.advertiserapp.length; i++) {
            if (this.state.advertiserapp[i]._rowChecked == true) {
                selectedAppArray.push(this.state.advertiserapp[i]);
            } else if (this.state.advertiserapp[i]._rowChecked == false) {
                this.state.advertiserapp[i]._rowChecked = false
                selectedAppArray.push(this.state.advertiserapp[i]);
            }
        }

        let appList = {
            app_id: this.state.app_id,
            app_package: this.state.app_package,
            app_list: selectedAppArray,
        }
        this.props.insertCustomAds(appList).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    removeCustomAds() {
        let appList = {
            app_id: this.state.app_id
        }
        this.props.deleteCustomAds(appList).then((res) => {
            if (res.response.status == 1) {
                Swal.fire({
                    text: res.response.message,
                    icon: 'success'
                });
                this.getAdvertiserApplication();
                this.setState({
                    isDelete: this.state.isDelete = false
                })
            } else {
                Swal.fire({
                    text: res.response.message,
                    icon: 'warning'
                });
            }
        })
    }

    filterList(event) {
        //response of api call
        const obj = {
            search_string: event.target.value,
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: this.state.ownership = 1
        }
        this.props.searchApplicationData(obj).then((res) => {
            this.setState({
                items: this.state.searchData = res.response.data
            })
        });
    }


    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;
        return (
            <div>
                <Row>
                    <Col md="4">
                        <Form>
                            <FormGroup>
                                <div className="filter-list">
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Search Application.."
                                            onChange={this.filterList}
                                        />
                                    </fieldset>
                                    <ul className="list-group">{
                                        this.state.items.map((item, index) =>
                                            <li className="list-group-item" key={index} value={item.id} onClick={() => this.handleAppClick(item.package, item.id)}>
                                                <img style={{ width: '70px', height: '50px', padding: '0 10px', borderRadius: '7px', display: 'inline-block', marginTop: '3px' }} src={REMOTE_URL + item.icon} />
                                                <p style={{ padding: '0 10px', display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 70px)' }}>
                                                    {item.name}<br />
                                                    <small style={{ paddingTop: '0px', display: 'inline-block' }}>{item.package}</small>
                                                </p>
                                            </li>
                                        )
                                    }</ul>
                                </div>
                            </FormGroup>
                        </Form>
                    </Col>
                    {
                        this.state.isDelete == true ? (
                            <Col md="2">
                                <Button className="mb-2 mr-2" color="danger" onClick={this.removeCustomAds}>
                                    Remove Ads
                            </Button>
                            </Col>
                        ) : (
                                null
                            )
                    }
                    <Col md="3">
                        <Button className="mb-2 mr-2" color="primary" onClick={this.addCustomAds}>
                            Save Settings
                        </Button>
                    </Col>
                </Row>
                <Card>
                    <CardHeader>
                        <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Advertiser Application</strong>
                    </CardHeader>
                    <CardBody className="app_list">
                        {
                            this.state.advertiserapp.length > 0 ? (

                                <Row>
                                    {
                                        this.state.advertiserapp.map((data, index) =>
                                            <Col md="4" key={index}>
                                                <Form>
                                                    <Card className="shadow_card">
                                                        <CardBody className="padding">
                                                            <Row>
                                                                <Col md="3">
                                                                    <img src={REMOTE_URL + data.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                                </Col>
                                                                <Col md="9" className="content">
                                                                    <div className="app_detail">
                                                                        {/* <Input
                                                                            type="checkbox"
                                                                            id="no"
                                                                            onChange={() => this.handleChange(data)}
                                                                            checked={this.state.advertiserapp[index]['_rowChecked'] == true}
                                                                        /> */}
                                                                        <h5>{data.name}</h5>
                                                                        <h6>{data.package}</h6>
                                                                        {
                                                                            this.state.advertiserapp[index]['_rowChecked'] == true ? (
                                                                                <Button className="selectedP" color="primary" onClick={() => this.handleChange(data)}>
                                                                                    SELECTED
                                                                            </Button>

                                                                            ) : (
                                                                                    <Button className="selectP" color="primary" onClick={() => this.handleChange(data)}>
                                                                                        SELECT
                                                                            </Button>
                                                                                )

                                                                        }
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
            </div>
        );
    }
}

export default CustomAds;