import * as types from './../actions/actionTypes';
import initialState from './initialState';


const pdfReducer = (state = initialState.pdf, action) => {
    switch(action.type){
        case types.ON_ZOOM_OUT:
            return Object.assign({}, state, {scale: state.scale / 1.1});
        case types.ON_ZOOM_IN:
            return Object.assign({}, state, {scale: state.scale * 1.1});
        case types.ON_SCALE_CHANGE:
            return Object.assign({}, state, {scale: action.scale});
        case types.ON_PAGE_CHANGE:
            return Object.assign({}, state, {page: action.page});
        case types.LOAD_DOCUMENT:
            return Object.assign({}, state, {document: action.document})
            
            
        default:
            return state;
    }
    
};

export default pdfReducer;