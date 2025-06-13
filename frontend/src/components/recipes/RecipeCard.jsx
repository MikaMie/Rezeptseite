export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
        <p className="text-sm text-gray-500">
          {new Date(recipe.created_at).toLocaleDateString()}
        </p>
      </div>
      <p className="text-gray-700 mb-4">{recipe.description}</p>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-1">Zutaten:</h3>
        <ul className="list-disc list-inside text-gray-700">
          {recipe.zutaten?.map((zutat, index) => (
            <li key={index}>{zutat}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-1">Zubereitung:</h3>
        <ol className="list-decimal list-inside text-gray-700">
          {recipe.introductions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
