import { combineReducers } from '@reduxjs/toolkit';

import appReducer from './app/reducers';
import authReducer from './auth/reducers';
import categoryReducer from './category/reducers';
import postReducer from './post/reducers';
import profileReducer from './profile/reducers';
import settingReducer from './setting/reducers';
import userReducer from './user/reducers';

export default combineReducers({
	appState: appReducer,
	authState: authReducer,
	userState: userReducer,
	postState: postReducer,
	categoryState: categoryReducer,
	profileState: profileReducer,
	settingState: settingReducer
});
