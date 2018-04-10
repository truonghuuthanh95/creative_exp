import React from 'react';
import ReactDOM from 'react-dom';
import './resourse/css/bootstrap.css';
import './resourse/css/myStyle.css';
import registerServiceWorker from './registerServiceWorker';
import App from './router/App';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
