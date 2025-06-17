export async function loader() {
  const url = `http://localhost:3000/api/recipes/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response status: ", response.status);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
