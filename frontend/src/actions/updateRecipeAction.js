import { redirect } from "react-router-dom";
const url = import.meta.env.API_URL;

export async function action({ request }) {
  const formData = await request.formData();

  const token = localStorage.getItem("token");

  const id = formData.get("recipeId");
  const title = formData.get("title");
  const description = formData.get("description");
  const image_url = formData.get("image_url");
  const ingredients = formData.getAll("ingredients");
  const instructions = formData.getAll("instructions");
  const tags = formData.get("selectedTags");
  const preparationTime = formData.get("preparationTime");
  const cookingTime = formData.get("cookingTime");
  const difficulty = formData.get("difficulty");

  const recipe = {
    title,
    description,
    image_url,
    ingredients,
    instructions,
    tags,
    preparationTime,
    cookingTime,
    difficulty,
  };

  try {
    const response = await fetch(
      `http://localhost:3000/api/recipes/${id}/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipe),
      }
    );

    if (!response.ok) {
      return { error: "Rezept konnte nicht gespeichert werden." };
    }

    return redirect(`/recipe/${id}`);
  } catch (error) {
    return { error: "Netzwerkfehler oder Server nicht erreichbar." };
  }
}
