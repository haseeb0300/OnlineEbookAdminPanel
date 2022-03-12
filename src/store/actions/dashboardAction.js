import axios from 'axios';

export const getTotalOrdersAndBook = () => dispatch => {
    return axios
        .get('/api/all/totalbook')
        .then((res) => {
            //console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            //console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTotalPublisher = () => dispatch => {
    return axios
        .get('/api/all/publishercount')
        .then((res) => {
            //console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            //console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTotalBook = () => dispatch => {
    return axios
        .get('/api/all/bookcount')
        .then((res) => {
            //console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            //console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTopSellingBooks = () => dispatch => {
    return axios
        .get('/api/all/topselling')
        .then((res) => {
            //console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            //console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getLatestBook = () => dispatch => {
    return axios
        .get('/api/all/latestbook')
        .then((res) => {
            //console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            //console.log(err)
            return Promise.reject(err)
        })
  
  
  }