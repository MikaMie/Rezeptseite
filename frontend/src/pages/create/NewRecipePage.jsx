import { Form, useNavigation } from "react-router-dom";
import { TAG_CATEGORIES } from "../../constants/tags";
import { useState } from "react";
import Select from "react-select";
import DifficultySelector from "../../components/recipes/CRUD/DifficultySelector";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function NewRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [difficulty, setDifficulty] = useState(0);
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  // Ingredient Functions
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };
  const handleIngredientChange = (i, value) => {
    const newItems = [...ingredients];
    newItems[i] = value;
    setIngredients(newItems);
  };

  // Instruction Functions
  const addInstruction = () => setInstructions([...instructions, ""]);
  const removeInstruction = (index) => {
    if (instructions.length > 1) {
      const newInstructions = instructions.filter((_, i) => i !== index);
      setInstructions(newInstructions);
    }
  };
  const handleInstructionChange = (i, value) => {
    const newItems = [...instructions];
    newItems[i] = value;
    setInstructions(newItems);
  };

  // Tag Handling
  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions || []);
  };

  // Form Validation
  const handleSubmit = (e) => {
    const hasIngredients = ingredients.some((ing) => ing.trim() !== "");
    const hasInstructions = instructions.some((inst) => inst.trim() !== "");

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
        Neues Rezept erstellen
      </h2>

      <Form method="post" className="space-y-6" onSubmit={handleSubmit}>
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
            placeholder="https://beispiel.de/bild.jpg"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageError(false);
            }}
          />

          {/* Image preview*/}
          {imageUrl && (
            <div className="mt-2">
              {!imageError ? (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Rezeptbild-Vorschau"
                    className="w-contain mx-auto max-h-50 object-contain rounded-md border border-gray-200 shadow-sm"
                    onLoad={() => setImageError(false)}
                    onError={() => setImageError(true)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200">
                      <span className="text-red-500 text-sm">
                        Ungültige Bild-URL
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-100 h-32 flex items-center justify-center rounded-md border border-gray-200">
                  <span className="text-red-500 text-sm">
                    Ungültige Bild-URL
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Zutaten */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Zutaten</h3>
          {ingredients.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                name="ingredients"
                type="text"
                value={item}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Zutat ${index + 1}`}
              />
              {ingredients.length > 1 && (
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
          {instructions.map((step, index) => (
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
                {instructions.length > 1 && (
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

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Tags</h3>
          <Select
            isMulti
            name="tags"
            options={TAG_CATEGORIES}
            value={selectedTags}
            onChange={handleTagChange}
            placeholder="Tags auswählen..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              option: (provided) => ({
                ...provided,
                display: "flex",
                alignItems: "center",
              }),
              multiValue: (styles, { data }) => ({
                ...styles,
                backgroundColor: data.color || "#e2e8f0",
              }),
              multiValueLabel: (styles) => ({
                ...styles,
                color: "#1e293b",
              }),
            }}
          />
          <input
            type="hidden"
            name="selectedTags"
            value={JSON.stringify(selectedTags.map((tag) => tag.value))}
          />
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
              placeholder="z.B. 45 min"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Schwierigkeitsgrad */}
        <div className="space-y-1">
          <DifficultySelector
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <input type="hidden" name="difficulty" value={difficulty} />
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
              : "Rezept speichern"}
          </button>
        </div>
      </Form>
    </div>
  );
}
