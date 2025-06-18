import { redirect } from "react-router-dom";

export async function action({ request }) {
  const data = await request.formData();
  const password = data.get("password");

  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return redirect("/recipes");
  } else {
    setError("Falsches Passwort");
  }
}
