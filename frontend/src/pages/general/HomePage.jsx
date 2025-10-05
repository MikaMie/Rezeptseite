import { useLoaderData, Link } from "react-router-dom";
import RecipeCard from "../../components/recipes/RecipeCard";

export default function HomePage() {
  const data = useLoaderData();

  return (
    <div className="w-full sm:w-3/4 mx-auto p-10 min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
