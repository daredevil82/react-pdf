import React from 'react';
import {render} from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
