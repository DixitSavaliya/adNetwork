import React from 'react';
import { Table, Input, Button } from 'reactstrap';
import './table.css';
// import API from '../../service';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
import { HashRouter, Link, Route } from "react-router-dom";

export default class TableRole extends React.Component {
    constructor(props) {
        console.log("props", props);
        super(props);
        this.state = {
            auth: JSON.parse(localStorage.getItem('ad_network_auth')),
            check: false,
            isData: false,
            searchData: '',
            count: '',
            currentPage: "1",
            items_per_page: "2",
            perpage: "1",
            paginationdata: '',
            isFetch: false,
            data: '',
            allRecords: '',
            upperPageBound: "3",
            lowerPageBound: "0",
            pageBound: "3",
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            onClickPage: "1"
        }

        this.checkAllHandler = this.checkAllHandler.bind(this);
        // this.deleteUserRoleData = this.deleteUserRoleData.bind(this);
        this.editUserRoleData = this.editUserRoleData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);

        EventEmitter.subscribe('searchData', (data) => {
            console.log("data",data);
            this.setState({
                searchData: data,
                isData: true
            })
            console.log("datasearch====", this.state.searchData, this.state.isData);
        });



        // EventEmitter.subscribe('isDeleted', (value) => {
        //   console.log("value", value);
        //   API.deleteUserRoleAllData({ value: true })
        //     .then((findresponse) => {
        //       if (findresponse) {
        //         console.log("deleteUserRoleAllData response===", findresponse);
        //         this.setState({
        //           allRecords: findresponse.data.data
        //         })
        //         console.log("allRecords", this.state.allRecords);
        //       } else {
        //         Swal.fire("Something went wrong!", "", "warning");
        //       }
        //     }).catch((err) => {
        //       Swal.fire("Something went wrong!", "", "warning");
        //     });
        // });
    }

    componentDidMount() {
        EventEmitter.subscribe('per_page_changed', (value) => {
            //localStorage.setItem('role_per_page_changed', '' + value);
            this.setState({ items_per_page: value });
            this.getRoleCountData();
            setTimeout(() => {
                this.getRolePageData();
            }, 120)
        });

        EventEmitter.subscribe('role_added', (data) => {
            this.getRoleCountData();
            setTimeout(() => {
                this.getRolePageData();
            }, 120)
        });

        EventEmitter.subscribe('role_updated', (data) => {
            this.getRoleCountData();
            setTimeout(() => {
                this.getRolePageData();
            }, 120)
        });

        this.getRoleCountData();
        setTimeout(() => {
            this.getRolePageData();
        }, 120)
    }

    getRoleCountData() {
        this.props.roleCountData();
    }


    getRolePageData() {
        const obj = {
            page_no: this.state.perpage,
            items_per_page: this.state.items_per_page
        }
        this.props.RolePGData(obj);

    }

    checkAllHandler(event) {
        console.log("data", event.target.checked, event.target.id);
        for(var i=0;i<this.state.paginationdata.length;i++) {
        this.state.paginationdata[i]['_Checked'] == true
        // if (event.target.checked == true) {
        //     this.setState({
        //         check: this.state.check = true
        //     })

        //     }
        }
        console.log("paginationdata",this.state.paginationdata);
    }

    editUserRoleData(data) {
        EventEmitter.dispatch('editData', data);
    }

    deleteUserRoleData(data) {
        console.log("data", data);
        const obj = {
            userRoleID: data.id
        }
        var array = [];
        array.push(obj);
        const role = {
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
                this.props.deleteRoleData(role);
                setTimeout(() => {
                    this.getRolePageData();
                }, 1200)
            }
        })
    }

    handleClick(event) {
        console.log("event current page number", '' + event.target.id);

        // this.setState({
        //     perpage: +this.state.perpage + +this.state.items_per_page,
        //     items_per_page: +this.state.items_per_page + +this.state.items_per_page
        // })
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
            items_per_page: this.state.items_per_page
        }
        this.props.RolePGData(obj);

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

    render() {
        const { auth, roleCountData, countData } = this.props;
        console.log("roleCountData view this.props", this.props)
        this.state.count = this.props.auth.count;
        this.state.paginationdata = this.props.auth.userrole;
        console.log("paginationdata", this.state.paginationdata);
        // const { fetching, error } = auth;


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
                                this.state.paginationdata.length ? (
                                    <div>
                                        <Table hover className="mb-0" bordered>
                                            <thead>
                                                <tr>
                                                    <th className="center">
                                                        <Input
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            onClick={this.checkAllHandler}
                                                        />
                                                    </th>
                                                    <th className="action">Action</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.paginationdata.map((data, index) =>
                                                        <tr key={index}>
                                                            <th scope="row" className="center">
                                                                {
                                                                    this.state.check == true ? (
                                                                        <span className="margin-t">
                                                                            <Input
                                                                                type="checkbox"
                                                                                id={index}
                                                                                checked={this.state.paginationdata[index]['_rowChecked'] == true}
                                                                            />
                                                                        </span>
                                                                    ) : (
                                                                            <span className="margin-t">
                                                                                <Input
                                                                                    type="checkbox"
                                                                                    id={index}
                                                                                //   onChange={this.handleChangeStatus.bind(this, index)}
                                                                                />
                                                                            </span>
                                                                        )
                                                                }
                                                            </th>
                                                            <td className="action">
                                                                <span className="padding">
                                                                    <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRoleData(data)}></i>
                                                                    <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRoleData(data)}></i>
                                                                </span>
                                                            </td>
                                                            <td>{data.name}</td>
                                                            <td>
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
                                                    null
                                                )
                                        }
                                        {/* <div>
                                showing {this.state.perpage} to {this.state.items_per_page} of {this.state.count} entries
                                        </div> */}
                                    </div>
                                ) : (
                                        null
                                    )
                            }
                        </div>
                    ) : (
                            <div>
                                {
                                    this.state.searchData.length ? (
                                        <div>
                                            <Table hover className="mb-0" bordered>
                                                <thead>
                                                    <tr>
                                                        <th className="center">
                                                            <Input
                                                                type="checkbox"
                                                                id="exampleCustomCheckbox"
                                                            onClick={this.checkAllHandler}
                                                            />
                                                        </th>
                                                        <th className="action">Action</th>
                                                        <th>Name</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.searchData.map((data, index) =>
                                                            <tr key={index}>
                                                                <th scope="row" className="center">
                                                                    {
                                                                        this.state.check == true ? (
                                                                            <span className="margin-t">
                                                                                <Input
                                                                                    type="checkbox"
                                                                                    id={index}
                                                                                    checked={this.state.paginationdata[index]['_rowChecked'] == true}
                                                                                />
                                                                            </span>
                                                                        ) : (
                                                                                <span className="margin-t">
                                                                                    <Input
                                                                                        type="checkbox"
                                                                                        id={index}
                                                                                    //   onChange={this.handleChangeStatus.bind(this, index)}
                                                                                    />
                                                                                </span>
                                                                            )
                                                                    }
                                                                </th>
                                                                <td className="action">
                                                                    <span className="padding">
                                                                        <i className="fa fa-pencil-square fa-lg" onClick={() => this.editUserRoleData(data)}></i>
                                                                        <i className="fa fa-remove fa-lg" onClick={() => this.deleteUserRoleData(data)}></i>
                                                                    </span>
                                                                </td>
                                                                <td>{data.name}</td>
                                                                <td>
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

                                            {/* <div>
                                showing {this.state.perpage} to {this.state.items_per_page} of {this.state.count} entries
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
        );
    }
}
