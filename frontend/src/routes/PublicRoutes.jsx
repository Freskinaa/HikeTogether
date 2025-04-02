import React , { Suspense, lazy } from "react";
import Layout from "./Layout";
import LazyLoading from '../utils/LazyLoading';

const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const LogIn = lazy(() => import("../pages/Auth/LogIn"));
const Home = lazy(() => import("../pages/Home/Home"));
const Trails = lazy(() => import("../pages/Trail/Trails"));
const Events = lazy(() => import("../pages/Event/Events"));

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
    ],
  };
};

export default PublicRoutes;
