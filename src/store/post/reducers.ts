import { createReducer } from '@reduxjs/toolkit';

import {
	postCreateDataSuccessAction,
	postCreateLoadingSuccessAction,
	postDeleteDataSuccessAction,
	postDeleteLoadingSuccessAction,
	postListDataSuccessAction,
	postListFilterQSuccessAction,
	postListFilterQTempSuccessAction,
	postListFilterSortBySuccessAction,
	postListFilterSortDirectionSuccessAction,
	postListLoadingSuccessAction,
	postListPaginationLimitSuccessAction,
	postListPaginationPageSuccessAction,
	postListPaginationTotalSuccessAction,
	postShowDataSuccessAction,
	postShowLoadingSuccessAction,
	postUpdateDataSuccessAction,
	postUpdateLoadingSuccessAction
} from './actions';
import * as filterConstant from 'src/constants/filter';
import * as paginationConstant from 'src/constants/pagination';
import { ResponseDataReducer, ResponseDataWithPaginationAndFilterReducer } from 'src/types/reducer';
import { Post } from 'src/types/post';

type PostState = {
	list: ResponseDataWithPaginationAndFilterReducer<Post[]>;
	show: ResponseDataReducer<Post>;
	create: ResponseDataReducer<Post>;
	update: ResponseDataReducer<Post>;
	delete: ResponseDataReducer<Post>;
};

const initialState: PostState = {
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
		data: {} as Post,
		loading: true
	},
	create: {
		data: {} as Post,
		loading: false
	},
	update: {
		data: {} as Post,
		loading: false
	},
	delete: {
		data: {} as Post,
		loading: false
	}
};

const postReducer = createReducer(initialState, (builder) => {
	builder.addCase(postListDataSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			data: action.payload
		}
	}));
	builder.addCase(postListPaginationPageSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				page: action.payload
			}
		}
	}));
	builder.addCase(postListPaginationLimitSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				limit: action.payload
			}
		}
	}));
	builder.addCase(postListPaginationTotalSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			pagination: {
				...state.list.pagination,
				total: action.payload
			}
		}
	}));
	builder.addCase(postListFilterSortBySuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_by: action.payload
			}
		}
	}));
	builder.addCase(postListFilterSortDirectionSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				sort_direction: action.payload
			}
		}
	}));
	builder.addCase(postListFilterQSuccessAction, (state, action) => ({
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
	builder.addCase(postListFilterQTempSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			filter: {
				...state.list.filter,
				q_temp: action.payload
			}
		}
	}));
	builder.addCase(postListLoadingSuccessAction, (state, action) => ({
		...state,
		list: {
			...state.list,
			loading: action.payload
		}
	}));
	builder.addCase(postShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(postShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			loading: action.payload
		}
	}));
	builder.addCase(postCreateDataSuccessAction, (state, action) => ({
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
	builder.addCase(postCreateLoadingSuccessAction, (state, action) => ({
		...state,
		create: {
			...state.create,
			loading: action.payload
		}
	}));
	builder.addCase(postUpdateDataSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			data: action.payload
		}
	}));
	builder.addCase(postUpdateLoadingSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			loading: action.payload
		}
	}));
	builder.addCase(postDeleteDataSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			data: action.payload
		}
	}));
	builder.addCase(postDeleteLoadingSuccessAction, (state, action) => ({
		...state,
		delete: {
			...state.delete,
			loading: action.payload
		}
	}));
});

export default postReducer;
