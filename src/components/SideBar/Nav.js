import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import cx from 'classnames';
import { logoutUser } from '../../store/actions/authActions';
import { connect } from 'react-redux';




import HOME from "../../assets/images/navbar_icons/Nav_Dashboard_Gray.svg";
import HOME_WHITE from "../../assets/images/navbar_icons/Nav_Dashboard.svg";


import ManageBook from "../../assets/images/navbar_icons/managebook.svg";
import ManageBookActive from "../../assets/images/navbar_icons/managebookActive.svg";


import AddNewBook from "../../assets/images/navbar_icons/addnewbook.svg";
import AddNewBookActive from "../../assets/images/navbar_icons/addnewbookActive.svg";

import EbookConversion from "../../assets/images/navbar_icons/ebookconversion.svg";
import EbookConversionActive from "../../assets/images/navbar_icons/ebookconversionActive.svg";


import Tracking from "../../assets/images/navbar_icons/tracking.svg";
import trackingActive from "../../assets/images/navbar_icons/trackingActive.svg";

import Bank from "../../assets/images/navbar_icons/bank.svg";
import BankActive from "../../assets/images/navbar_icons/bankActive.svg";


import SellingHistory from "../../assets/images/navbar_icons/sellinghistory.svg";
import SellingHistoryActive from "../../assets/images/navbar_icons/sellinghistoryActive.svg";


import Report from "../../assets/images/navbar_icons/report.svg";
import ReportActive from "../../assets/images/navbar_icons/reportActive.svg";


import SendMessage from "../../assets/images/navbar_icons/sendmessage.svg";
import SendMessageActive from "../../assets/images/navbar_icons/sendmessageActive.svg";


import logout from "../../assets/images/navbar_icons/logout.svg";

class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (

      
      <>
       <ul className="nav sidebar-nav">
               <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/" >
            <i ><img src={location.pathname === '/' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">Dashboard</p>
           </Link>
         </li>
         <li className="heading">
          <span className="poppins_semibold" >E-Book Store</span>
         </li>
         <li className={location.pathname === '/managebook' ? 'active' : null}>
          <Link to="/managebook" >
            <i ><img src={location.pathname === '/managebook' ? ManageBookActive : ManageBook}></img> </i>
             <p className="poppins_regular">Manage Books</p>
           </Link>
         </li>
         <li className={location.pathname === '/addnewbook' ? 'active' : null}>
          <Link to="/addnewbook" >
            <i ><img src={location.pathname === '/addnewbook' ? AddNewBookActive : AddNewBook}></img> </i>
             <p className="poppins_regular">Add New Book</p>
           </Link>
         </li>
         {/* <li className={location.pathname === '/b' ? 'active' : null}>
          <Link to="/b" >
            <i ><img src={location.pathname === '/b' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">eBooks Conversion</p>
           </Link>
         </li> */}
         <li className={cx("list-drop-down", { ["active"]: this.isPathActive('/orders') && !this.state.ordersMenuOpen, ["active-dropdown"]: this.state.ordersMenuOpen })}>
          <a onClick={() => this.setState({ ordersMenuOpen: !this.state.ordersMenuOpen })}
            data-toggle="collapse">
            <i  ><img src={this.isPathActive('/orders') && !this.state.ordersMenuOpen ? EbookConversionActive : EbookConversion}></img></i>
            <p className="poppins_regular">eBooks Conversion</p>
            <b className="caret"></b>
          </a>
          <Collapse in={this.state.ordersMenuOpen}>
            <div>



              {/* <ul className="nav"> */}
              <li className={location.pathname === '/createbook' ? 'active' : null}>
          <Link to="/createbook" >
            <div className="dropdown_nav mt-2"> 
            <i ><img src={location.pathname === '/createbook' ? AddNewBookActive : AddNewBook}></img> </i>
             <p className="poppins_regular dropdown_p">Create New eBook </p>
             </div>
           </Link>
           
         </li>
         <li className={location.pathname === '/trackmyrecord' ? 'active' : null}>
          <Link to="/trackmyrecord" >
          <div className="dropdown_nav"> 

            <i ><img src={location.pathname === '/trackmyrecord' ? trackingActive : Tracking}></img> </i>
             <p className="poppins_regular dropdown_p">Track my eBook</p>
             </div>
           </Link>
         </li>
               

              {/* </ul> */}
            </div>
          </Collapse>
        </li>





         <li className={location.pathname === '/bankdetails' ? 'active' : null}>
          <Link to="/bankdetails" >
            <i ><img src={location.pathname === '/bankdetails' ? BankActive : Bank}></img> </i>
             <p className="poppins_regular">Bank Details</p>
           </Link>
         </li>
        
         <li className="heading">
          <span className="poppins_semibold" >Online Purchases</span>
         </li>
         <li className={location.pathname === '/sellinghistory' ? 'active ' : null}>
          <Link to="/sellinghistory" >
            <i ><img src={location.pathname === '/sellinghistory' ? SellingHistoryActive : SellingHistory}></img> </i>
             <p className="poppins_regular">Selling History</p>
           </Link>
         </li>
         {/* <li className={location.pathname === '/e' ? 'active' : null}>
          <Link to="/e" >
            <i ><img src={location.pathname === '/e' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">Clearance</p>
           </Link>
         </li>
         */}
         <li className={location.pathname === '/reports' ? 'active' : null}>
          <Link to="/reports" >
            <i ><img className="report_img" src={location.pathname === '/reports' ? ReportActive : Report}></img> </i>
             <p className="poppins_regular">Reports</p>
           </Link>
         </li>
         <li className="heading">
          <span className="poppins_semibold" >Support & Querries</span>
         </li>
         <li className={location.pathname === '/sendqueries' ? 'active' : null}>
          <Link to="/sendqueries" >
            <i ><img src={location.pathname === '/sendqueries' ? SendMessageActive : SendMessage}></img> </i>
             <p className="poppins_regular">Send Message</p>
           </Link>
         </li>
         {/* <li className="heading">
          <span className="poppins_semibold" >Support</span>
         </li> */}
         {/* <li className={location.pathname === '/d' ? 'active' : null}>
          <Link to="/d" >
            <i ><img src={location.pathname === '/d' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">Feedback</p>
           </Link>
         </li> */}
         {/* <li className={location.pathname === '/d' ? 'active' : null}>
          <Link to="/d" >
            <i ><img src={location.pathname === '/d' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">Contact Details</p>
           </Link>
         </li> */}
         <li className="heading">
          <span className="poppins_semibold" >Contract</span>
         </li>
         <li className={location.pathname === '/termsandcondition' ? 'active' : null}>
          <Link to="/termsandcondition" >
            <i ><img src={location.pathname === '/termsandcondition' ? HOME_WHITE : HOME}></img> </i>
             <p className="poppins_regular">Terms & Contitions</p>
           </Link>
         </li>
         
         
            </ul>
             <div className="ml_20 mt-2 "   >

               <img  src={logout}></img>
               <label className="poppins_light logoutLabel ml-3" onClick={() => this.props.logoutUser()}> Logout </label>
               </div>
      </>

    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

Nav.propTypes = {

};

const mapStateToProps = state => ({
  

});

const mapDispatchToProps = ({
  logoutUser
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));

//export default withRouter(Nav);