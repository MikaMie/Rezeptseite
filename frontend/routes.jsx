import { createBrowserRouter } from "react-router-dom";

import HomePage from "./src/pages/general/HomePage";
import RecipeDetailView from "./src/pages/Detailview/RecipeDetailView";
import RecipeOutlet from "./src/pages/Detailview/RecipeOutlet";
import LoginPage from "./src/pages/auth/LoginPage";
import NewRecipePage from "./src/pages/general/NewRecipePage";

import { loader as loadAllRecipes } from "./src/loader/loadAllRecipes";
import { loader as loadRecipeDetail } from "./src/loader/loadRecipeDetail";
import { action as loginAction } from "./src/actions/loginAction";
import { action as createRecipeAction } from "./src/actions/createRecipeAction";

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
    path: "/new-recipe",
    element: <NewRecipePage />,
    action: createRecipeAction,
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
