import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Slices/Hooks";
import {  CDGetOrder } from "../../Interfaces/ClientInterfaces";
import { IPagination } from "../../Interfaces/PublicInterfaces";
import { GetOrdersAPI } from "../../APIs/ClientAPIs";

export function Orders() {
  const dispatch = useAppDispatch();
  const [ordersState, setOrders] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const pagination: IPagination = {
        pageNumber: currentPage,
        pageSize: pageSize,
      };
      const data = await GetOrdersAPI(pagination);
      if (data) setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (ordersState?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  function getStatusStyle(status: string) {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "delivered":
      case "success":
        return "text-green-700 bg-green-100";
      case "failed":
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 ">🧾 My Orders</h1>

      {loading ? (
        <div className="text-center text-sky-600 ">Loading orders...</div>
      ) : ordersState?.orders?.length ? (
        <>
          <div className="overflow-x-auto rounded-lg shadow border ">
            <table className="w-full text-sm text-left border-collapse bg-white ">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-5 py-3">#</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Shipment</th>
                </tr>
              </thead>
              <tbody>
                {ordersState.orders.map((order: CDGetOrder) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-5 py-3 font-medium text-gray-800">{order.id}</td>
                    <td className="px-5 py-3 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{order.totalQuantity}</td>
                    <td className="px-5 py-3 font-semibold text-sky-600">${order.totalPrice.toFixed(2)}</td>
                    <td className="px-5 py-3 text-gray-700 truncate max-w-[250px]">{order.shipmentAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 rounded border border-gray-400  disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {ordersState.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === ordersState.totalPages}
              className="px-4 py-1 rounded border border-gray-400  disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center mt-8">No orders found.</p>
      )}
    </div>
  );
}
