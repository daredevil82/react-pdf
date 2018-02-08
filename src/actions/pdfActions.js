import * as types from './actionTypes';

export const onZoomIn = zoom => {
    return {type: types.ON_ZOOM_IN, zoom};
};

export const onZoomOut = zoom => {
    return {type: types.ON_ZOOM_OUT, zoom}
};

export const onPageChange = currentPage => {
    return {type: types.ON_PAGE_CHANGE, currentPage};
};