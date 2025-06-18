import { createBrowserRouter } from "react-router-dom";

import HomePage from "./src/pages/general/HomePage";
import RecipeDetailView from "./src/pages/Detailview/RecipeDetailView";
import RecipeOutlet from "./src/pages/Detailview/RecipeOutlet";
import LoginPage from "./src/pages/auth/LoginPage";

import { loader as loadAllRecipes } from "./src/loader/loadAllRecipes";
import { loader as loadRecipeDetail } from "./src/loader/loadRecipeDetail";
import { action as loginAction } from "./src/actions/loginAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: loginAction,
  },
  {
    path: "/recipes",
    element: <HomePage />,
    loader: loadAllRecipes,
  },
  {
    path: "/recipe",
    element: <RecipeOutlet />,
    children: [
      {
        path: ":id",
        element: <RecipeDetailView />,
        loader: loadRecipeDetail,
      },
    ],
  },
]);

export default router;
