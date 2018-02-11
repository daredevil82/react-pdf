import * as types from './actionTypes';
import SearchAPI from './../api/SearchAPI';

export const onZoomIn = zoom => {
    return {type: types.ON_ZOOM_IN, zoom};
};

export const onZoomOut = zoom => {
    return {type: types.ON_ZOOM_OUT, zoom};
};

export const onPageChange = currentPage => {
    return {type: types.ON_PAGE_CHANGE, currentPage};
};

export const onSearchComplete = results => {
    console.debug(results);
    return {type: types.ON_SEARCH_COMPLETE, results};
};

export const onSearchExecute = query => {
    return dispatch => {
        const results = SearchAPI.query(query);
        return dispatch(onSearchComplete(results));
    };
};

export const onResultSelection = match => {
    SearchAPI.jumpToMatch(match.item);
    return {type: types.ON_RESULT_SELECT, match};
};