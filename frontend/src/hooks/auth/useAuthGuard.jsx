import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 

export const useAuthGuard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const decodedToken = jwtDecode(token);

        const isUserAdmin = decodedToken.role === "admin";
        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error("Fehler beim Decodieren des Tokens:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();

    window.addEventListener("storage", updateAdminStatus);
    return () => window.removeEventListener("storage", updateAdminStatus);
  }, []); 

  return { isAdmin, isLoading };
};
