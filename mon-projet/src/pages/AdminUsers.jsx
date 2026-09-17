import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaUserShield,
  FaSearch,
  FaEye,
  FaBan,
  FaCheck,
  FaTrash
} from "react-icons/fa";

function AdminUsers() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");

  const [users, setUsers] = useState([
    {
      id: 1,
      nom: "Ahmed Benali",
      email: "ahmed@gmail.com",
      role: "client",
      status: "actif",
      orders: 5,
      total: 42500,
      date: "10/09/2026"
    },
    {
      id: 2,
      nom: "Sara Mansouri",
      email: "sara@gmail.com",
      role: "client",
      status: "bloque",
      orders: 2,
      total: 17500,
      date: "08/09/2026"
    },
    {
      id: 3,
      nom: "Mohamed Amine",
      email: "mohamed@gmail.com",
      role: "client",
      status: "actif",
      orders: 8,
      total: 86500,
      date: "03/09/2026"
    },
    {
      id: 4,
      nom: "Administrateur DZShop",
      email: "admin@dzshop.dz",
      role: "admin",
      status: "actif",
      orders: 0,
      total: 0,
      date: "01/09/2026"
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    user => user.status === "actif"
  ).length;

  const blockedUsers = users.filter(
    user => user.status === "bloque"
  ).length;

  const admins = users.filter(
    user => user.role === "admin"
  ).length;

  const filteredUsers = users.filter(user => {

    const matchSearch =
      user.nom
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    let matchFilter = true;

    if (filter === "Clients") {
      matchFilter = user.role === "client";
    }

    if (filter === "Admins") {
      matchFilter = user.role === "admin";
    }

    if (filter === "Actifs") {
      matchFilter = user.status === "actif";
    }

    if (filter === "Bloqués") {
      matchFilter = user.status === "bloque";
    }

    return matchSearch && matchFilter;
  });

  function toggleStatus(id) {

    setUsers(users.map(user => {

      if (user.id !== id) {
        return user;
      }

      return {
        ...user,
        status:
          user.status === "actif"
            ? "bloque"
            : "actif"
      };

    }));
  }

  function changeRole(id) {

    setUsers(users.map(user => {

      if (user.id !== id) {
        return user;
      }

      return {
        ...user,
        role:
          user.role === "admin"
            ? "client"
            : "admin"
      };

    }));
  }

  function deleteUser(id) {

    const user = users.find(
      user => user.id === id
    );

    if (user?.role === "admin") {
      alert(
        "La suppression d'un administrateur est désactivée."
      );
      return;
    }

    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ?"
    );

    if (!confirmation) {
      return;
    }

    setUsers(
      users.filter(user => user.id !== id)
    );
  }

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <main className="admin-main">

        <div className="admin-header">

          <div>
            <h1>Utilisateurs</h1>

            <p>
              Gérez les comptes et les accès de vos utilisateurs
            </p>
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>Utilisateurs</span>
              <h2>{totalUsers}</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaUserCheck />
            </div>

            <div>
              <span>Comptes actifs</span>
              <h2>{activeUsers}</h2>
            </div>

          </div>

          <div className="stat-card warning-card">

            <div className="stat-icon">
              <FaUserSlash />
            </div>

            <div>
              <span>Comptes bloqués</span>
              <h2>{blockedUsers}</h2>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              <FaUserShield />
            </div>

            <div>
              <span>Administrateurs</span>
              <h2>{admins}</h2>
            </div>

          </div>

        </div>

        <section className="dashboard-card">

          <div className="users-toolbar">

            <div className="users-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              className="users-filter"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option>Tous</option>
              <option>Clients</option>
              <option>Admins</option>
              <option>Actifs</option>
              <option>Bloqués</option>
            </select>

          </div>

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Utilisateur</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Commandes</th>
                  <th>Total dépensé</th>
                  <th>Inscription</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredUsers.map(user => (

                  <tr key={user.id}>

                    <td>
                      <strong>{user.nom}</strong>
                    </td>

                    <td>{user.email}</td>

                    <td>

                      <button
                        className={
                          user.role === "admin"
                            ? "role-badge admin-role"
                            : "role-badge client-role"
                        }
                        onClick={() =>
                          changeRole(user.id)
                        }
                      >
                        {user.role === "admin"
                          ? "Admin"
                          : "Client"}
                      </button>

                    </td>

                    <td>

                      <span
                        className={
                          user.status === "actif"
                            ? "user-status active-user"
                            : "user-status blocked-user"
                        }
                      >
                        {user.status === "actif"
                          ? "Actif"
                          : "Bloqué"}
                      </span>

                    </td>

                    <td>{user.orders}</td>

                    <td>
                      {user.total.toLocaleString()} DA
                    </td>

                    <td>{user.date}</td>

                    <td>

                      <div className="user-actions">

                        <button
                          className="user-action view-action"
                          title="Voir"
                          onClick={() =>
                            setSelectedUser(user)
                          }
                        >
                          <FaEye />
                        </button>

                        <button
                          className={
                            user.status === "actif"
                              ? "user-action block-action"
                              : "user-action activate-action"
                          }
                          title={
                            user.status === "actif"
                              ? "Bloquer"
                              : "Activer"
                          }
                          onClick={() =>
                            toggleStatus(user.id)
                          }
                        >
                          {user.status === "actif"
                            ? <FaBan />
                            : <FaCheck />}
                        </button>

                        <button
                          className="user-action delete-action"
                          title="Supprimer"
                          onClick={() =>
                            deleteUser(user.id)
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {selectedUser && (

        <div
          className="user-modal-overlay"
          onClick={() =>
            setSelectedUser(null)
          }
        >

          <div
            className="user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="user-avatar">
              {selectedUser.nom
                .charAt(0)
                .toUpperCase()}
            </div>

            <h2>{selectedUser.nom}</h2>

            <p>{selectedUser.email}</p>

            <div className="user-details">

              <div>
                <span>Rôle</span>
                <strong>
                  {selectedUser.role === "admin"
                    ? "Administrateur"
                    : "Client"}
                </strong>
              </div>

              <div>
                <span>Statut</span>
                <strong>
                  {selectedUser.status === "actif"
                    ? "Actif"
                    : "Bloqué"}
                </strong>
              </div>

              <div>
                <span>Commandes</span>
                <strong>
                  {selectedUser.orders}
                </strong>
              </div>

              <div>
                <span>Total dépensé</span>
                <strong>
                  {selectedUser.total.toLocaleString()} DA
                </strong>
              </div>

              <div>
                <span>Date d'inscription</span>
                <strong>
                  {selectedUser.date}
                </strong>
              </div>

            </div>

            <button
              className="close-user-modal"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              Fermer
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminUsers;
