import { useLoaderData } from "react-router-dom";
import RecipeCard from "../../components/recipes/RecipeCard";

export default function HomePage() {
  const data = useLoaderData();

  return (
    <div className="w-3/4 mx-auto p-10 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-slate-600 underline mb-10 text-center">
        Hier werden alle Rezepte dargestellt
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
