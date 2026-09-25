import { useEffect, useState } from "react";
import { apiFetch, lireJson } from "../api";

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


  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("Tous");

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);






  // =========================
  // CHARGER LES UTILISATEURS
  // =========================

  async function loadUsers(){

    try{

      const data = await lireJson(
  await apiFetch("/api/admin/users")
);

setUsers(data);


    }catch(error){

      console.error(
        "Erreur chargement utilisateurs :",
        error
      );


    }finally{

      setLoading(false);

    }

  }



  useEffect(()=>{

    loadUsers();

  },[]);




  // =========================
  // STATISTIQUES
  // =========================


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




  // =========================
  // FILTRAGE
  // =========================


  const filteredUsers = users.filter(user=>{


    const text =
      search.toLowerCase();


    const searchMatch =

      user.nom
      ?.toLowerCase()
      .includes(text)

      ||

      user.email
      ?.toLowerCase()
      .includes(text);



    let filterMatch = true;



    if(filter==="Clients"){

      filterMatch =
        user.role==="client";

    }



    if(filter==="Admins"){

      filterMatch =
        user.role==="admin";

    }



    if(filter==="Actifs"){

      filterMatch =
        user.status==="actif";

    }



    if(filter==="Bloqués"){

      filterMatch =
        user.status==="bloque";

    }



    return searchMatch && filterMatch;


  });




  // =========================
  // CHANGER STATUT
  // =========================


  async function toggleStatus(user){


    const newStatus =
      user.status==="actif"
      ?
      "bloque"
      :
      "actif";


    try{


      await lireJson(
  await apiFetch(`/api/admin/users/${user._id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status: newStatus })
  })
);


      loadUsers();



    }catch(error){

      console.error(error);

    }


  }





  // =========================
  // CHANGER ROLE
  // =========================


  async function changeRole(user){


    const newRole =
      user.role==="admin"
      ?
      "client"
      :
      "admin";



    try{


      await lireJson(
  await apiFetch(`/api/admin/users/${user._id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role: newRole })
  })
);


      loadUsers();



    }catch(error){

      console.error(error);

    }


  }
// =========================
  // SUPPRIMER UTILISATEUR
  // =========================

  async function deleteUser(user){


    if(user.role==="admin"){

      alert(
        "La suppression d'un administrateur est désactivée."
      );

      return;

    }


    const confirmDelete =
      window.confirm(
        "Voulez-vous vraiment supprimer cet utilisateur ?"
      );


    if(!confirmDelete)
      return;



    try{


      await lireJson(
  await apiFetch(`/api/admin/users/${user._id}`, {
    method: "DELETE"
  })
);


      loadUsers();



    }catch(error){

      console.error(error);

    }


  }



  return (

    <div className="admin-dashboard">


      <AdminSidebar />


      <main className="admin-main">


        <div className="admin-header">

          <div>

            <h1>
              Utilisateurs
            </h1>


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

              <span>
                Utilisateurs
              </span>

              <h2>
                {totalUsers}
              </h2>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon">
              <FaUserCheck />
            </div>

            <div>

              <span>
                Comptes actifs
              </span>

              <h2>
                {activeUsers}
              </h2>

            </div>

          </div>



          <div className="stat-card warning-card">

            <div className="stat-icon">
              <FaUserSlash />
            </div>

            <div>

              <span>
                Comptes bloqués
              </span>

              <h2>
                {blockedUsers}
              </h2>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon">
              <FaUserShield />
            </div>

            <div>

              <span>
                Administrateurs
              </span>

              <h2>
                {admins}
              </h2>

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

                onChange={(e)=>
                  setSearch(e.target.value)
                }

              />


            </div>



            <select

              className="users-filter"

              value={filter}

              onChange={(e)=>
                setFilter(e.target.value)
              }

            >

              <option>
                Tous
              </option>

              <option>
                Clients
              </option>

              <option>
                Admins
              </option>

              <option>
                Actifs
              </option>

              <option>
                Bloqués
              </option>


            </select>


          </div>





          <div className="table-wrapper">


            <table>


              <thead>

                <tr>

                  <th>
                    Utilisateur
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Rôle
                  </th>

                  <th>
                    Statut
                  </th>

                  <th>
                    Commandes
                  </th>

                  <th>
                    Total dépensé
                  </th>

                  <th>
                    Inscription
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>



              <tbody>


              {loading ? (

                <tr>

                  <td colSpan="8">

                    Chargement...

                  </td>

                </tr>


              ) : filteredUsers.map(user=>(


                <tr key={user._id}>


                  <td>

                    <strong>
                      {user.nom}
                    </strong>

                  </td>



                  <td>
                    {user.email}
                  </td>



                  <td>


                    <button

                      className={
                        user.role==="admin"
                        ?
                        "role-badge admin-role"
                        :
                        "role-badge client-role"
                      }

                      onClick={()=>
                        changeRole(user)
                      }

                    >

                      {
                        user.role==="admin"
                        ?
                        "Admin"
                        :
                        "Client"
                      }


                    </button>


                  </td>



                  <td>

                    <span

                      className={
                        user.status==="actif"
                        ?
                        "user-status active-user"
                        :
                        "user-status blocked-user"
                      }

                    >

                      {
                        user.status==="actif"
                        ?
                        "Actif"
                        :
                        "Bloqué"
                      }

                    </span>


                  </td>



                  <td>
                    {user.orders}
                  </td>



                  <td>

                    {user.total.toLocaleString()} DA

                  </td>



                  <td>
                    {user.date}
                  </td>




                  <td>


                    <div className="user-actions">


                      <button

                        className="user-action block-action"

                        onClick={()=>
                          toggleStatus(user)
                        }

                      >

                        {
                          user.status==="actif"
                          ?
                          <FaBan />
                          :
                          <FaCheck />
                        }


                      </button>




                      <button

                        className="user-action delete-action"

                        onClick={()=>
                          deleteUser(user)
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


    </div>

  );


}


export default AdminUsers;