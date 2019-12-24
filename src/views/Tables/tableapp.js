import React from 'react';
import { Table, CustomInput, Button } from 'reactstrap';
import Switch from "react-switch";
import './table.css';
import API from '../../service';
import Swal from 'sweetalert2';
import { REMOTE_URL } from '../../redux/constants/index';
import { EventEmitter } from '../../event';
import history from '../../history';
// import './table.css';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: JSON.parse(localStorage.getItem('ad_network_auth')),
            check: false,
            isData: false,
            searchData: '',
            count: '',
            currentPage: "1",
            items_per_page: "5",
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

        // this.checkAllHandler = this.checkAllHandler.bind(this);
        this.deleteAppData = this.deleteAppData.bind(this);
        this.editAppData = this.editAppData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.handleChangegetAds = this.handleChangegetAds.bind(this);

        EventEmitter.subscribe('searchDataApp', (data) => {
            this.setState({
                searchData: data,
                isData: this.state.isData = true
            })
        });
    }

    componentDidMount() {
        EventEmitter.subscribe('per_page_app_value', (value) => {
            this.setState({ items_per_page: this.state.items_per_page = value });
            this.getApplicationCount();
        });

        EventEmitter.subscribe('select_app', (value) => {
            this.setState({ ownership: this.state.ownership = value });
            this.getApplicationCount();
        });

        this.getApplicationCount();

    }

    getApplicationCount() {
        if (this.props.auth.auth_data.user_group == "publisher") {
            const obj = {
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership
            }
            let _this = this;
            this.props.applicationCount(obj).then((res) => {
                _this.setState({
                    count: _this.state.count = res.response.data
                })
                _this.getApplicationPageData();
            })
        } else {
            const obj = {
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = ""
            }
            let _this = this;
            this.props.applicationCount(obj).then(function (res) {
                _this.setState({
                    count: _this.state.count = res.response.data
                })
                _this.getApplicationPageData();
            })
        }
    }

    getApplicationPageData() {
        if (this.props.auth.auth_data.user_group == "publisher") {
            const obj = {
                page_no: "1",
                items_per_page: this.state.items_per_page,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership
            }
            let _this = this;
            this.props.applicationPGData(obj).then(function (res) {
                _this.setState({
                    paginationdata: res.response.data,
                    isFetch: true
                })
            })
        } else {
            const obj = {
                page_no: "1",
                items_per_page: this.state.items_per_page,
                user_id: this.props.auth.auth_data.id,
                user_group: this.props.auth.auth_data.user_group,
                ownership: this.state.ownership = ''
            }
            let _this = this;
            this.props.applicationPGData(obj).then(function (res) {
                _this.setState({
                    paginationdata: res.response.data,
                    isFetch: true
                })
            })
        }
    }

    editAppData(id) {
        this.props.history.push("/editapp/"+id)
    }

    deleteAppData(data) {
        const obj = {
            applicationID: data.id
        }
        var array = [];
        array.push(obj);
        const data1 = {
            data: array
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
                this.props.deleteApp(data1);
                setTimeout(() => {
                    this.getApplicationPageData();
                }, 1200)
            }
        })
    }

    handleClick(event) {
        if (this.props.auth.auth_data.user_group == "publisher") {
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
                ownership: this.state.ownership
            }
            let _this = this;
            this.props.applicationPGData(obj).then(function (res) {
                _this.setState({
                    paginationdata: res.response.data,
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
            this.props.applicationPGData(obj).then(function (res) {
                _this.setState({
                    paginationdata: res.response.data,
                    isFetch: true
                })
            })
        }
    }

    appData(data) {
        const id = data.id;
        this.props.history.push("/viewapp/"+id)
        // window.location.href = "/#/viewapp/" + id;
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

    render() {
        console.log("props",this.props);
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

            <div>
                {
                    this.state.isData == false ? (
                        <div>
                            {
                                this.state.paginationdata ? (
                                    <div>
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
                                                {
                                                    this.state.paginationdata.map((data, index) =>
                                                        <tr key={index}>
                                                            {
                                                                auth.user_group == "publisher" ? (
                                                                    <td className="action">
                                                                        {auth.id == data.user_id && auth.user_group == data.owner ? (
                                                                            <span className="padding">
                                                                                <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                                                <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                                            </span>
                                                                        ) : (
                                                                                <span className="padding">
                                                                                    {/* {'auth.id' + auth.id}
                                                                            {'data.user_id' + data.user_id}
                                                                            {'auth.user_group' + auth.user_group}
                                                                            {'data.owner' + data.owner} */}
                                                                                    No Access
                                                                        </span>
                                                                            )}
                                                                    </td>
                                                                ) : (
                                                                        <td className="action">
                                                                            <span className="padding">
                                                                                <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                                                <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                                            </span>

                                                                        </td>
                                                                    )
                                                            }
                                                            <td>
                                                                <Switch
                                                                    checked={data.ad_status == 1 ? true : false}
                                                                    onChange={() => this.handleChangegetAds(data, index)}
                                                                />
                                                            </td>
                                                            <td onClick={() => this.appData(data)}>
                                                                <img src={REMOTE_URL + data.icon} className="avatar-img" alt="admin@bootstrapmaster.com" />
                                                            </td>
                                                            <td onClick={() => this.appData(data)}>{data.name}</td>
                                                            <td onClick={() => this.appData(data)}>{data.package}</td>
                                                            <td onClick={() => this.appData(data)}>{data.description}</td>
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
                                            showing {this.state.onClickPage} to {this.state.items_per_page} of {this.state.count} entries
                                        </div> */}
                                    </div>
                                ) : (
                                        null
                                    )
                            }

                        </div>
                    ) : (
                            <div>
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
                                        {
                                            this.state.searchData.map((data, index) =>
                                                <tr key={index}>
                                                    {
                                                        auth.user_group == "publisher" ? (
                                                            <td className="action">
                                                                {auth.id == data.user_id && auth.user_group == data.owner ? (
                                                                    <span className="padding">
                                                                        <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                                    </span>
                                                                ) : (
                                                                        <span className="padding">

                                                                            No Access
                                                                        </span>
                                                                    )}
                                                            </td>
                                                        ) : (
                                                                <td className="action">
                                                                    <span className="padding">
                                                                        <i className="fa fa-pencil-square fa-lg" onClick={() => this.editAppData(data.id)}></i>
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteAppData(data)}></i>
                                                                    </span>

                                                                </td>
                                                            )
                                                    }
                                                    <td>
                                                        <Switch
                                                            checked={data.ad_status == 1 ? true : false}
                                                            onChange={() => this.handleChangegetAds(data, index)}
                                                        />
                                                    </td>
                                                    <td onClick={() => this.appData(data)}>
                                                        <img src={REMOTE_URL + data.icon} className="avatar-img" alt="admin@bootstrapmaster.com" />
                                                    </td>
                                                    <td onClick={() => this.appData(data)}>{data.name}</td>
                                                    <td onClick={() => this.appData(data)}>{data.package}</td>
                                                    <td onClick={() => this.appData(data)}>{data.description}</td>
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
                        )
                }
            </div>
        );
    }
}
