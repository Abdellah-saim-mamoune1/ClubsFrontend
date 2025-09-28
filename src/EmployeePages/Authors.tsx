import { useEffect, useState } from "react";
import {
  UpdateAuthor,
  GetPaginatedAuthors,
  DeleteAuthor,
  AddNewAuthor,
  SearchAuthorByIdAPI,
  SearchAuthorByNameAPI,
} from "../APIs/EmployeeAPIs";

type Author = {
  id: number;
  fullName: string;
};

type Pagination = {
  pageNumber: number;
  pageSize: number;
};

type AuthorResponse = {
  authors: Author[];
  totalPages: number;
};

export function Authors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [pagination, setPagination] = useState<Pagination>({ pageNumber: 1, pageSize: 10 });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, [pagination]);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const fetchAuthors = async () => {
    setLoading(true);
    const result: AuthorResponse | false = await GetPaginatedAuthors(pagination);
    if (result && result.authors) {
      setAuthors(result.authors);
      setTotalPages(result.totalPages);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) {
      fetchAuthors();
      return;
    }

    setLoading(true);
    let result: Author | Author[] | false |null= false;

    if (!isNaN(Number(term))) {
       result = await SearchAuthorByIdAPI(Number(term));
      if (result!==false&&result!==null&&!Array.isArray(result)) setAuthors([result]);
    } else {
      result = await SearchAuthorByNameAPI(term);
      if (Array.isArray(result)) setAuthors(result);
    }

    if (!result) {
      setAuthors([]);
      setMessage({ type: "error", text: "No author found." });
    }

    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this author?")) return;
    const result = await DeleteAuthor(id);
    if (result) {
      setAuthors((prev) => prev.filter((a) => a.id !== id));
      setMessage({ type: "success", text: "Author deleted successfully." });
    } else {
      setMessage({ type: "error", text: "Failed to delete author." });
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editedName.trim()) return;
    const result = await UpdateAuthor(id, editedName.trim());
    if (result !== false) {
      setAuthors((prev) => prev.map((a) => (a.id === id ? { ...a, fullName: editedName } : a)));
      setMessage({ type: "success", text: "Author updated successfully." });
      setEditingId(null);
      setEditedName("");
    } else {
      setMessage({ type: "error", text: "Failed to update author." });
    }
  };

  const handleAdd = async () => {
    if (!newAuthor.trim()) return;
    const result = await AddNewAuthor(newAuthor.trim());
    if (result !== false) {
      setMessage({ type: "success", text: "Author added successfully." });
      setNewAuthor("");
      fetchAuthors();
    } else {
      setMessage({ type: "error", text: "Failed to add author." });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">Authors</h2>

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

      {/* Add Author Input */}
      <div className="mb-6 flex flex-col bg-white p-5 rounded shadow sm:flex-row gap-2 sm:items-center">
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Enter new author name"
          className="px-3 py-2 border rounded"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">
          Add Author
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-6 flex flex-col bg-white p-5 rounded shadow sm:flex-row gap-2 sm:items-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or Name"
          className="px-3 py-2 border rounded"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
        <button onClick={() => { setSearchTerm(""); fetchAuthors(); }} className="px-4 py-2 bg-gray-600 text-white rounded">
          Reset
        </button>
      </div>

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 ">
            <thead>
              <tr className="bg-gray-100 text-gray-700 ">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="text-center border-t">
                  <td className="p-3 border">{author.id}</td>
                  <td className="p-3 border">
                    {editingId === author.id ? (
                      <input
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="px-2 py-1 rounded border dark:bg-gray-900"
                      />
                    ) : (
                      author.fullName
                    )}
                  </td>
                  <td className="p-3 border space-x-2">
                    {editingId === author.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(author.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedName("");
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
                            setEditingId(author.id);
                            setEditedName(author.fullName);
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(author.id)}
                          className="px-3 py-1 mt-3 bg-red-600 text-white rounded"
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

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-700">
            <button
              disabled={pagination.pageNumber <= 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber - 1 }))
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
                setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))
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
