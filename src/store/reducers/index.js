import { combineReducers } from 'redux';
import Layout from './Layout';
import auth from './auth';
import currency from './currency'
 

export default combineReducers({
    auth:auth,
    Layout,
    currency: currency
  
})
