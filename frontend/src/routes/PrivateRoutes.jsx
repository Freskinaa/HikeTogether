import React, { Suspense, lazy }  from 'react';
import Layout from "./Layout";
import LazyLoading from '../utils/LazyLoading'

const Profile = lazy(() => import("../pages/Profile/Profile"));

const PrivateRoutes = () => {
  return {
    element: <Layout />,
    children: [
      {
        path: "/profile",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <Profile />
          </Suspense>
        ),
      }
    ],
  };
};

export default PrivateRoutes