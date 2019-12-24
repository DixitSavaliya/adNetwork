import React, { Component } from 'react';
import * as config from '../../redux/constants/index'
import { Link } from 'react-router-dom';
import { avatarUpload } from '../../redux/actions/auth';
import { CALL_API } from '../../redux/middleware/api';
import * as ACTION from '../../redux/constants/auth';
import './profile.css';
import { EventEmitter } from '../../event';
import {
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
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from 'reactstrap';
import { REMOTE_URL } from '../../redux/constants/index';

import axios from 'axios';


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      mobile_no: '',
      email_id: '',
      selectedFile: null
    }
    this.UpdateProfile = this.UpdateProfile.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
  }


  UpdateProfile() {

    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      mobile_no: this.state.mobile_no,
      email_id: this.state.email_id,
      create_by: this.props.auth.auth_data.id,
      id: this.props.auth.auth_data.id,
      username: this.props.auth.auth_data.username
    }
    console.log("data", data)
    this.props.updateprofile(data);
  }

  onChangeHandler(event) {
    let auth = this.props.auth.auth_data;
    axios.defaults.headers.post['Authorization'] = 'Barier ' + (auth ? auth.access_token : '');
    axios.defaults.headers.post['content-md5'] = auth ? auth.secret_key : '';
    let _this = this;
    let data = new FormData();
    data.append('file_name', event.target.files[0]);
    data.append('user_id', this.props.auth.auth_data.id)
    axios.post(REMOTE_URL + "User/uploadUserImage", data)
      .then(response => {
        console.log("uploadUserImage response === > ", response);
        this.setState({
          selectedFile: this.state.selectedFile = response.data.data
        })
        // _this.props.updateProfileData().then((res) =>{
        //   console.log("res",res);
        // })
        EventEmitter.dispatch('updateImage', this.state.selectedFile);
      }).catch(error => {
        console.log("error", error);
      });
  }


  removeIcon(data) {
    const obj = {
      id: this.props.auth.auth_data.id,
      image_path: data
    }
    this.props.removeImage(obj).then((res) => {
      console.log("removeImage res", this.props);

      this.props.profile.avatar = "";
      this.setState({
        selectedFile:this.state.selectedFile = null
      })
      console.log("this.selectedfile",this.state.selectedFile);
      EventEmitter.dispatch('removeImage', this.state.selectedFile);
    })
  }


  render() {
    console.log("Profile view this.props", this.props)
    const { auth, profile } = this.props;
    this.state.first_name = this.props.profile.first_name;
    this.state.last_name = this.props.profile.last_name;
    this.state.mobile_no = this.props.profile.mobile_no;
    this.state.email_id = this.props.profile.email_id;

    //const { user } = this.props.auth.user;
    const { fetching, error } = auth;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>My Profile</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="6">
                    <FormGroup className="img-upload">
                      {
                        this.state.selectedFile != null ? (
                          <div>
                            {
                              this.state.selectedFile ? (
                                <div>
                                  <img className="pic" src={config.REMOTE_URL + this.state.selectedFile} />
                                  <i className="fa fa-remove fa-lg" onClick={() => this.removeIcon(this.props.profile.avatar)}></i>
                                </div>
                              ) : (null)
                            }
                          </div>
                        ) : (
                            <div>
                              {
                                this.props.profile.avatar ? (
                                  <div>
                                    <img className="pic" src={config.REMOTE_URL + this.props.profile.avatar} />
                                    <i className="fa fa-remove fa-lg" onClick={() => this.removeIcon(this.props.profile.avatar)}></i>
                                  </div>
                                ) : (
                                    <div>
                                      <p>Select File:</p>
                                      <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg"  ></i></Label>
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
                            </div>
                          )
                      }

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="first_name">First_Name</Label>
                      <Input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control"
                        defaultValue={this.state.first_name}
                        // onChange={this.Profile.bind(this)}
                        onChange={(e) =>
                          this.state.first_name = e.target.value
                        }
                        placeholder="Enter your firstname"
                        required
                      />

                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="last_name">Last_Name</Label>
                      <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control"
                        defaultValue={this.state.last_name}
                        // onChange={this.Profile.bind(this)}
                        onChange={(e) =>
                          this.state.last_name = e.target.value
                        }
                        // value={this.state.last_name}
                        placeholder="Enter your lastname"
                        required
                      />

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="profile">E-Mail</Label>
                      <Input
                        type="email"
                        id="profile"
                        name="email_id"
                        className="profile form-control"
                        defaultValue={this.state.email_id}
                        // onChange={this.Profile.bind(this)}

                        onChange={(e) =>
                          this.state.email_id = e.target.value
                        }
                        placeholder="Enter your email"
                        required
                      />

                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="mobile_no">Mobile_Number</Label>
                      <Input
                        type="text"
                        id="mobile_no"
                        name="mobile_no"
                        className="form-control"
                        defaultValue={this.state.mobile_no}
                        // onChange={this.Profile.bind(this)}
                        onChange={(e) =>
                          this.state.mobile_no = e.target.value
                        }
                        placeholder="Enter your mobilenumber"
                        required
                      />

                    </FormGroup>
                  </Col>
                </Row>
                <Button type="button" size="sm" color="primary" onClick={this.UpdateProfile} >Update</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
