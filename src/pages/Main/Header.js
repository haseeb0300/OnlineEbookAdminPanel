import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../store/reducers/Layout';
 
import { Navbar,Nav ,NavDropdown } from 'react-bootstrap';
import { logoutUser, } from '../../store/actions/authActions';
 import setting from '../../assets/images/header/gear.svg'
 import notification from '../../assets/images/header/notification.svg'
 import name from '../../assets/images/header/name.svg'
 import { Link, withRouter } from 'react-router-dom';


class Header extends Component {
  constructor(props) {
    super(props);
 

    this.state = {
 
      isLoading: false

    };
  
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
   
  }
  componentDidMount() {

 
    
  }
 
  
 
  render() {
    const { toggleMobileNavVisibility, logoutUser } = this.props
    return (
      <Navbar  class="navbar"   fluid={true} collapseOnSelect>
      
 

          <button type="button" className="navbar-toggle navtogge" data-toggle="collapse" onClick={toggleMobileNavVisibility}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
  
        
     

        <Nav className="nav-right">
            
     
              {/* <button class="nav-item"  onClick={logoutUser}>Log out</button> */}
              {/* <Link to="/setting">

              <img className="header-img" src={setting}></img>
              </Link>
               */}
              <Link to="/notification">

              <img className="header-img" src={notification}></img>
              </Link>
              <Link to="/profile">

              <img className="header-img" src={name}></img>
              </Link>

         
          </Nav>
      </Navbar>
    )
  }
}


const mapStateToProps = state => ({
 
});

const mapDispatchToProp = ({
  toggleMobileNavVisibility,
  logoutUser,
 
});

export default connect(mapStateToProps, mapDispatchToProp)(Header);