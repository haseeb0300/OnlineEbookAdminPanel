import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../assets/images/Logo.svg'
 
 
import Nav from './Nav';
 

class SideBar extends Component {

  state = {};

render() {

    let {
       
      
  
      
    } = this.props;

    return (
      <div className="sidebar "   >
{/* 
        <div className="brand">
          <a className="brand-name">
          LOCAL     
          </a>
          <a className="brand-name-bold">GROCERYS</a>
          <div className="nav-circle" ></div>
        </div> */}
        <div className="sidebar-logo-container">
        <img className="imgw100" src ={Logo}></img>
        </div>

        <div className="sidebar-wrapper ">
     
          
          <Nav />
        </div>
   
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
 
 
 
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);