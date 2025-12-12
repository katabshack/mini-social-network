import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Pour lire les infos cachées dans le token
import API from "../services/api";

// 1. Création du contexte (la boîte globale)
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // L'utilisateur connecté
  const [loading, setLoading] = useState(true); // Pour attendre la vérification du token

  // 2. À chaque chargement du site, on vérifie s'il y a un token
  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // On vérifie si le token n'est pas expiré (optionnel mais recommandé)
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setUser(null);
          } else {
            // Si le token est valide, on met l'utilisateur dans le state
            // Note: `decoded` contient ce que tu as mis dans le token côté backend (souvent userId)
            setUser(decoded); 
          }
        } catch (error) {
          // Si le token est corrompu
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkUserLoggedIn();
  }, []);

  // 3. Fonction de Connexion
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    
    // Le backend renvoie un token
    const { token } = res.data; 
    localStorage.setItem("token", token);
    
    // On décode le token pour mettre à jour l'utilisateur immédiatement
    const decoded = jwtDecode(token);
    setUser(decoded);
    return res.data;
  };

  // 4. Fonction d'Inscription
  const register = async (userData) => {
    const res = await API.post("/auth/register", userData);
    return res.data;
  };

  // 5. Fonction de Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // Redirection brutale vers le login
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};