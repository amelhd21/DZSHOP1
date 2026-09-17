import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaShoppingCart,
  FaSearch,
  FaEye,
  FaTimes
} from "react-icons/fa";

function AdminCustomers() {

  const [customers] = useState([
    {
      id: "CL001",
      nom: "Ahmed Benali",
      email: "ahmed@gmail.com",
      telephone: "0555 12 34 56",
      commandes: 5,
      total: 42500,
      statut: "Actif",
      inscription: "10/09/2026"
    },
    {
      id: "CL002",
      nom: "Sofiane Karim",
      email: "sofiane@gmail.com",
      telephone: "0661 45 78 20",
      commandes: 3,
      total: 24800,
      statut: "Actif",
      inscription: "11/09/2026"
    },
    {
      id: "CL003",
      nom: "Yacine Amine",
      email: "yacine@gmail.com",
      telephone: "0770 23 45 67",
      commandes: 7,
      total: 85600,
      statut: "Actif",
      inscription: "12/09/2026"
    },
    {
      id: "CL004",
      nom: "Karim Boudiaf",
      email: "karim@gmail.com",
      telephone: "0550 78 91 24",
      commandes: 1,
      total: 7400,
      statut: "Inactif",
      inscription: "13/09/2026"
    },
    {
      id: "CL005",
      nom: "Amine Saidi",
      email: "amine@gmail.com",
      telephone: "0666 32 14 87",
      commandes: 2,
      total: 18600,
      statut: "Actif",
      inscription: "16/09/2026"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    customer => customer.statut === "Actif"
  ).length;

  const newCustomers = customers.filter(
    customer => customer.inscription === "16/09/2026"
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.commandes,
    0
  );

  const filteredCustomers = customers.filter(customer => {

    const searchValue = search.toLowerCase();

    const searchMatch =
      customer.id.toLowerCase().includes(searchValue) ||
      customer.nom.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.telephone.includes(search);

    let filterMatch = true;

    if (filter === "Actifs") {
      filterMatch = customer.statut === "Actif";
    }

    if (filter === "Inactifs") {
      filterMatch = customer.statut === "Inactif";
    }

    return searchMatch && filterMatch;
  });

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <main className="admin-main">

        <div className="admin-header">

          <div>
            <h1>Clients</h1>
            <p>
              Consultez et gérez les informations de vos clients
            </p>
          </div>

        </div>

        {/* STATISTIQUES */}

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>

            <div>
              <span>Total clients</span>
              <h2>{totalCustomers}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUserCheck />
            </div>

            <div>
              <span>Clients actifs</span>
              <h2>{activeCustomers}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUserPlus />
            </div>

            <div>
              <span>Nouveaux clients</span>
              <h2>{newCustomers}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <span>Total commandes</span>
              <h2>{totalOrders}</h2>
            </div>
          </div>

        </div>

        {/* LISTE DES CLIENTS */}

        <section className="dashboard-card">

          <div className="customers-toolbar">

            <div className="customers-search">

              <FaSearch />

              <input
                type="text"
                placeholder="Rechercher un client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <select
              className="customers-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>Tous</option>
              <option>Actifs</option>
              <option>Inactifs</option>
            </select>

          </div>

          <div className="table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Commandes</th>
                  <th>Total dépensé</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredCustomers.length > 0 ? (

                  filteredCustomers.map(customer => (

                    <tr key={customer.id}>

                      <td>{customer.id}</td>

                      <td>
                        <strong>{customer.nom}</strong>
                      </td>

                      <td>{customer.email}</td>

                      <td>{customer.telephone}</td>

                      <td>
                        {customer.commandes}
                      </td>

                      <td>
                        <strong>
                          {customer.total.toLocaleString()} DA
                        </strong>
                      </td>

                      <td>

                        <span
                          className={
                            customer.statut === "Actif"
                              ? "customer-status active"
                              : "customer-status inactive"
                          }
                        >
                          {customer.statut}
                        </span>

                      </td>

                      <td>

                        <button
                          className="customer-view-btn"
                          onClick={() =>
                            setSelectedCustomer(customer)
                          }
                        >
                          <FaEye />
                          Voir
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="8"
                      className="customers-empty"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

      {/* MODAL DÉTAIL CLIENT */}

      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >

          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="customer-modal-header">

              <div>
                <h2>Détails du client</h2>
                <p>{selectedCustomer.id}</p>
              </div>

              <button
                className="customer-modal-close"
                onClick={() => setSelectedCustomer(null)}
              >
                <FaTimes />
              </button>

            </div>

            <div className="customer-profile">

              <div className="customer-avatar">
                {selectedCustomer.nom.charAt(0)}
              </div>

              <div>
                <h3>{selectedCustomer.nom}</h3>

                <span
                  className={
                    selectedCustomer.statut === "Actif"
                      ? "customer-status active"
                      : "customer-status inactive"
                  }
                >
                  {selectedCustomer.statut}
                </span>
              </div>

            </div>

            <div className="customer-details-grid">

              <div className="customer-detail-item">
                <span>Email</span>
                <strong>{selectedCustomer.email}</strong>
              </div>

              <div className="customer-detail-item">
                <span>Téléphone</span>
                <strong>{selectedCustomer.telephone}</strong>
              </div>

              <div className="customer-detail-item">
                <span>Commandes</span>
                <strong>{selectedCustomer.commandes}</strong>
              </div>

              <div className="customer-detail-item">
                <span>Total dépensé</span>
                <strong>
                  {selectedCustomer.total.toLocaleString()} DA
                </strong>
              </div>

              <div className="customer-detail-item">
                <span>Date d'inscription</span>
                <strong>{selectedCustomer.inscription}</strong>
              </div>

              <div className="customer-detail-item">
                <span>Identifiant</span>
                <strong>{selectedCustomer.id}</strong>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminCustomers;
