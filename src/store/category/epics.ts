import { Action } from '@reduxjs/toolkit';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
	categoryCreateDataRequestAction,
	categoryCreateDataSuccessAction,
	categoryCreateLoadingRequestAction,
	categoryCreateLoadingSuccessAction,
	categoryDeleteDataRequestAction,
	categoryDeleteDataSuccessAction,
	categoryDeleteLoadingRequestAction,
	categoryDeleteLoadingSuccessAction,
	categoryListDataRequestAction,
	categoryListDataSuccessAction,
	categoryListFilterQRequestAction,
	categoryListFilterQSuccessAction,
	categoryListFilterQTempRequestAction,
	categoryListFilterQTempSuccessAction,
	categoryListFilterSortByRequestAction,
	categoryListFilterSortBySuccessAction,
	categoryListFilterSortDirectionRequestAction,
	categoryListFilterSortDirectionSuccessAction,
	categoryListLoadingRequestAction,
	categoryListLoadingSuccessAction,
	categoryListPaginationLimitRequestAction,
	categoryListPaginationLimitSuccessAction,
	categoryListPaginationPageRequestAction,
	categoryListPaginationPageSuccessAction,
	categoryListPaginationTotalRequestAction,
	categoryListPaginationTotalSuccessAction,
	categoryShowDataRequestAction,
	categoryShowDataSuccessAction,
	categoryShowLoadingRequestAction,
	categoryShowLoadingSuccessAction,
	categoryUpdateDataRequestAction,
	categoryUpdateDataSuccessAction,
	categoryUpdateLoadingRequestAction,
	categoryUpdateLoadingSuccessAction
} from './actions';

export const categoryListDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListDataRequestAction.match),
		map((action) => categoryListDataSuccessAction(action.payload))
	);

export const categoryListFilterSortDirectionEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListFilterSortDirectionRequestAction.match),
		map((action) => categoryListFilterSortDirectionSuccessAction(action.payload))
	);

export const categoryListFilterSortByEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListFilterSortByRequestAction.match),
		map((action) => categoryListFilterSortBySuccessAction(action.payload))
	);

export const categoryListFilterQEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListFilterQRequestAction.match),
		map((action) => categoryListFilterQSuccessAction(action.payload))
	);

export const categoryListFilterQTempEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListFilterQTempRequestAction.match),
		map((action) => categoryListFilterQTempSuccessAction(action.payload))
	);

export const categoryListLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListLoadingRequestAction.match),
		map((action) => categoryListLoadingSuccessAction(action.payload))
	);

export const categoryListPaginationPageEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListPaginationPageRequestAction.match),
		map((action) => categoryListPaginationPageSuccessAction(action.payload))
	);

export const categoryListPaginationLimitEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListPaginationLimitRequestAction.match),
		map((action) => categoryListPaginationLimitSuccessAction(action.payload))
	);

export const categoryListPaginationTotalEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryListPaginationTotalRequestAction.match),
		map((action) => categoryListPaginationTotalSuccessAction(action.payload))
	);

export const categoryShowDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryShowDataRequestAction.match),
		map((action) => categoryShowDataSuccessAction(action.payload))
	);

export const categoryShowLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryShowLoadingRequestAction.match),
		map((action) => categoryShowLoadingSuccessAction(action.payload))
	);

export const categoryCreateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryCreateDataRequestAction.match),
		map((action) => categoryCreateDataSuccessAction(action.payload))
	);

export const categoryCreateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryCreateLoadingRequestAction.match),
		map((action) => categoryCreateLoadingSuccessAction(action.payload))
	);

export const categoryUpdateDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryUpdateDataRequestAction.match),
		map((action) => categoryUpdateDataSuccessAction(action.payload))
	);

export const categoryUpdateLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryUpdateLoadingRequestAction.match),
		map((action) => categoryUpdateLoadingSuccessAction(action.payload))
	);

export const categoryDeleteDataEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryDeleteDataRequestAction.match),
		map((action) => categoryDeleteDataSuccessAction(action.payload))
	);

export const categoryDeleteLoadingEpic = (action$: Observable<Action>): Observable<Action> =>
	action$.pipe(
		filter(categoryDeleteLoadingRequestAction.match),
		map((action) => categoryDeleteLoadingSuccessAction(action.payload))
	);
