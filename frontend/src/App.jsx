import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { restoreSession } from "./store/authSlice";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import "./App.css";
// App Component
// This component handles the routing and session restoration for the app.
// It checks if the user has an access token, and based on that, it either 
// renders public or private routes. It also manages loading state while 
// the session is being restored.

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accesstoken);
  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const router = createBrowserRouter([
    PublicRoutes(),
    ...(accessToken ? [PrivateRoutes()] : []),
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
}

export default App;
