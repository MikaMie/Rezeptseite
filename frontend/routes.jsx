import { createBrowserRouter } from "react-router-dom";

import HomePage from "./src/pages/general/HomePage";
import RecipeDetailView from "./src/pages/Detailview/RecipeDetailView";
import RootLayout from "./src/pages/general/RootLayout";
import NewRecipePage from "./src/pages/create/NewRecipePage";

import { loader as loadAllRecipes } from "./src/loader/loadAllRecipes";
import { loader as loadRecipeDetail } from "./src/loader/loadRecipeDetail";
import { action as createRecipeAction } from "./src/actions/createRecipeAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: loadAllRecipes,
      },
      {
        path: "/new-recipe",
        element: <NewRecipePage />,
        action: createRecipeAction,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetailView />,
        loader: loadRecipeDetail,
      },
    ],
  },
]);

export default router;
