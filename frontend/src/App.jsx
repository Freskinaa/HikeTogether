import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { restoreSession } from "./store/authSlice";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import "./App.css";

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
