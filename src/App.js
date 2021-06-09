import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './store/actions/authActions'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';

 
import Noty from 'noty';

import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/bootstrap-v4.css";   
import Main from './pages/Main';

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'



if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://littlebookcompany.net:3002/v1';
}else  {
  //axios.defaults.baseURL = 'https://littlebookcompany.net:3002/v1';
  axios.defaults.baseURL = 'http://localhost:4002/v1';
} 

axios.defaults.headers.post['Content-Type'] = 'application/json';
 
 
 
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  console.log(localStorage.jwtToken)
  setAuthToken(localStorage.jwtToken);

 
  
  const decoded = jwt_decode(localStorage.jwtToken);
  var user = localStorage.getItem('user');
  console.log(user)
  // Set user and isAuthenticated
   store.dispatch(setCurrentUser(user));
  //dispatch(setCurrentUser(user));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    // store.dispatch(logoutUser());
  
    // Redirect to login
   // window.location.href = '/login';
  }
}


class App extends Component {
  render() {
 
    return (
      <Provider store={store}>
      <Router>
     
      <Switch>
      <Route exact path  ="/login" component={Login} />
      <Route exact path  ="/register" component={Register} />
      
      
       <Main/>
      
      </Switch>
   
       
       </Router>
      </Provider>
    );
  }
}

export default App;
