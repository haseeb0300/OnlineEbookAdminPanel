import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link, } from 'react-router-dom';
class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={user.image} className="photo" />
          <div className="userinfo">
            <div className="username">
              {user.name}
            </div>
            <div className="title">Admin</div>
          </div>
          <span
            onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
            className={cx("pe-7s-angle-down collapse-arrow", {
              active: isShowingUserMenu
            })}></span>
        </div>
        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li  >
              <Link to="/profile/editprofile">
                <p>Edit Profile</p>
              </Link>
            </li>
            <li  >
            <Link to="/profile/myprofile">
                <p>My Profile</p>
              </Link>
            </li>
          </ul>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(UserInfo);