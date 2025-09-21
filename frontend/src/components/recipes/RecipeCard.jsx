import { Link } from "react-router-dom";
import { FireIcon as FireIconSolid } from "@heroicons/react/24/solid";
import { FireIcon as FireIconOutline } from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/solid";

export default function RecipeCard({ recipe }) {
  const title = recipe?.title ?? "Rezept";
  const img = recipe?.image_url;
  const difficulty = recipe?.difficulty;
  const desc = recipe?.description ?? "";
  const workTime = recipe.preparationtime + recipe.cookingtime;

  console.log(recipe);

  return (
    <Link
      to={`/recipe/${recipe?.id}`}
      aria-label={`Rezept öffnen: ${title}`}
      className="
        group block h-full
        rounded-2xl border border-gray-200 bg-white shadow-md transition
        hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500
        dark:bg-stone-900 dark:border-stone-800
        print:shadow-none print:border print:break-inside-avoid
      "
    >
      {/* Media */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {/* Difficulty */}
        <div className="absolute top-2 right-2 z-10 flex gap-0.5 flex-col">
          <div className="flex flex-row">
            {" "}
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="h-5 w-5">
                {level <= difficulty ? (
                  <FireIconSolid className="text-red-600 dark:text-amber-400" />
                ) : (
                  <FireIconOutline className="text-gray-300 dark:text-stone-600" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className="aspect-[4/3] sm:aspect-[16/9] bg-gray-100 dark:bg-stone-800 relative">
          {img ? (
            <img
              src={img}
              alt={title}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Bild folgt
            </div>
          )}
        </div>

        {/* Titel-Overlay */}
        <div
          className="
            absolute inset-x-0 bottom-0 px-4 py-2
            bg-gradient-to-t from-white/80 to-white/10 backdrop-blur-sm
            dark:from-stone-900/80 dark:to-stone-900/10
          "
        >
          <h2
            className="
              text-center font-semibold
              text-sm sm:text-base md:text-lg
              text-gray-900 dark:text-stone-100
              line-clamp-2
            "
            title={title}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="hidden sm:block sm:p-5">
        {desc ? (
          <p className="text-gray-700 dark:text-stone-300 line-clamp-3">
            {desc}
          </p>
        ) : (
          <p className="text-gray-400 dark:text-stone-500 italic">
            Keine Beschreibung
          </p>
        )}

        {workTime ? (
          <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-stone-400">
            {workTime && (
              <span className="flex flex-row items-center gap-1">
                <ClockIcon className="h-4 w-4" /> {workTime} Minuten
              </span>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
}
