import { createAction } from '@reduxjs/toolkit';

import * as actionTypes from './actionTypes';
import { Category } from 'src/types/category';

export const categoryListDataRequestAction = createAction(actionTypes.CATEGORY_LIST_DATA_REQUEST, (payload: Category[]) => ({
	payload: payload
}));

export const categoryListDataSuccessAction = createAction(actionTypes.CATEGORY_LIST_DATA_SUCCESS, (payload: Category[]) => ({
	payload: payload
}));

export const categoryListPaginationPageRequestAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_PAGE_REQUEST, (payload: number) => ({
	payload: payload
}));

export const categoryListPaginationPageSuccessAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_PAGE_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const categoryListPaginationLimitRequestAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_LIMIT_REQUEST, (payload: number) => ({
	payload: payload
}));

export const categoryListPaginationLimitSuccessAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_LIMIT_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const categoryListPaginationTotalRequestAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_TOTAL_REQUEST, (payload: number) => ({
	payload: payload
}));

export const categoryListPaginationTotalSuccessAction = createAction(actionTypes.CATEGORY_LIST_PAGINATION_TOTAL_SUCCESS, (payload: number) => ({
	payload: payload
}));

export const categoryListFilterSortDirectionRequestAction = createAction(actionTypes.CATEGORY_LIST_FILTER_SORT_DIRECTION_REQUEST, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterSortDirectionSuccessAction = createAction(actionTypes.CATEGORY_LIST_FILTER_SORT_DIRECTION_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterSortByRequestAction = createAction(actionTypes.CATEGORY_LIST_FILTER_SORT_BY_REQUEST, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterSortBySuccessAction = createAction(actionTypes.CATEGORY_LIST_FILTER_SORT_BY_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterQRequestAction = createAction(actionTypes.CATEGORY_LIST_FILTER_Q_REQUEST, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterQSuccessAction = createAction(actionTypes.CATEGORY_LIST_FILTER_Q_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterQTempRequestAction = createAction(actionTypes.CATEGORY_LIST_FILTER_Q_TEMP_REQUEST, (payload: string) => ({
	payload: payload
}));

export const categoryListFilterQTempSuccessAction = createAction(actionTypes.CATEGORY_LIST_FILTER_Q_TEMP_SUCCESS, (payload: string) => ({
	payload: payload
}));

export const categoryListLoadingRequestAction = createAction(actionTypes.CATEGORY_LIST_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const categoryListLoadingSuccessAction = createAction(actionTypes.CATEGORY_LIST_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const categoryShowDataRequestAction = createAction(actionTypes.CATEGORY_SHOW_DATA_REQUEST, (payload: Category) => ({
	payload: payload
}));

export const categoryShowDataSuccessAction = createAction(actionTypes.CATEGORY_SHOW_DATA_SUCCESS, (payload: Category) => ({
	payload: payload
}));

export const categoryShowLoadingRequestAction = createAction(actionTypes.CATEGORY_SHOW_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const categoryShowLoadingSuccessAction = createAction(actionTypes.CATEGORY_SHOW_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const categoryCreateDataRequestAction = createAction(actionTypes.CATEGORY_CREATE_DATA_REQUEST, (payload: Category) => ({
	payload: payload
}));

export const categoryCreateDataSuccessAction = createAction(actionTypes.CATEGORY_CREATE_DATA_SUCCESS, (payload: Category) => ({
	payload: payload
}));

export const categoryCreateLoadingRequestAction = createAction(actionTypes.CATEGORY_CREATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const categoryCreateLoadingSuccessAction = createAction(actionTypes.CATEGORY_CREATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const categoryUpdateDataRequestAction = createAction(actionTypes.CATEGORY_UPDATE_DATA_REQUEST, (payload: Category) => ({
	payload: payload
}));

export const categoryUpdateDataSuccessAction = createAction(actionTypes.CATEGORY_UPDATE_DATA_SUCCESS, (payload: Category) => ({
	payload: payload
}));

export const categoryUpdateLoadingRequestAction = createAction(actionTypes.CATEGORY_UPDATE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const categoryUpdateLoadingSuccessAction = createAction(actionTypes.CATEGORY_UPDATE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));

export const categoryDeleteDataRequestAction = createAction(actionTypes.CATEGORY_DELETE_DATA_REQUEST, (payload: Category) => ({
	payload: payload
}));

export const categoryDeleteDataSuccessAction = createAction(actionTypes.CATEGORY_DELETE_DATA_SUCCESS, (payload: Category) => ({
	payload: payload
}));

export const categoryDeleteLoadingRequestAction = createAction(actionTypes.CATEGORY_DELETE_LOADING_REQUEST, (payload: boolean) => ({
	payload: payload
}));

export const categoryDeleteLoadingSuccessAction = createAction(actionTypes.CATEGORY_DELETE_LOADING_SUCCESS, (payload: boolean) => ({
	payload: payload
}));
