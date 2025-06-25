import { redirect } from "react-router-dom";
const url = import.meta.env.API_URL;

export async function action({ request }) {
  const formData = await request.formData();

  const token = localStorage.getItem("token");

  const title = formData.get("title");
  const description = formData.get("description");
  const image_url = formData.get("image_url");
  const ingredients = formData.getAll("ingredients");
  const instructions = formData.getAll("instructions");

  const recipe = {
    title,
    description,
    image_url,
    ingredients,
    instructions,
  };

  try {
    const response = await fetch(`/api/recipes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      return { error: "Rezept konnte nicht gespeichert werden." };
    }

    return redirect("/recipes");
  } catch (error) {
    return { error: "Netzwerkfehler oder Server nicht erreichbar." };
  }
}
