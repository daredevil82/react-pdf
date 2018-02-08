import * as types from './actionTypes';

export const onZoomIn = zoom => {
    return {type: types.ON_ZOOM_IN, zoom};
};

export const onZoomOut = zoom => {
    return {type: types.ON_ZOOM_OUT, zoom}
};

export const onScaleChanged = updatedScale => {
    return {type: types.ON_SCALE_CHANGE, updatedScale}
};

export const onPageChange = currentPage => {
    return {type: types.ON_PAGE_CHANGE, currentPage};
};

export const onDocumentLoad = document => {
    return {type: types.LOAD_DOCUMENT, document}
};