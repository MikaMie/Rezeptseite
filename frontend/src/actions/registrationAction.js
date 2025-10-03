import { redirect } from "react-router-dom";
const url = import.meta.env.API_URL;

export async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const newUser = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      return { error: "User konnte nicht registriert werden" };
    }
    return redirect(`/`);
  } catch (err) {
    return {
      error:
        "Fehler beim registrieren des Users. Bitte versuche es später erneut!",
    };
  }
}
