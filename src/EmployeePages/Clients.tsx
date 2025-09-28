import { useEffect, useState } from "react";
import { GetAllClients } from "../APIs/EmployeeAPIs";
import { GetClientsMessagesAPI, DeleteClientMessageAPI } from "../APIs/EmployeeAPIs";

type Client = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  account: string;
  createdAt: string;
};

type ClientMessage = {
  id: number;
  userName: string;
  account: string;
  message: string;
  createdAt: string;
};

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [deleteResult, setDeleteResult] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      const result = await GetAllClients();
      if (result) setClients(result);
      setLoadingClients(false);
    }

    async function fetchMessages() {
      const result = await GetClientsMessagesAPI();
      if (result) setMessages(result);
      setLoadingMessages(false);
    }

    fetchClients();
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: number) => {
    const success = await DeleteClientMessageAPI(id);
    if (success!==false) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      setDeleteResult("Message deleted successfully.");
      GetClientsMessagesAPI();
    } else {
      setDeleteResult("Failed to delete message.");
    }


    setTimeout(() => setDeleteResult(null), 3000);
  };

  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Clients</h1>

      {loadingClients ? (
        <div className="text-gray-700">Loading clients...</div>
      ) : !clients.length ? (
        <div className="text-red-600">No clients found.</div>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded shadow mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Clients</h2>
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Client ID</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{client.id}</td>
                  <td className="px-4 py-2">{client.firstName} {client.lastName}</td>
                  <td className="px-4 py-2">{client.phoneNumber}</td>
                  <td className="px-4 py-2">{client.account}</td>
                  <td className="px-4 py-2">{new Date(client.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="overflow-x-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Client Messages</h2>

        {deleteResult && (
          <div className={`mb-4 px-4 py-2 rounded ${deleteResult.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {deleteResult}
          </div>
        )}

        {loadingMessages ? (
          <div className="text-gray-700">Loading messages...</div>
        ) : !messages.length ? (
          <div className="text-red-600">No messages found.</div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t border-gray-200">
                  <td className="px-4 py-2">{msg.id}</td>
                  <td className="px-4 py-2">{msg.userName}</td>
                  <td className="px-4 py-2">{msg.account}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                  <td className="px-4 py-2">{msg.createdAt}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
