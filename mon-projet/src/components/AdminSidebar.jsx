import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaHome,
  FaUserCog
} from "react-icons/fa";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-logo">
        DZShop
        <span>Admin</span>
      </div>

      <nav className="admin-menu">
        
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          <FaBox />
          <span>Produits</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          <FaShoppingCart />
          <span>Commandes</span>
        </NavLink>

        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          <FaUsers />
          <span>Clients</span>
        </NavLink>
        <NavLink
  to="/admin/users"
  className={({ isActive }) =>
    isActive ? "admin-link active" : "admin-link"
  }
>
  <FaUserCog />
  <span>Utilisateurs</span>
</NavLink>

        <NavLink
          to="/admin/stats"
          className={({ isActive }) =>
            isActive ? "admin-link active" : "admin-link"
          }
        >
          <FaChartLine />
          <span>Statistiques</span>
        </NavLink>

      </nav>

      <div className="admin-sidebar-bottom">

        <NavLink to="/" className="admin-link">
          <FaHome />
          <span>Retour boutique</span>
        </NavLink>

      </div>

    </aside>
  );
}

export default AdminSidebar;