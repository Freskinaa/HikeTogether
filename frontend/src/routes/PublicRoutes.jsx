import React , { Suspense, lazy } from "react";
import Layout from "./Layout";
import LazyLoading from '../utils/LazyLoading';


// This code defines a set of public routes for the application. It uses React's lazy loading 
// to load each of the components dynamically when the route is accessed, improving the 
// performance by splitting the code into smaller chunks. The routes are wrapped inside a 
// `Layout` component to maintain a consistent layout for all pages. It also includes a 
// fallback component (`LazyLoading`) while each page is being loaded.

const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const LogIn = lazy(() => import("../pages/Auth/LogIn"));
const Home = lazy(() => import("../pages/Home/Home"));
const Trails = lazy(() => import("../pages/Trail/Trails"));
const Events = lazy(() => import("../pages/Event/Events"));
const SingleTrail = lazy(() => import("../pages/Trail/SingleTrail"));
const SingleEvent = lazy(() => import("../pages/Event/SingleEvent"));

// Used React's lazy function to dynamically import the components for the public routes
const PublicRoutes = () => {
  return {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <LogIn />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "/trails",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <Trails />
          </Suspense>
        ),
      },
      {
        path: "/trails/:id",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <SingleTrail />
          </Suspense>
        ),
      },
      {
        path: "/events",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <Events />
          </Suspense>
        ),
      },
      {
        path: "/events/:id",
        element: (
          <Suspense
            fallback={
              <div>
                <LazyLoading />
              </div>
            }
          >
            <SingleEvent />
          </Suspense>
        ),
      },
    ],
  };
};

// The `PublicRoutes` function returns an object that defines the public routes for the application.
// Each route is defined with a path and a corresponding component that will be loaded when the route is accessed
export default PublicRoutes;
