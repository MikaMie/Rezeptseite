import { createBrowserRouter } from "react-router-dom";

import HomePage from "./src/pages/general/HomePage";
import RecipeDetailView from "./src/pages/Detailview/RecipeDetailView";
import RootLayout from "./src/pages/general/RootLayout";
import NewRecipePage from "./src/pages/create/NewRecipePage";
import EditRecipepage from "./src/pages/Detailview/RecipeEditView";
import RegistrationPage from "./src/pages/auth/RegistrationPage";
import LoginPage from "./src/pages/auth/LoginPage";

import { loader as loadAllRecipes } from "./src/loader/loadAllRecipes";
import { loader as loadRecipeDetail } from "./src/loader/loadRecipeDetail";
import { action as createRecipeAction } from "./src/actions/createRecipeAction";
import { action as updateRecipeAction } from "./src/actions/updateRecipeAction";
import { action as registrationAction } from "./src/actions/registrationAction";
import { action as loginAction } from "./src/actions/loginAction";

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
      {
        path: "/recipe/:id/edit",
        element: <EditRecipepage />,
        loader: loadRecipeDetail,
        action: updateRecipeAction,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
        action: registrationAction,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

export default router;
