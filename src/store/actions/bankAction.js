import axios from 'axios';

 export const createBankDetail = bookData => dispatch => {
    return axios
      .post('api/bank', bookData)
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
  };

  export const getBankAccount = () => dispatch => {
    return axios
        .get('/api/bank')
        .then((res) => {
            console.log(res)
  
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  
  
  }