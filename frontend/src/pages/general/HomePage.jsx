import { useLoaderData, Link } from "react-router-dom";
import RecipeCard from "../../components/recipes/RecipeCard";

export default function HomePage() {
  const data = useLoaderData();

  return (
    <div className="w-full sm:w-3/4 mx-auto p-10 bg-slate-100 min-h-screen">
      <div className="flex flex-row gap-4 w-full justify-center items-center mb-10">
        <h1 className="sm:text-3xl font-semibold text-slate-600 underline ">
          Hier werden alle Rezepte dargestellt
        </h1>
        <Link to="/new-recipe">
          <button className="px-5 py-2 hover:bg-slate-300 rounded hover:border hover:border-slate-500 hover:shadow-md cursor-pointer text-3xl">
            +
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
