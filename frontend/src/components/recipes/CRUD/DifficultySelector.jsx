import { FireIcon as FireIconSolid } from "@heroicons/react/24/solid";
import { FireIcon as FireIconOutline } from "@heroicons/react/24/outline";

export default function DifficultySelector({ difficulty, setDifficulty }) {
  const maxDifficulty = 5;

  return (
    <div className="mb-6">
      <label className="block font-medium font-semibold text-gray-700 mb-2">
        Schwierigkeitsgrad
      </label>
      <div className="flex space-x-1">
        {[...Array(maxDifficulty)].map((_, index) => {
          const isActive = index < difficulty;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setDifficulty(index + 1)}
              className={`p-1 rounded-full transition-colors cursor-pointer ${
                isActive
                  ? "text-amber-500"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              aria-label={`Schwierigkeit ${index + 1} von 5`}
            >
              {isActive ? (
                <FireIconSolid className="h-8 w-8" />
              ) : (
                <FireIconOutline className="h-8 w-8" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
