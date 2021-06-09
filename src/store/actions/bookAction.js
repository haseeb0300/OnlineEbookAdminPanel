import axios from 'axios';
import { GET_ERRORS} from '../actions/types'


export const putBookInLibrary = accountData => dispatch => {
  return axios
    .put('api/library/book/admin', accountData)
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
        type: GET_ERRORS,
        payload: err
      })
      return Promise.reject(err)
    });
};


export const uploadEpub = restaurantData => dispatch => {
    return axios
      .post('/api/upload/book', restaurantData, {
        headers: { 'Content-Type': 'multipart/form-data', }
      })
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
  
        return Promise.reject(err)
      });
  
  };

  export const uploadImage = restaurantData => dispatch => {
    return axios
      .post('/api/image', restaurantData, {
        headers: { 'Content-Type': 'multipart/form-data', }
      })
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
  
        return Promise.reject(err)
      });
  
  };

  export const getReaderBook = (user_id) => dispatch => {
    return axios
        .get('api/reader/book?user_id='+user_id)
        .then((res) => {
            console.log(res)
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  }


  export const getBookCategory = () => dispatch => {
    return axios
        .get('api/publicationcategory')
        .then((res) => {
            console.log(res)
            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })
  }

  export const createBook = bookData => dispatch => {
    return axios
      .post('api/admin/book', bookData)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
  
        if (err.response.data != null && err.response.data.validation) {
          console.log(err.response.data.validation);
          err = err.response.data
        } else {
          err = { "msg": "Something went wrong" }
        }
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
        return Promise.reject(err)
      });
  };

  export const getAllBooks = () => dispatch => {
    return axios
        .get('/api/all/book')
        .then((res) => {
            console.log(res)

            return Promise.resolve(res.data)
        }).catch((err) => {
            console.log(err)
            return Promise.reject(err)
        })


}

export const uploadBook = restaurantData => dispatch => {
  return axios
    .post('/api/bookconvert/upload', restaurantData, {
      headers: { 'Content-Type': 'multipart/form-data', }
    })
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

      return Promise.reject(err)
    });

};
export const getConversionPrice = () => dispatch => {
  return axios
      .get('api/conversionprice')
      .then((res) => {
          console.log(res)
          return Promise.resolve(res.data)
      }).catch((err) => {
          console.log(err)
          return Promise.reject(err)
      })
}
export const createBookConverReq = bookData => dispatch => {
  return axios
    .post('api/bookconvert', bookData)
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
        type: GET_ERRORS,
        payload: err
      })
      return Promise.reject(err)
    });
};
export const getConversionBooks = () => dispatch => {
  return axios
      .get('/api/bookconvert')
      .then((res) => {
          console.log(res)

          return Promise.resolve(res.data)
      }).catch((err) => {
          console.log(err)
          return Promise.reject(err)
      })


}

export const downloadFile = (Book_Name) => dispatch => {
  return axios
      .get('/api/download?Book_Name='+Book_Name)
      .then((res) => {
          //console.log(res)

          return Promise.resolve(res.data)
      }).catch((err) => {
          //console.log(err)
          return Promise.reject(err)
      })


}

export const sortAllBooks = (Name,Sort) => dispatch => {
  return axios
      .get('/api/publisher/sort/book?Name='+Name+'&Sort='+Sort)
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
      .get('/api/publisher/search/book?Name='+Name)
      .then((res) => {
          console.log(res)

          return Promise.resolve(res.data)
      }).catch((err) => {
          console.log(err)
          return Promise.reject(err)
      })


}

