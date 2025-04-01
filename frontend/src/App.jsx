import { RouterProvider } from "react-router-dom";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes"


function App() {
  const loggedUser = false;

  const router = createBrowserRouter([
    !!loggedUser ? PrivateRoutes() : {},
    PublicRoutes(),
  ]);

  return <RouterProvider router={router} />;
}

export default App;
