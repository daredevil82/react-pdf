import {createStore, applyMiddleware} from 'redux';
import pdfReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk';

const configureStore = initialState => {
    return createStore(
        pdfReducer,
        initialState,
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    )
};

export default configureStore;