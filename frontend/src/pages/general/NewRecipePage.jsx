import { Form } from "react-router-dom";
import { useState } from "react";

export default function NewRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addInstruction = () => setInstructions([...instructions, ""]);

  const handleIngredientChange = (i, value) => {
    const newItems = [...ingredients];
    newItems[i] = value;
    setIngredients(newItems);
  };

  const handleInstructionChange = (i, value) => {
    const newItems = [...instructions];
    newItems[i] = value;
    setInstructions(newItems);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-50 mt-5 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Neues Rezept erstellen</h2>

      <Form method="post" className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Titel"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Beschreibung"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="image_url"
          placeholder="Bild-URL"
          className="w-full p-2 border rounded"
        />

        <div>
          <h3 className="font-semibold mb-2">Zutaten</h3>
          {ingredients.map((item, index) => (
            <input
              key={index}
              name="ingredients"
              type="text"
              value={item}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="text-blue-500 text-sm"
          >
            + Zutat hinzufügen
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Anleitung</h3>
          {instructions.map((step, index) => (
            <input
              key={index}
              name="instructions"
              type="text"
              value={step}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="text-blue-500 text-sm"
          >
            + Schritt hinzufügen
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Rezept speichern
        </button>
      </Form>
    </div>
  );
}
