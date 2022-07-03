import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const ListPostComponent = lazy(() => import('./list/components'));

const PostRouter = () => {
    const routes: RouteObject[] = [
        {
            path: '/*',
            element: (
                <Suspense fallback={null}>
                    <ListPostComponent />
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

export default PostRouter;
