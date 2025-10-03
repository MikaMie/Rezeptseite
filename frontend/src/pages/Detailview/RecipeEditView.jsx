import { Form, useNavigation, useLoaderData } from "react-router-dom";
import { TAG_CATEGORIES } from "../../constants/tags";
import { useState, useEffect } from "react";
import Select from "react-select";
import DifficultySelector from "../../components/recipes/CRUD/DifficultySelector";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function EditRecipepage() {
  const data = useLoaderData();
  const navigation = useNavigation();

  // Großer State für das gesamte Rezept
  const [recipeData, setRecipeData] = useState({
    id: 0,
    title: "",
    description: "",
    image_url: "",
    ingredients: [""],
    instructions: [""],
    preparationTime: "",
    cookingTime: "",
    difficulty: 0,
  });

  // Vorbelegen der Daten beim Laden der Komponente
  useEffect(() => {
    if (data) {
      setRecipeData({
        id: data.id || 0,
        title: data.title || "",
        description: data.description || "",
        image_url: data.image_url || "",
        ingredients: data.ingredients?.length ? data.ingredients : [""],
        instructions: data.instructions?.length ? data.instructions : [""],
        preparationTime: data.preparationtime || "",
        cookingTime: data.cookingtime || "",
        difficulty: data.difficulty || 0,
      });
    }
  }, [data]);

  // Handler für Änderungen an einfachen Feldern (z. B. Titel, Beschreibung)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler für Zutaten
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index] = value;
    setRecipeData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    if (recipeData.ingredients.length > 1) {
      const newIngredients = recipeData.ingredients.filter(
        (_, i) => i !== index
      );
      setRecipeData((prev) => ({
        ...prev,
        ingredients: newIngredients,
      }));
    }
  };

  // Handler für Zubereitungsschritte
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipeData.instructions];
    newInstructions[index] = value;
    setRecipeData((prev) => ({
      ...prev,
      instructions: newInstructions,
    }));
  };

  const addInstruction = () => {
    setRecipeData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    if (recipeData.instructions.length > 1) {
      const newInstructions = recipeData.instructions.filter(
        (_, i) => i !== index
      );
      setRecipeData((prev) => ({
        ...prev,
        instructions: newInstructions,
      }));
    }
  };

  // Handler für Schwierigkeitsgrad
  const handleDifficultyChange = (value) => {
    setRecipeData((prev) => ({
      ...prev,
      difficulty: value,
    }));
  };

  // Formular-Validation
  const handleSubmit = (e) => {
    const hasIngredients = recipeData.ingredients.some(
      (ing) => ing.trim() !== ""
    );
    const hasInstructions = recipeData.instructions.some(
      (inst) => inst.trim() !== ""
    );

    if (!hasIngredients) {
      e.preventDefault();
      alert("Bitte mindestens eine Zutat angeben");
      return;
    }

    if (!hasInstructions) {
      e.preventDefault();
      alert("Bitte mindestens einen Zubereitungsschritt angeben");
      return;
    }
  };

  return (
    <div className="min-h-screen sm:min-h-0 max-w-2xl mx-auto p-6 bg-slate-50 mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Rezept bearbeiten
      </h2>

      <Form method="PUT" className="space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="recipeId" value={recipeData.id} />
        {/* Titel */}
        <div className="space-y-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Titel
          </label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleInputChange}
            placeholder="z.B. Spaghetti Carbonara"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Beschreibung */}
        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Beschreibung
          </label>
          <textarea
            name="description"
            value={recipeData.description}
            onChange={handleInputChange}
            placeholder="Beschreibe dein Rezept..."
            required
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Image */}
        <div className="space-y-1">
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700"
          >
            Bild-URL (optional)
          </label>
          <input
            type="text"
            name="image_url"
            value={recipeData.image_url}
            onChange={handleInputChange}
            placeholder="https://beispiel.de/bild.jpg"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {/* Image preview */}
          {recipeData.image_url && (
            <div className="mt-2">
              <img
                src={recipeData.image_url}
                alt="Rezeptbild-Vorschau"
                className="w-contain mx-auto max-h-50 object-contain rounded-md border border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null; // Verhindere Endlosschleife
                  e.target.src = "/placeholder-image.jpg"; // Fallback-Bild
                }}
              />
            </div>
          )}
        </div>

        {/* Zutaten */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Zutaten</h3>
          {recipeData.ingredients.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                name="ingredients"
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Zutat ${index + 1}`}
              />
              {recipeData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Zutat entfernen"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 cursor-pointer"
          >
            <span className="text-lg">+</span> Weitere Zutat hinzufügen
          </button>
        </div>

        {/* Anleitung */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Zubereitung</h3>
          {recipeData.instructions.map((step, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-gray-500 mt-2 min-w-[20px] text-center">
                {index + 1}
              </span>
              <div className="flex-1 flex items-center gap-2">
                <input
                  name="instructions"
                  type="text"
                  value={step}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Schritt ${index + 1}`}
                />
                {recipeData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors mt-2 cursor-pointer"
                    title="Schritt entfernen"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 cursor-pointer"
          >
            <span className="text-lg">+</span> Weitere Schritt hinzufügen
          </button>
        </div>

        {/* Zeitangaben */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="preparationTime"
              className="block text-sm font-medium text-gray-700"
            >
              Vorbereitungszeit
            </label>
            <input
              name="preparationTime"
              type="text"
              value={recipeData.preparationTime}
              onChange={handleInputChange}
              placeholder="z.B. 30 min"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="cookingTime"
              className="block text-sm font-medium text-gray-700"
            >
              Kochzeit
            </label>
            <input
              name="cookingTime"
              type="text"
              value={recipeData.cookingTime}
              onChange={handleInputChange}
              placeholder="z.B. 45 min"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Schwierigkeitsgrad */}
        <div className="space-y-1">
          <DifficultySelector
            difficulty={recipeData.difficulty}
            setDifficulty={handleDifficultyChange}
          />
          <input
            type="hidden"
            name="difficulty"
            value={recipeData.difficulty}
          />
        </div>

        {/* Submit-Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={navigation.state === "submitting"}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
              navigation.state === "submitting"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {navigation.state === "submitting"
              ? "Speichern..."
              : "Änderungen speichern?"}
          </button>
        </div>
      </Form>
    </div>
  );
}
