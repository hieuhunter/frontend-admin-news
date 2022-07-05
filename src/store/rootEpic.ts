import { combineEpics } from 'redux-observable';

import * as appEpic from './app/epics';
import * as authEpic from './auth/epics';
import * as profileEpic from './profile/epics';
import * as settingEpic from './setting/epics';
import * as userEpic from './user/epics';
import * as postEpic from './post/epics';
import * as categoryEpic from './category/epics';


export default combineEpics(
	...Object.values(appEpic),
	...Object.values(authEpic),
	...Object.values(userEpic),
	...Object.values(profileEpic),
	...Object.values(settingEpic),
	...Object.values(postEpic),
	...Object.values(categoryEpic)
);
