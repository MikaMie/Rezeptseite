import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-4 py-2">
          <h2 className="text-lg font-semibold truncate">{recipe.title}</h2>
        </div>
      </div>

      <div className="p-5">

        <p className="text-gray-700 mb-4">{recipe.description}</p>
      </div>
    </Link>
  );
}
