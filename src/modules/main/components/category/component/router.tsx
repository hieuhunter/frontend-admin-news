import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const ListCategoryComponent = lazy(() => import('./list/components'));

const CategoryRouter = () => {
    const routes: RouteObject[] = [
        {
            path: '/*',
            element: (
                <Suspense fallback={null}>
                    <ListCategoryComponent />
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

export default CategoryRouter;
