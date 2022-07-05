import { RootState } from 'src/store';

export const selectCategory = (state: RootState) => state.categoryState;

export const selectCategoryList = (state: RootState) => state.categoryState.list;

export const selectCategoryShow = (state: RootState) => state.categoryState.show;

export const selectCategoryCreate = (state: RootState) => state.categoryState.create;

export const selectCategoryUpdate = (state: RootState) => state.categoryState.update;

export const selectCategoryDelete = (state: RootState) => state.categoryState.delete;
