import { useEffect, useState } from "react";
import { GetTotalsAPI, GetResentOrders, GetNewClients } from "../APIs/EmployeeAPIs";

type StatsType = {
  totalOrders: number;
  totalBooks: number;
  totalBooksCopies: number;
  totalClients: number;
};

type Order = {
  id: number;
  clientId: number;
  totalQuantity: number;
  totalPrice: number;
  status: string;
};

type Client = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  account: string;
  createdAt: string;
};

export function Dashboard() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [newClients, setNewClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const totals = await GetTotalsAPI();
      const orders = await GetResentOrders();
      const clients = await GetNewClients();

      if (totals) setStats(totals);
      if (orders) setRecentOrders(orders);
      if (clients) setNewClients(clients);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (!stats) return <div className="p-6 text-red-600">Failed to load data.</div>;

  return (
    <div className="p-6 space-y-8 max-w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Total Books" value={stats.totalBooks} />
        <StatCard label="Book Copies" value={stats.totalBooksCopies} />
        <StatCard label="Total Clients" value={stats.totalClients} />
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs sm:text-sm text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 sm:px-4 py-2">Order ID</th>
                <th className="px-2 sm:px-4 py-2">Client ID</th>
                <th className="px-2 sm:px-4 py-2">Quantity</th>
                <th className="px-2 sm:px-4 py-2">Total Price</th>
                <th className="px-2 sm:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200">
                  <td className="px-2 sm:px-4 py-2">{order.id}</td>
                  <td className="px-2 sm:px-4 py-2">{order.clientId}</td>
                  <td className="px-2 sm:px-4 py-2">{order.totalQuantity}</td>
                  <td className="px-2 sm:px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-2 sm:px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">New Clients</h2>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-xs sm:text-sm text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 sm:px-4 py-2">Client ID</th>
                <th className="px-2 sm:px-4 py-2">Full Name</th>
                <th className="px-2 sm:px-4 py-2">Phone</th>
                <th className="px-2 sm:px-4 py-2">Account</th>
                <th className="px-2 sm:px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {newClients.map((client) => (
                <tr key={client.id} className="border-t border-gray-200">
                  <td className="px-2 sm:px-4 py-2">{client.id}</td>
                  <td className="px-2 sm:px-4 py-2">{client.firstName} {client.lastName}</td>
                  <td className="px-2 sm:px-4 py-2">{client.phoneNumber}</td>
                  <td className="px-2 sm:px-4 py-2">{client.account}</td>
                  <td className="px-2 sm:px-4 py-2">{new Date(client.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center border border-gray-200">
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 ">{label}</h2>
      <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}
