import { createBrowserRouter } from "react-router-dom";

import HomePage from "./src/pages/general/HomePage";

import { loader as loadAllRecipes } from "./src/loader/loadAllRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: loadAllRecipes,
  },
]);

export default router;
