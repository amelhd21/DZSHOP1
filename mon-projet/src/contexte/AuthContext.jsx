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
async function login(email, mdp) {

  // Compte administrateur fixe
  if (
    email === "admin@dzshop.dz" &&
    mdp === "123456"
  ) {

    const admin = {
      nom: "Admin",
      email: email,
      role: "admin"
    };

    setUser(admin);

    localStorage.setItem(
      "user",
      JSON.stringify(admin)
    );

    return true;
  }


  // Connexion des clients depuis MongoDB
  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password: mdp
        })
      }
    );


    const data = await response.json();


    if (!response.ok) {
      return false;
    }


    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );


    return true;


  } catch(error) {

    console.log(error);
    return false;

  }

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