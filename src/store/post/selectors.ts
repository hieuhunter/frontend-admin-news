import { RootState } from 'src/store';

export const selectPost = (state: RootState) => state.postState;

export const selectPostList = (state: RootState) => state.postState.list;

export const selectPostShow = (state: RootState) => state.postState.show;

export const selectPostCreate = (state: RootState) => state.postState.create;

export const selectPostUpdate = (state: RootState) => state.postState.update;

export const selectPostDelete = (state: RootState) => state.postState.delete;
