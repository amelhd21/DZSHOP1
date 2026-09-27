import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaHome,
  FaUserCog,
  FaBars,
  FaTimes
} from "react-icons/fa";

function AdminSidebar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Bouton menu uniquement pour mobile */}
      <button
        className="admin-mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Ouvrir le menu administrateur"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>


      {/* Fond sombre derrière la sidebar sur mobile */}
      {menuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeMenu}
        ></div>
      )}


      <aside
        className={
          menuOpen
            ? "admin-sidebar admin-sidebar-open"
            : "admin-sidebar"
        }
      >

        <div className="admin-logo">
          DZShop
          <span>Admin</span>
        </div>


        <nav className="admin-menu">

          <NavLink
            to="/admin"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaChartPie />
            <span>Dashboard</span>
          </NavLink>


          <NavLink
            to="/admin/products"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaBox />
            <span>Produits</span>
          </NavLink>


          <NavLink
            to="/admin/orders"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaShoppingCart />
            <span>Commandes</span>
          </NavLink>


          <NavLink
            to="/admin/customers"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaUsers />
            <span>Clients</span>
          </NavLink>


          <NavLink
            to="/admin/users"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaUserCog />
            <span>Utilisateurs</span>
          </NavLink>


          <NavLink
            to="/admin/stats"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            <FaChartLine />
            <span>Statistiques</span>
          </NavLink>

        </nav>


        <div className="admin-sidebar-bottom">

          <NavLink
            to="/"
            className="admin-link"
            onClick={closeMenu}
          >
            <FaHome />
            <span>Retour boutique</span>
          </NavLink>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;
