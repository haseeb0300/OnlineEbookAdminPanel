import axios from 'axios';


export const generateReport = (data) => dispatch => {
  return axios
      .get('/api/generatereportadmin?startDate='+data.startDate+'&endDate='+data.endDate+'&User_ID='+data.User_ID)
      .then((res) => {
          console.log(res)

          return Promise.resolve(res.data)
      }).catch((err) => {
          console.log(err)
          return Promise.reject(err)
      })


}

export const createPaymentOfOrder = (bookData) => dispatch => {
    return axios
      .put('api/order/payment', bookData)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
  
        if (err.response.data != null && err.response.data.validation) {
          console.log(err.response.data);
          err = err.response.data
        } else {
          err = { "msg": "Something went wrong" }
        }
        dispatch({
         
          payload: err
        })
        return Promise.reject(err)
      });
  
  
  }

  export const getAllOrders = (user_id) => dispatch => {
    return axios
        .get('/api/all/order?Publisher_ID=')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }

  export const getAllOrder = (user_id) => dispatch => {
    return axios
        .get('/api/all/order?Publisher_ID='+user_id)
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
        .get('/api/all/earning?Day='+day)
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