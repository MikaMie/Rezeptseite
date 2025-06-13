export async function loader() {
  const url = `/api/recipes/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response status: ", response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
