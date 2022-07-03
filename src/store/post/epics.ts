import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
	postCreateDataRequestAction,
	postCreateDataSuccessAction,
	postCreateLoadingRequestAction,
	postCreateLoadingSuccessAction,
	postDeleteDataRequestAction,
	postDeleteDataSuccessAction,
	postDeleteLoadingRequestAction,
	postDeleteLoadingSuccessAction,
	postListDataRequestAction,
	postListDataSuccessAction,
	postListFilterQRequestAction,
	postListFilterQSuccessAction,
	postListFilterQTempRequestAction,
	postListFilterQTempSuccessAction,
	postListFilterSortByRequestAction,
	postListFilterSortBySuccessAction,
	postListFilterSortDirectionRequestAction,
	postListFilterSortDirectionSuccessAction,
	postListLoadingRequestAction,
	postListLoadingSuccessAction,
	postListPaginationLimitRequestAction,
	postListPaginationLimitSuccessAction,
	postListPaginationPageRequestAction,
	postListPaginationPageSuccessAction,
	postListPaginationTotalRequestAction,
	postListPaginationTotalSuccessAction,
	postShowDataRequestAction,
	postShowDataSuccessAction,
	postShowLoadingRequestAction,
	postShowLoadingSuccessAction,
	postUpdateDataRequestAction,
	postUpdateDataSuccessAction,
	postUpdateLoadingRequestAction,
	postUpdateLoadingSuccessAction
} from './actions';

export const postListDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListDataRequestAction.match),
		map((action) => postListDataSuccessAction(action.payload))
	);

export const postListFilterSortDirectionEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListFilterSortDirectionRequestAction.match),
		map((action) => postListFilterSortDirectionSuccessAction(action.payload))
	);

export const postListFilterSortByEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListFilterSortByRequestAction.match),
		map((action) => postListFilterSortBySuccessAction(action.payload))
	);

export const postListFilterQEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListFilterQRequestAction.match),
		map((action) => postListFilterQSuccessAction(action.payload))
	);

export const postListFilterQTempEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListFilterQTempRequestAction.match),
		map((action) => postListFilterQTempSuccessAction(action.payload))
	);

export const postListLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListLoadingRequestAction.match),
		map((action) => postListLoadingSuccessAction(action.payload))
	);

export const postListPaginationPageEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListPaginationPageRequestAction.match),
		map((action) => postListPaginationPageSuccessAction(action.payload))
	);

export const postListPaginationLimitEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListPaginationLimitRequestAction.match),
		map((action) => postListPaginationLimitSuccessAction(action.payload))
	);

export const postListPaginationTotalEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postListPaginationTotalRequestAction.match),
		map((action) => postListPaginationTotalSuccessAction(action.payload))
	);

export const postShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postShowDataRequestAction.match),
		map((action) => postShowDataSuccessAction(action.payload))
	);

export const postShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postShowLoadingRequestAction.match),
		map((action) => postShowLoadingSuccessAction(action.payload))
	);

export const postCreateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postCreateDataRequestAction.match),
		map((action) => postCreateDataSuccessAction(action.payload))
	);

export const postCreateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postCreateLoadingRequestAction.match),
		map((action) => postCreateLoadingSuccessAction(action.payload))
	);

export const postUpdateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postUpdateDataRequestAction.match),
		map((action) => postUpdateDataSuccessAction(action.payload))
	);

export const postUpdateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postUpdateLoadingRequestAction.match),
		map((action) => postUpdateLoadingSuccessAction(action.payload))
	);

export const postDeleteDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postDeleteDataRequestAction.match),
		map((action) => postDeleteDataSuccessAction(action.payload))
	);

export const postDeleteLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(postDeleteLoadingRequestAction.match),
		map((action) => postDeleteLoadingSuccessAction(action.payload))
	);
