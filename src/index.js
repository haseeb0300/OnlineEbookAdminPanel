 
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './assets/styles/base.scss';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
 
import App from './App'

 
const rootElement = document.getElementById('root');

ReactDOM.render(   <App />, rootElement );
 

 

registerServiceWorker();

