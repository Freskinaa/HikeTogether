import React, { Suspense, lazy }  from 'react';
import Layout from "./Layout";
import LazyLoading from '../utils/LazyLoading'

// This code defines a set of private routes for the application. It uses React's lazy loading to 
// load the 'Profile' page only when it's needed, improving performance by splitting the code into 
// smaller bundles. The routes are wrapped in a `Layout` component that manages the layout and 
// rendering of the page's content. It also includes a fallback component (`LazyLoading`) 
// while the `Profile` page is being loaded.

const Profile = lazy(() => import("../pages/Profile/Profile"));

// Used React's lazy function to dynamically import the 'Profile' component.
// This will only load the 'Profile' component when the user navigates to the '/profile' route,
// reducing the initial bundle size of the application.

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