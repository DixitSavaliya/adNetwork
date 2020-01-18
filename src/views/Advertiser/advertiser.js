import React, { Component } from 'react';
import '../Tables/table.css';
import { Link } from 'react-router-dom';
import { EventEmitter } from '../../event';
import Swal from 'sweetalert2';
import {
    Table,
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
    CardTitle,
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
            auth: JSON.parse(window.sessionStorage.getItem('ad_network_auth')),
            check: false,
            isData: false,
            searchData: '',
            count: '',
            currentPage: "1",
            items_per_page: "5",
            render_per_page: "5",
            perpage: '',
            paginationdata: '',
            isFetch: false,
            data: '',
            allRecords: '',
            upperPageBound: "3",
            lowerPageBound: "0",
            pageBound: "3",
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            onClickPage: "1",
            ownership: '',
            ads: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.handleChangegetAds = this.handleChangegetAds.bind(this);
        this.searchUserDataKeyUp = this.searchUserDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.deleteUserData = this.deleteUserData.bind(this);
    }

    componentDidMount() {
        this.countUser();
    }

    countUser() {
        let _this = this;
        this.props.countuser().then((res) => {
            _this.setState({
                count: _this.state.count = res.response.data
            })
            _this.UsersPageData();
        })
    }

    UsersPageData() {
        const obj = {
            page_no: "1",
            items_per_page: this.state.items_per_page
        }
        let _this = this;
        this.props.usersPGData(obj).then(function (res) {
            var data = [];
            for (var i = 0; i < res.response.data.length; i++) {
                if (res.response.data[i].user_type == 1) {
                    data.push(res.response.data[i])
                }
            }
            _this.setState({
                paginationdata: data,
                isFetch: true
            })
        })
    }


    handleClick(event) {
        if (this.props.auth.auth_data.user_group == "publisher") {
            if (this.state.currentPage <= '' + event.target.id) {
                this.setState({
                    currentPage: this.state.currentPage + 1,
                    onClickPage: +this.state.onClickPage + +this.state.items_per_page
                    // render_per_page:
                })
            } else {
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            }
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: this.state.items_per_page,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership
            }
            let _this = this;

            this.props.usersPGData(obj).then(function (res) {
                var data = [];
                for (var i = 0; i < res.response.data.length; i++) {
                    if (res.response.data[i].user_type == 1) {
                        data.push(res.response.data[i])
                    }
                }
                _this.setState({
                    paginationdata: data,
                    isFetch: true
                })
            })
        } else {
            if (this.state.currentPage <= '' + event.target.id) {
                this.setState({
                    currentPage: this.state.currentPage + 1
                })
            } else {
                this.setState({
                    currentPage: this.state.currentPage - 1
                })
            }
            const obj = {
                page_no: '' + event.target.id,
                items_per_page: this.state.items_per_page,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = ""
            }
            let _this = this;
            this.props.usersPGData(obj).then(function (res) {
                var data = [];
                for (var i = 0; i < res.response.data.length; i++) {
                    if (res.response.data[i].user_type == 1) {
                        data.push(res.response.data[i])
                    }
                }
                _this.setState({
                    paginationdata: data,
                    isFetch: true
                })
            })
        }
    }

    handleChangeEvent(event) {
        this.setState({ items_per_page: this.state.items_per_page = event.target.value });
    }

    appData(data) {
        // const id = data.id;
        // this.props.history.push("/viewapp/" + id)
    }

    deleteUserData(id) {
        console.log("id",id);
    }



    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    handleChangegetAds(data, index) {
        if (data.ad_status == 1) {
            if (data.ad_id != null) {
                const obj = {
                    id: data.ad_id
                }
                this.props.activeAppAds(obj).then((res) => {
                    this.getApplicationPageData();
                })
            }
        } else {
            if (data.ad_id != null) {
                const obj = {
                    id: data.ad_id
                }
                this.props.InactiveAppAds(obj).then((res) => {
                    this.getApplicationPageData();
                })
            }
        }
    }

    searchUserDataKeyUp(e) {
        const obj = {
            search_string: e.target.value
        }
        this.props.searchUsersData(obj).then((res) => {
            this.setState({
                searchData: this.state.searchData = res.response.data
            })
        });
    }

    render() {
        let auth = this.props.auth.auth_data;
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
            pageNumbers.push(i);
        }
        var renderPageNumbers = pageNumbers.map(number => {
            if (number === 1 && this.state.currentPage === 1) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" onClick={this.handleClick}>{number}</a>
                    </li>
                );
            }
            else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" id={number} onClick={this.handleClick}>{number}</a>
                    </li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        return (
            <Row>
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <Card className="main-card mb-3">
                        <CardHeader>
                            <CardTitle
                                className="font"
                            >
                                Advertisers
                                        </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <Row>
                                    <Col md="6">
                                        <input
                                            className="form-control search"
                                            type="text"
                                            placeholder="Search"
                                            aria-label="Search"
                                            onKeyUp={this.searchUserDataKeyUp}
                                        />
                                    </Col>
                                    <Col md="6">

                                        <div className="pull-right">
                                            <Row>
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
                            <div>
                                {
                                    this.state.searchData.length > 0 ? (
                                        <div>
                                            <Table hover className="mb-0 table_responsive" bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>FirstName</th>
                                                        <th>LastName</th>
                                                        <th>EmailId</th>
                                                        <th>MobileNo</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.searchData.map((data, index) =>
                                                            <tr key={index}>
                                                                <td className="action">
                                                                    <span className="padding">
                                                                        {/* <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i> */}
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserData(data.id)}></i>
                                                                    </span>
                                                                </td>
                                                                <td onClick={() => this.appData(data)}>{data.first_name}</td>
                                                                <td onClick={() => this.appData(data)}>{data.last_name}</td>
                                                                <td onClick={() => this.appData(data)}>{data.email_id}</td>
                                                                <td onClick={() => this.appData(data)}>{data.mobile_no}</td>
                                                                <td onClick={() => this.appData(data)}>
                                                                    <div className="btn_size">
                                                                        {
                                                                            data.status == 1 ? (
                                                                                <span className="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                                                                            ) : (
                                                                                    <span className="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    ) : (
                                            <div>
                                                {
                                                    this.state.paginationdata ? (
                                                        <div>
                                                            <Table hover className="mb-0 table_responsive" bordered>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Action</th>
                                                                        <th>FirstName</th>
                                                                        <th>LastName</th>
                                                                        <th>EmailId</th>
                                                                        <th>MobileNo</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        this.state.paginationdata.map((data, index) =>
                                                                            <tr key={index}>
                                                                                <td className="action">
                                                                                    <span className="padding">
                                                                                        {/* <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i> */}
                                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserData(data.id)}></i>
                                                                                    </span>
                                                                                </td>
                                                                                <td onClick={() => this.appData(data)}>{data.first_name}</td>
                                                                                <td onClick={() => this.appData(data)}>{data.last_name}</td>
                                                                                <td onClick={() => this.appData(data)}>{data.email_id}</td>
                                                                                <td onClick={() => this.appData(data)}>{data.mobile_no}</td>
                                                                                <td onClick={() => this.appData(data)}>
                                                                                    <div className="btn_size">
                                                                                        {
                                                                                            data.status == 1 ? (
                                                                                                <span className="badge badge-success">{data.status == "1" ? "active" : "inactive"}</span>
                                                                                            ) : (
                                                                                                    <span className="badge badge-danger">{data.status == "1" ? "active" : "inactive"}</span>
                                                                                                )
                                                                                        }
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                            {
                                                                this.state.paginationdata ? (
                                                                    <div>
                                                                        <ul className="pagination" id="page-numbers">
                                                                            {pageDecrementBtn}
                                                                            {renderPageNumbers}
                                                                            {pageIncrementBtn}
                                                                        </ul>
                                                                    </div>
                                                                ) : (
                                                                        <Table hover className="mb-0" bordered>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th className="action">Action</th>
                                                                                    <th>Manage Ads</th>
                                                                                    <th>App Icon</th>
                                                                                    <th>Name</th>
                                                                                    <th>Package</th>
                                                                                    <th>Discription</th>
                                                                                    <th>status</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                            </tbody>
                                                                        </Table>
                                                                    )
                                                            }
                                                            {/* <div>
                                            showing {this.state.onClickPage} to {this.state.render_per_page} of {this.state.count} entries
                                        </div> */}
                                                        </div>
                                                    ) : (
                                                            null
                                                        )
                                                }
                                            </div>
                                        )
                                }
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Advertiser;
