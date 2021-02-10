import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];
var store = null;
var enhancer =   compose(
  applyMiddleware(...middleware),
 // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  
);
 
if (process.env.NODE_ENV === 'production') {
  enhancer =   compose(
    applyMiddleware(...middleware) 
  );

} 
export default createStore(
  rootReducer,
  initialState,
  enhancer
);
