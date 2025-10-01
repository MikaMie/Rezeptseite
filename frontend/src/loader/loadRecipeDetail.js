const url = import.meta.env.API_URL;

export async function loader({ params }) {
  const { id } = params;
  const url = `http://localhost:3000/api/recipes/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Reponse status: ", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
