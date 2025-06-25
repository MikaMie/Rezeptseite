const url = import.meta.env.API_URL;

export async function loader({ params }) {
  const { id } = params;
  const url = `/api/recipes/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Reponse status: ", response.status);
    }
    const data = await response.json();
    //DEBUG
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
