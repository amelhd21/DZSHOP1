import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function SalesChart({ data }) {

  return (
    <div className="dashboard-card sales-chart-card">

      <div className="card-header">

        <div>
          <h3>Évolution des ventes</h3>
          <p>Chiffre d'affaires des 7 derniers jours</p>
        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={320}>

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#6366f1"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#6366f1"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="jour"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) =>
                `${value.toLocaleString()} DA`
              }
            />

            <Area
              type="monotone"
              dataKey="ventes"
              stroke="#6366f1"
              strokeWidth={3}
              fill="url(#salesGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SalesChart;