// src/pages/RegistrationPage.jsx
import { useState } from "react";
import { Link, useNavigate, Form } from "react-router-dom";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const navigate = useNavigate();

  return (
    <Form
      method="POST"
      className="min-h-screen bg-amber-50 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-white border border-amber-200 rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-serif italic underline text-slate-700 mb-6">
          Konto erstellen
        </h1>

        {msg && (
          <div
            className={`mb-4 rounded-md px-3 py-2 text-sm ${
              msg.type === "ok"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
            role="alert"
          >
            {msg.text}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-amber-900"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              autoComplete="name"
              className="mt-1 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="z. B. Anna Beispiel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-amber-900"
            >
              E‑Mail
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="anna@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-amber-900"
            >
              Passwort
            </label>
            <div className="mt-1 flex gap-2">
              <input
                name="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                className="w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Mind. 8 Zeichen"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="shrink-0 rounded-md border border-amber-300 px-3 py-2 text-sm text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-pressed={showPw}
              >
                {showPw ? "Verbergen" : "Anzeigen"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-amber-500 text-white font-medium px-4 py-2 hover:bg-amber-600 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {loading ? "Wird erstellt ..." : "Registrieren"}
          </button>
        </div>

        <p className="mt-4 text-sm text-amber-900/80">
          Schon ein Konto?{" "}
          <Link
            to="/login"
            className="underline underline-offset-2 hover:text-amber-700"
          >
            Anmelden
          </Link>
        </p>
      </div>
    </Form>
  );
}
