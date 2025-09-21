import { useLoaderData } from "react-router-dom";
import { PrinterIcon, ShareIcon } from "@heroicons/react/24/outline";
import { TAG_CATEGORIES } from "../../constants/tags";
import { FireIcon as FireIconSolid } from "@heroicons/react/24/solid";
import { FireIcon as FireIconOutline } from "@heroicons/react/24/outline";

export default function RecipePage() {
  const data = useLoaderData() || {};

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const getTagLabel = (tagValue) => {
    for (const category of TAG_CATEGORIES) {
      const tag = category.options.find((opt) => opt.value === tagValue);
      if (tag) return tag.label;
    }
    return tagValue;
  };

  const getTagColor = (tagValue) => {
    for (const category of TAG_CATEGORIES) {
      const tag = category.options.find((opt) => opt.value === tagValue);
      if (tag) return tag.color;
    }
    return "#E5E7EB";
  };

  const getTagIcon = (tagValue) => {
    for (const category of TAG_CATEGORIES) {
      const tag = category.options.find((opt) => opt.value === tagValue);
      if (tag) return tag.label.split(" ")[0];
    }
    return "";
  };
  console.log(data);

  return (
    <main>
      <article className="max-w-7xl mx-auto p-6 lg:p-8">
        {/*Recipe Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 overflow-hidden rounded-2xl shadow lg:order-1 relative">
            <div className="absolute top-2 right-2 z-10 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className="h-10 w-10">
                  {level <= data.difficulty ? (
                    <FireIconSolid className="text-red-600 dark:text-amber-400" />
                  ) : (
                    <FireIconOutline className="text-gray-300 dark:text-stone-600" />
                  )}
                </div>
              ))}
            </div>
            {data.image_url ? (
              <img
                src={data.image_url}
                alt={data.title || "Rezeptbild"}
                className="w-full aspect-[16/10] object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full aspect-[16/10] bg-gray-100 dark:bg-stone-800" />
            )}
          </div>

          {/* Titel / Meta / Actions */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:order-2 h-full">
            <header className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-semibold italic font-serif tracking-tight text-gray-900 dark:text-stone-100">
                {data.title || "Rezept"}
              </h1>
              {(formattedDate || data.author) && (
                <p className="text-sm text-gray-500 dark:text-stone-400 mt-1">
                  {formattedDate ? `Erstellt am ${formattedDate}` : null}
                  {formattedDate && data.author ? " · " : null}
                  {data.author ? `von ${data.author}` : null}
                </p>
              )}
              {data.tags &&
                Array.isArray(data.tags) &&
                data.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {data.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: getTagColor(tag),
                          color: "#FFFFFF",
                        }}
                      >
                        {getTagIcon(tag)} {getTagLabel(tag)}
                      </span>
                    ))}
                  </div>
                )}
              <div className="flex flex-row gap-6 rounded-xl border border-slate-300 p-2 justify-around shadow font-semibold text-slate-800">
                <p>Vorbereitungszeit: {data.preparationtime} Minuten</p>
                <p>Kochzeit: {data.cookingtime} Minuten</p>
              </div>
            </header>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-stone-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
              >
                <PrinterIcon className="h-4 w-4" aria-hidden />
                Drucken
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: data.title || "Rezept",
                        text: "Schau dir dieses Rezept an",
                        url: window.location.href,
                      });
                    }
                  } catch {
                    // Ignorieren, wenn Share abgebrochen wurde
                  }
                }}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-stone-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <ShareIcon className="h-4 w-4" aria-hidden />
                Teilen
              </button>
            </div>
            <div className="mt-5 text-slate-700 font-semibold">
              {data.description && (
                <section className="prose prose-teal max-w-none dark:prose-invert">
                  <p>{data.description}</p>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid: Hauptinhalt + sticky Zutaten */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Seitenleiste: Zutaten  */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <section className="bg-white dark:bg-stone-900 rounded-2xl shadow border border-gray-200 dark:border-stone-800 p-6">
                <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-3">
                  Zutaten
                </h2>

                {Array.isArray(data.ingredients) &&
                data.ingredients.length > 0 ? (
                  <ul className="space-y-2">
                    {data.ingredients.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                          aria-label={`Zutat abhaken: ${item}`}
                        />
                        <span className="text-gray-800 dark:text-stone-100">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-stone-400">
                    Keine Zutaten vorhanden.
                  </p>
                )}
              </section>
            </div>
          </aside>
          <div className="lg:col-span-8">
            {/* Zubereitung */}
            {Array.isArray(data.instructions) &&
              data.instructions.length > 0 && (
                <section className="p-6 border border-gray-200 rounded-2xl shadow">
                  <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mb-3">
                    Zubereitung
                  </h2>
                  <ol className="space-y-4 list-decimal list-inside text-gray-800 dark:text-stone-100">
                    {data.instructions.map((step, i) => (
                      <li
                        key={i}
                        className="bg-white dark:bg-stone-900 rounded-xl border border-gray-200 dark:border-stone-800 p-4 leading-relaxed"
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                </section>
              )}
          </div>
        </div>
      </article>
    </main>
  );
}
