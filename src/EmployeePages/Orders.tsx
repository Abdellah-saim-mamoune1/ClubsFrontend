import { useEffect, useState } from "react";
import { GetAllOrders, SetOrderStatus } from "../APIs/EmployeeAPIs";
import { Order } from "../Interfaces/EmployeeInterfaces";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(true);
  const [statusResult, setStatusResult] = useState<{ id: number; success: boolean } | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const result = await GetAllOrders({ pageNumber, pageSize });
      if (result) {
        setOrders(result.orders || []);
        setTotalPages(result.totalPages);
      }
      setLoading(false);
    }

    fetchOrders();
  }, [pageNumber]);

  const handleStatusChange = async (orderId: number, status: string) => {
    const result = await SetOrderStatus(orderId, status);
    setStatusResult({ id: orderId, success:result===false?false:true });

    if (result!==false) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status } : o))
      );
    }

    setTimeout(() => {
      setStatusResult(null);
    }, 3000);
  };

  if (loading) return <div className="p-6 text-gray-700">Loading orders...</div>;
  if (!orders.length) return <div className="p-6 text-red-600">No orders found.</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200  rounded-lg p-4 bg-white shadow"
        >
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span><strong>Order ID:</strong> {order.id}</span>
            <span><strong>Client ID:</strong> {order.clientId}</span>
            <span><strong>Status:</strong> {order.status}</span>
          </div>
          <div className="text-sm text-gray-600  mb-1">
            <strong>Shipment Address:</strong> {order.shipmentAddress}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>

          <div className="text-sm text-gray-600  mb-4">
            <strong>Total Quantity:</strong> {order.totalQuantity} | <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </div>

          {/* العناصر */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border border-gray-200 rounded p-2">
                  <img src={item.imageUrl.replace("http://", "https://")} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="text-sm text-gray-700">
                    <p><strong>{item.name}</strong></p>
                    <p>Qty: {item.quantity}</p>
                    <p>${item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <button
              onClick={() => handleStatusChange(order.id, "Processing")}
              className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Mark as Processing
            </button>
            <button
              onClick={() => handleStatusChange(order.id, "Shipped")}
              className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Mark as Shipped
            </button>

            {statusResult?.id === order.id && (
              <span
                className={`ml-4 text-sm font-medium ${
                  statusResult.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {statusResult.success ? "Status updated successfully." : "Failed to update status."}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-center space-x-2 mt-6">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-1 text-gray-700">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
