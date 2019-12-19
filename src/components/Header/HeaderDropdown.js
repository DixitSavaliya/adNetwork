import React, {Component} from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import {REMOTE_URL} from '../../redux/constants/index';
import './header.css';

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLogout(e) {
  localStorage.removeItem('ad_network_user');
  localStorage.removeItem('ad_network_auth');
  window.location.href = "/#/admin/";
  }

  dropAccnt() {

    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          {
            this.props.auth.user.avatar ? (

              <img src={REMOTE_URL + this.props.auth.user.avatar} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            ) : (
              <img src={require('./1.jpg')} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            )
          }
          {/* <span className="d-md-down-none">{this.props.auth.user.username}</span> */}
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem> */}
          <DropdownItem header tag="div" className="text"><strong>Settings</strong></DropdownItem>
          <DropdownItem className="text"><Link to = "/Profile"><i className="fa fa-user"></i> Profile</Link></DropdownItem>
          <DropdownItem className="text"><Link to = "/change-password"><i className="fa fa-user"></i> ChangePassword</Link></DropdownItem>
          {/* <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
          <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
          <DropdownItem divider/>
          <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
          <DropdownItem onClick={this.handleLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const {...attributes} = this.props;
    return (
      this.dropAccnt()
    );
  }
}

export default HeaderDropdown;
