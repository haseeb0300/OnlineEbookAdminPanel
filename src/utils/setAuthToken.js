import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    // Delete token header
    delete axios.defaults.headers.common['x-access-token']
  }
}



export default setAuthToken;


