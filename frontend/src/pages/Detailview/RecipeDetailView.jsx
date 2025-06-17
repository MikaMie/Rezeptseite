import { useLoaderData } from "react-router-dom";

export default function RecipePage() {
  const data = useLoaderData();

  const formattedDate = new Date(data.createdAt).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="overflow-hidden rounded-2xl shadow-lg mb-6">
        <img
          src={data.image_url}
          alt={data.title}
          className="w-full h-72 object-cover"
        />
      </div>


      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.title}</h1>
        <p className="text-sm text-gray-500 mb-6">Erstellt am: {formattedDate}</p>


        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-teal-700 mb-2">Beschreibung</h2>
          <p className="text-gray-700">{data.description}</p>
        </section>


        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-teal-700 mb-2">Zutaten</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {data.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>


        <section>
          <h2 className="text-2xl font-semibold text-teal-700 mb-2">Zubereitung</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            {data.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
