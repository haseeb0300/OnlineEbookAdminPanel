import axios from 'axios';

export const getTotalOrdersAndBook = () => dispatch => {
    return axios
        .get('/api/publisher/totalbook')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getTopSellingBooks = () => dispatch => {
    return axios
        .get('/api/publisher/topselling')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getLatestBook = () => dispatch => {
    return axios
        .get('/api/publisher/latestbook')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }