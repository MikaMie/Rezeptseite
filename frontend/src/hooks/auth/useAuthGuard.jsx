// hooks/useAuthGuard.js
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuthGuard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Funktion nach AUßEN ziehen, damit sie im Event-Listener verfügbar ist
  const updateAdminStatus = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "admin");
    } catch (error) {
      console.error("Token ungültig:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Sofort prüfen
    updateAdminStatus();

    // 2. Event-Listener hinzufügen (jetzt funktioniert es, weil updateAdminStatus definiert ist)
    window.addEventListener("storage", updateAdminStatus);

    // 3. Cleanup: Event-Listener entfernen
    return () => {
      window.removeEventListener("storage", updateAdminStatus);
    };
  }, []); // Leeres Dependency-Array → läuft nur einmal

  return { isAdmin, isLoading };
};
