import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const EditListPostComponent = lazy(() => import('./edit/components'));
const NewListPostComponent = lazy(() => import('./new/components'));

const ListPostRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '',
			element: null
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_POST_NEW}`,
			element: (
				<Suspense fallback={null}>
					<NewListPostComponent />
				</Suspense>
			)
		},
		{
			path: `:postId/${routeConstant.ROUTE_NAME_MAIN_POST_EDIT}`,
			element: (
				<Suspense fallback={null}>
					<EditListPostComponent />
				</Suspense>
			)
		},
		{
			path: '*',
			element: <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} />
		}
	];

	return useRoutes(routes);
};

export default ListPostRouter;
