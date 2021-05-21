import React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../store/reducers/Layout';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
 

/**
 * Pagess
 */
import ManageBook from '../EbookStore/ManageBook'
import Categories from '../EbookStore/Categories'

import AddNewBook from '../EbookStore/AddNewBook'
import BankDetails from '../EbookStore/BankDetails'

import SellingHistory from '../OnlinePurchase/SellingHistory'
import Reports from '../OnlinePurchase/Reports'

import TrackMyRecord from '../EbookConversion/TrackMyRecord'
import CreateBook from '../EbookConversion/CreateBook'
import Dashboard from '../Dashboard/Dashboard'
import SendQueries from '../SendQuery/SendQueries'
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition'
import Profile from '../Profile/MyProfile'
import Notification from '../Notifications/Notification'
import Setting from '../Setting/Setting'
import Author from '../Users/Author'
import Reader from '../Users/Reader'
import AddOffer from '../Offer/AddOffer'
import AddLanguage from '../Translation/AddLanguage'
import AddTranslation from '../Translation/AddTranslation'
import PushNotification from '../Notifications/PushNotification'
import Segment from '../Notifications/Segment'
import AllowBook from '../EbookStore/AllowBook'
import LibraryBooks from '../EbookStore/LibraryBooks'














import PrivateRoute from '../../utils/PrivateRoute';
 
const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        
        <SideBar />

        <div className="main-panel">
          <Header />
        
          <PrivateRoute   exact path="/" component={Dashboard} /> 


          <PrivateRoute   path="/managebook" component={ManageBook} /> 
          <PrivateRoute   path="/categories" component={Categories} /> 

          <PrivateRoute   path="/addnewbook" component={AddNewBook} /> 
          <PrivateRoute   path="/sellinghistory" component={SellingHistory} /> 

          <PrivateRoute   path="/bankdetails" component={BankDetails} /> 
          <PrivateRoute   path="/trackmyrecord" component={TrackMyRecord} /> 
          <PrivateRoute   path="/reports" component={Reports} /> 
          <PrivateRoute   path="/createbook" component={CreateBook} /> 
          <PrivateRoute   path="/sendqueries" component={SendQueries} /> 
          <PrivateRoute   path="/termsandcondition" component={TermsAndCondition} />
          <PrivateRoute   path="/profile" component={Profile} /> 
          <PrivateRoute   path="/notification" component={Notification} /> 
          <PrivateRoute   path="/setting" component={Setting} /> 
          <PrivateRoute   path="/author" component={Author} /> 
          <PrivateRoute   path="/reader" component={Reader} /> 
          <PrivateRoute   path="/addoffer" component={AddOffer} /> 
          <PrivateRoute   path="/addlanguage" component={AddLanguage} /> 
          <PrivateRoute   path="/addtranslation" component={AddTranslation} /> 
          <PrivateRoute   path="/pushnotification" component={PushNotification} /> 
          <PrivateRoute   path="/segment" component={Segment} /> 
          <PrivateRoute   path="/allowbook" component={AllowBook} /> 

          <PrivateRoute   path="/LibraryBooks" component={LibraryBooks} /> 

          

          

          

          


          

          
   
          
          <Footer />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility,
     
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));