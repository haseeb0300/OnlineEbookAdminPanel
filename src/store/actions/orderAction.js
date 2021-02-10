import axios from 'axios';


  export const getAllOrder = () => dispatch => {
    return axios
        .get('/api/publisher/order')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const sortOrderByBook = (Name,Sort) => dispatch => {
    return axios
        .get('/api/publisher/order/sortbook?Name='+Name+'&Sort='+Sort)
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const sortOrderByOrder = (Name,Sort) => dispatch => {
    return axios
        .get('/api/publisher/order/sortorder?Name='+Name+'&Sort='+Sort)
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const searchBook = (Name) => dispatch => {
    return axios
        .get('/api/publisher/order/search?Name='+Name)
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTotalEarning = (day) => dispatch => {
    return axios
        .get('/api/publisher/earning?Day='+day)
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTotalPending = (day) => dispatch => {
    return axios
        .get('/api/publisher/pending?Day='+day)
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }