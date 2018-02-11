import * as types from './../actions/actionTypes';
import initialState from './initialState';


const pdfReducer = (state = initialState.pdf, action) => {
    switch(action.type){
        case types.ON_ZOOM_OUT:
            return Object.assign({}, state, {scale: state.scale / 1.1});
        case types.ON_ZOOM_IN:
            return Object.assign({}, state, {scale: state.scale * 1.1});
        case types.ON_PAGE_CHANGE:
            return Object.assign({}, state, {page: action.currentPage});
        case types.LOAD_DOCUMENT:
            return Object.assign({}, state, {document: action.document});
        case types.ON_SEARCH_EXECUTE:
            return Object.assign({}, state, {query: action.query});
        case types.ON_SEARCH_COMPLETE:
            return Object.assign({}, state, {results: action.results});
        case types.ON_RESULT_SELECT:
            return Object.assign({}, state, {match: action.match});
        default:
            return state;
    }
    
};

export default pdfReducer;