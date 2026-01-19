import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":type/:uid", element: <Details /> } // people/1, planets/5, vehicles/14
    ]
  }
]);