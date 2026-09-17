import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./contexte/CartContext";
import AuthContext from "./contexte/AuthContext";

function Navbar() {
    const { panier } = useContext(CartContext);
   
    const totalItems = panier.reduce(
  (total, product) => total + product.quantity,
  0
);
   const {user, logout}= useContext(AuthContext);
    return (
        <nav className="bar-navigation">

            <div className="logo">
                🛒 DZSHOP
            </div>
            <ul className="liste">
                <li>
                    <NavLink className="nav-link"to="/">Accueil </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link"to="/products">Produits </NavLink>
                </li>
            </ul>
            <div className="buttons">
             <NavLink className="btn btn-primary position-relative"to="/panier">🛒 Panier 
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
           <span className="visually-hidden">unread messages</span>
           </span>
           </NavLink>
{
!user ? (

<NavLink 
  className="btn btn-primary position-relative"
  to="/login"
>
  Connexion
</NavLink>

) : (

<div className="dropdown">

<button
  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
  data-bs-toggle="dropdown"
>

  <span
    style={{
      width:"30px",
      height:"30px",
      borderRadius:"50%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      background:"#eee"
    }}
  >
    👤
  </span>

  <span>
    {user.nom}
  </span>

</button>


<ul className="dropdown-menu dropdown-menu-end">
<li>
  <NavLink
    className="dropdown-item"
    to="/profile"
  >
    👤 Mon compte
  </NavLink>
</li>
{user.role === "admin" && (
  <li>
    <NavLink
      className="dropdown-item"
      to="/admin"
    >
      📊 Dashboard Admin
    </NavLink>
  </li>
)}

<li>
<button
  id="btn"
  className="btn btn-light w-100"
  onClick={logout}
>
Déconnexion
</button>
</li>

</ul>


</div>

)
}           </div>
           </nav>
    );
}
export default Navbar;