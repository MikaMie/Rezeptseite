import { useState } from "react";
import { useNavigate, Form, useActionData } from "react-router-dom";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const actionData = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Form
        method="POST"
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="password"
          name="password"
          placeholder="Admin-Passwort"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Einloggen
        </button>
        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
}
