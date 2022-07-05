import { createReducer } from '@reduxjs/toolkit';

import {
	categoryCreateDataSuccessAction,
	categoryCreateLoadingSuccessAction,
	categoryDeleteDataSuccessAction,
	categoryDeleteLoadingSuccessAction,
	categoryListDataSuccessAction,
	categoryListFilterQSuccessAction,
	categoryListFilterQTempSuccessAction,
	categoryListFilterSortBySuccessAction,
	categoryListFilterSortDirectionSuccessAction,
	categoryListLoadingSuccessAction,
	categoryListPaginationLimitSuccessAction,
	categoryListPaginationPageSuccessAction,
	categoryListPaginationTotalSuccessAction,
	categoryShowDataSuccessAction,
	categoryShowLoadingSuccessAction,
	categoryUpdateDataSuccessAction,
	categoryUpdateLoadingSuccessAction
} from './actions';
import * as filterConstant from 'src/constants/filter';
import * as paginationConstant from 'src/constants/pagination';
import { ResponseDataReducer, ResponseDataWithPaginationAndFilterReducer } from 'src/types/reducer';
import { Category } from 'src/types/category';

type CategoryState = {
	list: ResponseDataWithPaginationAndFilterReducer<Category[]>;
	show: ResponseDataReducer<Category>;
	create: ResponseDataReducer<Category>;
	update: ResponseDataReducer<Category>;
	delete: ResponseDataReducer<Category>;
};

const initialState: CategoryState = {
	list: {
		data: [],
		pagination: {
			page: paginationConstant.PAGINATION_DEFAULT_PAGE,
			limit: paginationConstant.PAGINATION_DEFAULT_LIMIT,
			total: 0
		},
		filter: {
			q: '',
			q_temp: '',
			sort_direction: filterConstant.FILTER_DEFAULT_SORT_DIRECTION,
			sort_by: filterConstant.FILTER_DEFAULT_SORT_BY
		},
		loading: true
	},
	show: {
		data: {} as Category,
		loading: true
	},
	create: {
		data: {} as Category,
		loading: false
	},
	update: {
		data: {} as Category,
		loading: false
	},
	delete: {
		data: {} as Category,
		loading: false
	}
};

const categoryReducer = createReducer(initialState, (builder) => {
	builder.addCase(categoryListDataSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			data: action.payload
		}
	}));
	builder.addCase(categoryListPaginationPageSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: action.payload
			}
		}
	}));
	builder.addCase(categoryListPaginationLimitSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				limit: action.payload
			}
		}
	}));
	builder.addCase(categoryListPaginationTotalSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				total: action.payload
			}
		}
	}));
	builder.addCase(categoryListFilterSortBySuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_by: action.payload
			}
		}
	}));
	builder.addCase(categoryListFilterSortDirectionSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_direction: action.payload
			}
		}
	}));
	builder.addCase(categoryListFilterQSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: 1
			},
			filter: {
				...state.list.filter,
				q: action.payload
			}
		}
	}));
	builder.addCase(categoryListFilterQTempSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				q_temp: action.payload
			}
		}
	}));
	builder.addCase(categoryListLoadingSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			loading: action.payload
		}
	}));
	builder.addCase(categoryShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(categoryShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			loading: action.payload
		}
	}));
	builder.addCase(categoryCreateDataSuccessAction, (state, action) => ({
		...state,
		create: {
			...state.create,
			data: action.payload
		},
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: 1
			}
		}
	}));
	builder.addCase(categoryCreateLoadingSuccessAction, (state, action) => ({
		...state,
		create: {
			...state.create,
			loading: action.payload
		}
	}));
	builder.addCase(categoryUpdateDataSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			data: action.payload
		}
	}));
	builder.addCase(categoryUpdateLoadingSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			loading: action.payload
		}
	}));
	builder.addCase(categoryDeleteDataSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			data: action.payload
		}
	}));
	builder.addCase(categoryDeleteLoadingSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			loading: action.payload
		}
	}));
});

export default categoryReducer;
