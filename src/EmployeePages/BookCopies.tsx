import { useEffect, useState } from "react";
import {
  GetPaginatedBookCopies,
  DeleteBookCopy,
  AddNewBookCopy,
  UpdateBookCopy,
  SearchBookCopyByIdAPI,
} from "../APIs/EmployeeAPIs";
import { IAddNewBookCopy, IBookCopy, IUpdateBookCopy } from "../Interfaces/EmployeeInterfaces";
import { IPagination } from "../Interfaces/PublicInterfaces";



type BookCopyResponse = {
  booksCopies: IBookCopy[];
  totalPages: number;
};

export function BookCopies() {
  const [copies, setCopies] = useState<IBookCopy[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [newCopy, setNewCopy] = useState<IAddNewBookCopy>({
    bookId: 0,
    quantity: 0,
    price: 0,
    isAvailable: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCopy, setEditedCopy] = useState<IUpdateBookCopy | null>(null);

  const fetchBookCopies = async () => {
    setLoading(true);
    const result: BookCopyResponse | false = await GetPaginatedBookCopies(pagination);
    if (result && result.booksCopies) {
      setCopies(result.booksCopies);
      setTotalPages(result.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookCopies();
  }, [pagination]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book copy?")) return;
    const result = await DeleteBookCopy(id);
    if (result) {
      setCopies((prev) => prev.filter((c) => c.id !== id));
      setMessage({ type: "success", text: "Book copy deleted successfully." });
    } else {
      setMessage({ type: "error", text: "Failed to delete book copy." });
    }
  };

const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term||isNaN(Number(term))) {
      //fetchBookCopies();
       setMessage({ type: "error", text: "All fields are requered." });
      return;
    }

    setLoading(true);
    let result: IBookCopy| false |null= false;

       result = await SearchBookCopyByIdAPI(Number(term));
      if (result!==false&&result!==null) setCopies([result]);

    if (!result) {
      setCopies([]);
      setMessage({ type: "error", text: "No book copy found." });
    }

    setLoading(false);
  };


  const handleAdd = async () => {
    console.log(newCopy);
    const result = await AddNewBookCopy(newCopy);
    if (result!==false) {
      setMessage({ type: "success", text: "Book copy added successfully." });
      fetchBookCopies();
      setNewCopy({ bookId: 0, quantity: 1, price: 0, isAvailable: true });
    } else {
      setMessage({ type: "error", text: "Failed to add book copy." });
    }
  };

  const handleUpdate = async () => {
    if (!editedCopy) return;
    const result = await UpdateBookCopy(editedCopy);
    if (result!==false) {
      setMessage({ type: "success", text: "Book copy updated successfully." });
      setEditingId(null);
      setEditedCopy(null);
      fetchBookCopies();
    } else {
      setMessage({ type: "error", text: "Failed to update book copy." });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book Copies</h2>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

  
<div className="mb-6 bg-white shadow p-4 rounded">
  <h3 className="font-medium mb-4 text-gray-800 text-lg">Add New Book Copy</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="bookId" className="block text-sm mb-1 text-gray-700">Book ID</label>
      <input
        id="bookId"
        type="number"
        value={newCopy.bookId}
        onChange={(e) => setNewCopy({ ...newCopy, bookId: +e.target.value })}
        className="w-full px-2 py-1 rounded border"
      />
    </div>
    <div>
      <label htmlFor="quantity" className="block text-sm mb-1 text-gray-700">Quantity</label>
      <input
        id="quantity"
        type="number"
        value={newCopy.quantity}
        onChange={(e) => setNewCopy({ ...newCopy, quantity: +e.target.value })}
        className="w-full px-2 py-1 rounded border"
      />
    </div>
    <div>
      <label htmlFor="price" className="block text-sm mb-1 text-gray-700">Price</label>
      <input
        id="price"
        type="number"
        value={newCopy.price}
        onChange={(e) => setNewCopy({ ...newCopy, price: +e.target.value })}
        className="w-full px-2 py-1 rounded border"
      />
    </div>
    <div className="flex items-center gap-2 mt-6">
      <input
        id="available"
        type="checkbox"
        checked={newCopy.isAvailable}
        onChange={(e) => setNewCopy({ ...newCopy, isAvailable: e.target.checked })}
      />
      <label htmlFor="available" className="text-sm text-gray-700">Available</label>
    </div>
  </div>
  <button
    onClick={handleAdd}
    className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
  >
    Add Book Copy
  </button>
</div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <>
<div className="mb-6 flex flex-col bg-white p-5 rounded shadow sm:flex-row gap-2 sm:items-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or Name"
          className="px-3 py-2 border rounded dark:bg-gray-900"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
        <button onClick={() => { setSearchTerm(""),fetchBookCopies() }} className="px-4 py-2 bg-gray-600 text-white rounded">
          Reset
        </button>
      </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Book ID</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Available</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {copies.map((copy) => (
                <tr key={copy.id} className="text-center border-t">
                  <td className="p-2 border">{copy.id}</td>
                  <td className="p-2 border">
                    {editingId === copy.id ? (
                      <input
                        type="number"
                        value={editedCopy?.bookId}
                        onChange={(e) =>
                          setEditedCopy((prev) => prev && { ...prev, bookId: +e.target.value })
                        }
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      copy.bookId
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === copy.id ? (
                      <input
                        type="number"
                        value={editedCopy?.quantity}
                        onChange={(e) =>
                          setEditedCopy((prev) => prev && { ...prev, quantity: +e.target.value })
                        }
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      copy.quantity
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === copy.id ? (
                      <input
                        type="number"
                        value={editedCopy?.price}
                        onChange={(e) =>
                          setEditedCopy((prev) => prev && { ...prev, price: +e.target.value })
                        }
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      `$${copy.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === copy.id ? (
                      <input
                        type="checkbox"
                        checked={editedCopy?.isAvailable}
                        onChange={(e) =>
                          setEditedCopy((prev) => prev && { ...prev, isAvailable: e.target.checked })
                        }
                      />
                    ) : copy.isAvailable ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </td>
                  <td className="p-2 border space-x-2">
                    {editingId === copy.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedCopy(null);
                          }}
                          className="px-3 py-1 bg-gray-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(copy.id);
                            setEditedCopy({ ...copy, Id: copy.id });
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(copy.id)}
                          className="px-3 mt-3 py-1 bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
            <button
              disabled={pagination.pageNumber <= 1}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageNumber: Math.max(1, prev.pageNumber - 1),
                }))
              }
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {pagination.pageNumber} of {totalPages}
            </span>
            <button
              disabled={pagination.pageNumber >= totalPages}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageNumber: Math.min(totalPages, prev.pageNumber + 1),
                }))
              }
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
