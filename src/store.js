import {createStore, applyMiddleware} from 'redux';
import pdfReducer from './reducers';

const configureStore = initialState => {
    return createStore(
        pdfReducer,
        initialState
    )
};

export default configureStore;