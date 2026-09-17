import { createContext, useContext, useState } from "react";

// Création de la mémoire utilisateur
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  // Au début personne n'est connecté
  const [user, setUser] = useState(null);


  // Fonction connexion
  function login(email, mdp) {

    // Compte de test
    if (
      email === "admin@dzshop.dz" &&
      mdp === "123456"
    ) {
      setUser({
        nom: "Admin",
        email: email,
        role: "admin"
      });
      return true;
    }
    return false;
  }
  // Fonction création de compte
  function register(nom, email) {

    setUser({
      nom: nom,
      email: email,
      role: "client"
    });

  }


  // Fonction déconnexion
  function logout() {

    setUser(null);

  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}
export default AuthContext;