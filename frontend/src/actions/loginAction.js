import { redirect } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

export async function action({ request }) {
  const data = await request.formData();
  const password = data.get("password");

  try {
    const response = await fetch(`http://localhost:3000/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      return { error: "Falsches Passwort" };
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return redirect("/recipes");
  } catch (error) {
    return { error: "Ein unerwarteter Fehler ist aufgetreten." };
  }
}
