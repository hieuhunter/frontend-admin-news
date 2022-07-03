import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Post } from 'src/types/post';

export const postListDataRequestAction = createAction(actionTypes.POST_LIST_DATA_REQUEST, (payload: Post[]) => ({
	payload: payload
}));

export const postListDataSuccessAction = createAction(actionTypes.POST_LIST_DATA_SUCCESS, (payload: Post[]) => ({
	payload: payload
}));

export const postListPaginationPageRequestAction = createAction(actionTypes.POST_LIST_PAGINATION_PAGE_REQUEST, (payload: number) => ({
	payload: payload
}));

export const postListPaginationPageSuccessAction = createAction(actionTypes.POST_LIST_PAGINATION_PAGE_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const postListPaginationLimitRequestAction = createAction(actionTypes.POST_LIST_PAGINATION_LIMIT_REQUEST, (payload: number) => ({
	payload: payload
}));

export const postListPaginationLimitSuccessAction = createAction(actionTypes.POST_LIST_PAGINATION_LIMIT_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const postListPaginationTotalRequestAction = createAction(actionTypes.POST_LIST_PAGINATION_TOTAL_REQUEST, (payload: number) => ({
	payload: payload
}));

export const postListPaginationTotalSuccessAction = createAction(actionTypes.POST_LIST_PAGINATION_TOTAL_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const postListFilterSortDirectionRequestAction = createAction(actionTypes.POST_LIST_FILTER_SORT_DIRECTION_REQUEST, (payload: string) => ({
	payload: payload
}));

export const postListFilterSortDirectionSuccessAction = createAction(actionTypes.POST_LIST_FILTER_SORT_DIRECTION_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const postListFilterSortByRequestAction = createAction(actionTypes.POST_LIST_FILTER_SORT_BY_REQUEST, (payload: string) => ({
	payload: payload
}));

export const postListFilterSortBySuccessAction = createAction(actionTypes.POST_LIST_FILTER_SORT_BY_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const postListFilterQRequestAction = createAction(actionTypes.POST_LIST_FILTER_Q_REQUEST, (payload: string) => ({
	payload: payload
}));

export const postListFilterQSuccessAction = createAction(actionTypes.POST_LIST_FILTER_Q_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const postListFilterQTempRequestAction = createAction(actionTypes.POST_LIST_FILTER_Q_TEMP_REQUEST, (payload: string) => ({
	payload: payload
}));

export const postListFilterQTempSuccessAction = createAction(actionTypes.POST_LIST_FILTER_Q_TEMP_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const postListLoadingRequestAction = createAction(actionTypes.POST_LIST_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const postListLoadingSuccessAction = createAction(actionTypes.POST_LIST_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const postShowDataRequestAction = createAction(actionTypes.POST_SHOW_DATA_REQUEST, (payload: Post) => ({
	payload: payload
}));

export const postShowDataSuccessAction = createAction(actionTypes.POST_SHOW_DATA_SUCCESS, (payload: Post) => ({
	payload: payload
}));

export const postShowLoadingRequestAction = createAction(actionTypes.POST_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const postShowLoadingSuccessAction = createAction(actionTypes.POST_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const postCreateDataRequestAction = createAction(actionTypes.POST_CREATE_DATA_REQUEST, (payload: Post) => ({
	payload: payload
}));

export const postCreateDataSuccessAction = createAction(actionTypes.POST_CREATE_DATA_SUCCESS, (payload: Post) => ({
	payload: payload
}));

export const postCreateLoadingRequestAction = createAction(actionTypes.POST_CREATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const postCreateLoadingSuccessAction = createAction(actionTypes.POST_CREATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const postUpdateDataRequestAction = createAction(actionTypes.POST_UPDATE_DATA_REQUEST, (payload: Post) => ({
	payload: payload
}));

export const postUpdateDataSuccessAction = createAction(actionTypes.POST_UPDATE_DATA_SUCCESS, (payload: Post) => ({
	payload: payload
}));

export const postUpdateLoadingRequestAction = createAction(actionTypes.POST_UPDATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const postUpdateLoadingSuccessAction = createAction(actionTypes.POST_UPDATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const postDeleteDataRequestAction = createAction(actionTypes.POST_DELETE_DATA_REQUEST, (payload: Post) => ({
	payload: payload
}));

export const postDeleteDataSuccessAction = createAction(actionTypes.POST_DELETE_DATA_SUCCESS, (payload: Post) => ({
	payload: payload
}));

export const postDeleteLoadingRequestAction = createAction(actionTypes.POST_DELETE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const postDeleteLoadingSuccessAction = createAction(actionTypes.POST_DELETE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
