import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="sm:w-full sm:h-48 h-30 object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white/40 backdrop-blur-xs text-gray-900 px-4 py-2">
          <h2 className="sm:text-lg font-semibold text-center text-xs">
            {recipe.title}
          </h2>
        </div>
      </div>

      <div className="sm:p-5 hidden sm:block">
        <p className="sm:text-gray-700 sm:mb-4">{recipe.description}</p>
      </div>
    </Link>
  );
}
