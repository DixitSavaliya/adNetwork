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
            publisherapp: [],
            advertiserapp: [],
            _maincheck: false,
            app_id: '',
            app_package: '',
            isDelete: false,
            items: [],
            ownership: '',
            selectApp: null,
            isShow: false,
            listHasApp: false,
        }
        this.checkMainHandler = this.checkMainHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCustomAds = this.addCustomAds.bind(this);
        this.removeCustomAds = this.removeCustomAds.bind(this);
        this.filterList = this.filterList.bind(this);
        this.handleAppClick = this.handleAppClick.bind(this);
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
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
        this.props.getAdverApplication(obj).then((res) => {
            this.setState({
                advertiserapp: res.response.data
            })
            // for (var i = 0; i < this.state.advertiserapp.length; i++) {
            //     this.state.advertiserapp[i]._rowChecked = false
            // }
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
            this.verifySettings(ind, newState);
        }
    }

    handleAppClick(data, event, item) {
        this.setState({
            selectApp: this.state.selectApp = item
        })
        let _id = event;
        let _package = data;
        this.setState({
            app_id: this.state.app_id = _id,
            app_package: this.state.app_package = _package
        })
        const obj = {
            app_id: this.state.app_id
        }
        for (var i = 0; i < this.state.advertiserapp.length; i++) {
            this.state.advertiserapp[i]._rowChecked = false
        }
        this.setState({
            advertiserapp: this.state.advertiserapp = this.state.advertiserapp
        })
        this.props.getCustomAds(obj).then((res) => {
            if (res && res.response) {
                if (res.response.status == 1) {
                    let app_list = res.response.data.app_list;
                    if (res.response.data.app_list.length > 0) {
                        this.setState({
                            isDelete: this.state.isDelete = true,
                            listHasApp: this.state.listHasApp = true
                        })
                    }
                    let obj = res.response.data.app_list;
                    for (var i = 0; i < this.state.advertiserapp.length; i++) {
                        for (var j = 0; j < obj.length; j++) {
                            if (this.state.advertiserapp[i].id == obj[j].app_id) {
                                this.state.advertiserapp[i]._rowChecked = (obj[j].row_checked == 1) ? true : false
                            }
                        }
                    }
                    this.setState({
                        advertiserapp: this.state.advertiserapp = this.state.advertiserapp,
                        items: this.state.items = [],
                    })
                    this.state.items = [];
                    document.getElementById('searchInput').value = '';
                    if (res.response.data.app_list.length == this.state.advertiserapp.length) {
                        this.setState({
                            isShow: this.state.isShow = true,
                        })
                    } else {
                        this.setState({
                            isShow: this.state.isShow = false,
                        })
                    }
                } else {
                    this.setState({
                        isDelete: this.state.isDelete = false,
                        isShow: this.state.isShow = false,
                        listHasApp: this.state.listHasApp = false,
                    })
                }
            } else {
                Swal.fire({
                    text: res.error,
                    icon: 'warning'
                });
            }
        })
    }

    select() {
        for (var i = 0; i < this.state.advertiserapp.length; i++) {
            this.state.advertiserapp[i]._rowChecked = true
        }
        this.setState({
            advertiserapp: this.state.advertiserapp = this.state.advertiserapp,
            isShow: this.state.isShow = true
        })
        this.verifySettings('', '', true);
    }

    unselect() {
        for (var i = 0; i < this.state.advertiserapp.length; i++) {
            this.state.advertiserapp[i]._rowChecked = false
        }
        this.setState({
            advertiserapp: this.state.advertiserapp = this.state.advertiserapp,
            isShow: this.state.isShow = false
        })
        this.verifySettings('', '', false);
    }

    verifySettings(index, state, allState) {
        if (index && state && allState == undefined) {
            this.state.advertiserapp[index]._rowChecked = state;
        } else {
            if (allState != undefined) {
                this.state.advertiserapp.map(function (x) {
                    x._rowChecked = allState
                });
            }
        }
        if (this.state.advertiserapp.filter(function (e) { return e._rowChecked == true; }).length > 0) {
            this.setState({
                listHasApp: this.state.listHasApp = true
            })
        } else {
            this.setState({
                listHasApp: this.state.listHasApp = false
            })
        }
    }

    addCustomAds() {
        var selectedAppArray = [];
        let data = this.state.advertiserapp;
        for (var i = 0; i < data.length; i++) {
            if (data[i]._rowChecked == true) {
                selectedAppArray.push(data[i]);
            }
        }

        let appList = {
            app_id: this.state.app_id,
            app_package: this.state.app_package,
            app_list: selectedAppArray,
        }
        this.props.insertCustomAds(appList).then((res) => {
            if (res && res.response) {
                if (res.response.status == 1) {
                    this.setState({
                        isDelete: this.state.isDelete = true
                    })
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
            } else {
                Swal.fire({
                    text: res.error,
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
            if (res && res.response) {
                if (res.response.status == 1) {
                    Swal.fire({
                        text: res.response.message,
                        icon: 'success'
                    });
                    this.getAdvertiserApplication();
                    this.setState({
                        isDelete: this.state.isDelete = false,
                        isShow: this.state.isShow = false
                    })
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
        })
        this.verifySettings('', '', false);
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
        return (
            <div>
                <Row className="custom-ads">
                    <Col sm="12" md="4">
                        <Form>
                            <FormGroup>
                                <div className="filter-list">
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            id="searchInput"
                                            className="form-control form-control-lg"
                                            placeholder="Search Application.."
                                            onChange={this.filterList}
                                        />
                                    </fieldset>
                                    <ul className="list-group">{
                                        this.state.items.map((item, index) =>
                                            <li className="list-group-item" key={index} value={item.id} onClick={() => this.handleAppClick(item.package, item.id, item)}>
                                                <img className="item_image" src={REMOTE_URL + item.icon} />
                                                <p className="item_name">
                                                    {item.name}<br />
                                                    <small className="break-word">{item.package}</small>
                                                </p>
                                            </li>
                                        )
                                    }</ul>
                                </div>
                            </FormGroup>
                        </Form>
                    </Col>
                    {
                        this.state.selectApp != null ? (
                            <Col sm="12" md="4">
                                <Card className="m-b-0">
                                    <CardHeader>
                                        <strong className="app_color">Selected Application</strong>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col md="12" className="media">
                                                <img src={REMOTE_URL + this.state.selectApp.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                <div className="app_detail content media-body">
                                                    <h5 className="details_break">{this.state.selectApp.name}</h5>
                                                    <h6 className="details_break">{this.state.selectApp.package}</h6>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        ) : (
                                null
                            )
                    }
                    <Col sm="12" md="4" className="btn-center">
                        <div className="btn-group">
                            {
                                this.state.selectApp != null ? (
                                    <div>
                                        {
                                            this.state.isShow == false ? (
                                                <Button className="" color="primary" onClick={this.select}>SelectAll</Button>
                                            ) : (
                                                    <Button className="" color="primary" onClick={this.unselect}>UnSelectAll</Button>
                                                )
                                        }
                                    </div>
                                ) : (
                                        null
                                    )

                            }
                            {
                                this.state.isDelete == true ? (
                                    <Button className="" color="danger" onClick={this.removeCustomAds}>Remove Ads</Button>

                                ) : (
                                        null
                                    )
                            }
                            {
                                this.state.listHasApp == true ? (
                                    <Button className="listhasapp" color="success" onClick={this.addCustomAds}>Save Settings</Button>
                                ) : (
                                        null
                                    )
                            }

                        </div>
                    </Col>
                </Row>

                <Card>
                    <CardHeader>
                        <strong className="app_color">Advertiser Application</strong>
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
                                                                <Col className="media">
                                                                    <img src={REMOTE_URL + data.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                                
                                                                    <div className="app_detail media-body">
                                                                        {/* <Input
                                                                            type="checkbox"
                                                                            id="no"
                                                                            onChange={() => this.handleChange(data)}
                                                                            checked={this.state.advertiserapp[index]['_rowChecked'] == true}
                                                                        /> */}
                                                                        <h5 className="details_break">{data.name}</h5>
                                                                        <h6 className="details_break">{data.package}</h6>
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