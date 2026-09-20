
import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch, lireJson } from "../api";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  // Au démarrage, on relit l'utilisateur sauvegardé : un F5 ne déconnecte plus
  const [user, setUser] = useState(function () {
    try {
      const sauvegarde = localStorage.getItem("user");
      return sauvegarde ? JSON.parse(sauvegarde) : null;
    } catch {
      return null;
    }
  });

  function sauvegarder(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  // Au démarrage, on demande au serveur "qui suis-je ?" :
  // si l'admin m'a changé de rôle ou bloqué, je le sais tout de suite.
  useEffect(function () {

    if (!localStorage.getItem("token")) {
      return;
    }

    apiFetch("/api/auth/me")
      .then(function (reponse) {
        if (reponse.status === 403) {
          logout();
          return null;
        }
        return reponse.ok ? reponse.json() : null;
      })
      .then(function (data) {
        if (data && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
      })
      .catch(function () {});

  }, []);

  // Renvoie l'utilisateur, ou lance une Error avec le message du serveur
  async function login(email, password) {
    const data = await lireJson(
      await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
      })
    );
    sauvegarder(data);
    return data.user;
  }

  async function register(infos) {
    const data = await lireJson(
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(infos)
      })
    );
    sauvegarder(data);
    return data.user;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;