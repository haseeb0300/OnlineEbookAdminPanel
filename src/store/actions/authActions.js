import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER ,GET_ERRORS} from '../actions/types'


export const validateUser =  UserData  => dispatch => {
  return axios
     .post('/api/sendmail', UserData )
     .then(res =>{ 
         console.log(res.data)
        return Promise.resolve(res.data)
     })
     .catch(err =>{
 console.log(err)
       if(err.response.data != null && err.response.data.validation){
         console.log(err.response.data);
         err= err.response.data 
       }else{
         err = {"msg":"Something went wrong"}
       }
       dispatch({
         type: GET_ERRORS,
         payload: err
       })
       return Promise.reject(err)
     });
 };


export const loginUser = userData => dispatch => {
  
    return axios
       .post('/api/admin/login', userData )
       .then(res => {
         // Save to localStorage
         console.log(res)
         if(res.data.content != null && res.data.content.length > 0){
          const { token, user } = res.data.content[0];
         // Set token to ls
         localStorage.setItem('jwtToken', token);
         console.log(user)
         // Set token to Auth header
         localStorage.setItem('user' ,JSON.stringify(user) );
         setAuthToken(token);

         // Decode token to get user data
         const decoded = jwt_decode(token);
          
         // Set current user
         dispatch(setCurrentUser(user));
         }
        return Promise.resolve(res.data)
       })
       .catch(err =>{
         console.log(err);
         if(err.response.data != null && err.response.data.validation){
           console.log(err.response.data);
           err= err.response.data
         }else{
           err = {"msg":"Something went wrong"}
         }
         dispatch({
           type: GET_ERRORS,
           payload: err
         })
         return Promise.reject(err)
       });
    
   };
   


   export const registerUser =  userData  => dispatch => {
    return axios
       .post('/api/publisher/register', userData)
       .then(res =>{ 
        if(res?.data?.content?.length >0 ){
          const { token, user } = res.data.content[0];
          // Set token to ls
          localStorage.setItem('jwtToken', token);
          // Set token to Auth header
          setAuthToken(token);
          localStorage.setItem('user' ,JSON.stringify(user) );
 
  
          // Decode token to get user data
          const decoded = jwt_decode(token);
           
          // Set current user
          dispatch(setCurrentUser(user));
          } 
        
        return Promise.resolve(res.data)
       })
       .catch(err =>{
   

         if(err.response.data != null && err.response.data.validation){
           console.log(err.response.data);
           err= err.response.data 
         }else{
           err = {"msg":"Something went wrong"}
         }
         dispatch({
           type: GET_ERRORS,
           payload: err
         })
         return Promise.reject(err)
       });
   };
   


   export const setCurrentUser = (decoded) => {
 
    console.log(decoded)
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    }
  }


  // Log user out
export const logoutUser = () => dispatch=> {
    console.log('here')
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

  export const getMyProfile = () => dispatch => {
    return axios
      .get('/api/restaurentowner')
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data != null && err.response.data.validation){
          console.log(err.response.data);
          err= err.response.data 
        }else{
          err = {"msg":"Something went wrong"}
        }
        return Promise.reject(err)
        
      })
  }

  export const getAllReader = () => dispatch => {
    return axios
      .get('/api/reader')
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data != null && err.response.data.validation){
          console.log(err.response.data);
          err= err.response.data 
        }else{
          err = {"msg":"Something went wrong"}
        }
        return Promise.reject(err)
        
      })
  }

  export const getAllPublisher = () => dispatch => {
    return axios
      .get('/api/publisher')
      .then((res) => {
        console.log(res)
        return Promise.resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        if(err.response.data != null && err.response.data.validation){
          console.log(err.response.data);
          err= err.response.data 
        }else{
          err = {"msg":"Something went wrong"}
        }
        return Promise.reject(err)
        
      })
  }