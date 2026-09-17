function OrdersTable({ orders }) {

  return (
    <div className="table-wrapper">

      <table className="admin-table">

        <thead>

          <tr>
            <th>Commande</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>
                <strong>{order.id}</strong>
              </td>

              <td>
                {order.client}
              </td>

              <td>
                {order.date}
              </td>

              <td>
                {order.total.toLocaleString()} DA
              </td>

              <td>

                <span
                  className={
                    order.status === "Livrée"
                      ? "status delivered"
                      : order.status === "Annulée"
                      ? "status cancelled"
                      : "status pending"
                  }
                >
                  {order.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OrdersTable;