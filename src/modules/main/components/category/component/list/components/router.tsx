import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const EditListCategoryComponent = lazy(() => import('./edit/components'));
const NewListCategoryComponent = lazy(() => import('./new/components'));

const ListCategoryRouter = () => {
	const routes: RouteObject[] = [
		{
			path: '',
			element: null
		},
		{
			path: `${routeConstant.ROUTE_NAME_MAIN_CATEGORY_NEW}`,
			element: (
				<Suspense fallback={null}>
					<NewListCategoryComponent />
				</Suspense>
			)
		},
		{
			path: `:categoryId/${routeConstant.ROUTE_NAME_MAIN_CATEGORY_EDIT}`,
			element: (
				<Suspense fallback={null}>
					<EditListCategoryComponent />
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

export default ListCategoryRouter;
