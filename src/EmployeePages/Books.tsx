import { useEffect, useState } from "react";
import { AddBook, DeleteBook, GetPaginatedBooks, SearchBookByIdAPI, SearchBookByNameAPI, UpdateBook } from "../APIs/EmployeeAPIs";
import { IPagination } from "../Interfaces/PublicInterfaces";
import { IGetBook } from "../Interfaces/EmployeeInterfaces";

type BookResponse = {
  books: IGetBook[];
  totalPages: number;
};




export function Books() {
  const [books, setBooks] = useState<IGetBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<IPagination>({
    pageNumber: 1,
    pageSize: 10,
  });

const [newBook, setNewBook] = useState<string>("");

const handleAddBook = async () => {
  if (newBook.trim()==="") {
    setMessage({ type: "error", text: "All fields are required." });
    return;
  }

  const result = await AddBook(newBook);
  if (result !== false) {
    setMessage({ type: "success", text: "Book added successfully." });
    setNewBook("");
    fetchBooks();
  } else {
    setMessage({ type: "error", text: "Failed to add book." });
  }
};


  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedBook, setEditedBook] = useState<IGetBook | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    const result: BookResponse | false = await GetPaginatedBooks(pagination);
    if (result && result.books) {
      setBooks(result.books);
      setTotalPages(result.totalPages);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [pagination]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    const result = await DeleteBook(id);
    if (result) {
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setMessage({ type: "success", text: "Book deleted successfully." });
    } else {
      setMessage({ type: "error", text: "Failed to delete book." });
    }
  };

 const handleSearch = async () => {
    const term = searchTerm.trim();
    if (!term) {
      fetchBooks();
      return;
    }

    setLoading(true);
    let result: IGetBook | IGetBook[] | false |null= false;

    if (!isNaN(Number(term))) {
       result = await SearchBookByIdAPI(Number(term));
      if (result!==false&&result!==null&&!Array.isArray(result)) setBooks([result]);
    } else {
      result = await SearchBookByNameAPI(term);
      if (Array.isArray(result)) setBooks(result);
    }

    if (!result) {
      setBooks([]);
      setMessage({ type: "error", text: "No book found." });
    }

    setLoading(false);
  };


  const handleUpdate = async () => {
    if (!editedBook) return;
    const result = await UpdateBook(editedBook);
    if (result !== false) {
      setMessage({ type: "success", text: "Book updated successfully." });
      setEditingId(null);
      setEditedBook(null);
      fetchBooks();
    } else {
      setMessage({ type: "error", text: "Failed to update book." });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 ">Books</h2>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (

        <>
        <div className="mb-6   bg-white p-4 rounded bg-gray-50 ">
  <h3 className="text-lg font-medium mb-2 text-gray-800 ">Add New Book</h3>
  <div className="grid grid-cols-1 items-center sm:grid-cols-2 gap-4">
    <input
      type="text"
      placeholder="ISBN"
      value={newBook}
      onChange={(e) => setNewBook(() => ( e.target.value ))}
      className="p-2 border rounded "
    />
 
  </div>
 <button
    onClick={handleAddBook}
    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  >
    Add Book
  </button>
</div>

      <div className="mb-6 flex flex-col bg-white p-5 rounded shadow sm:flex-row gap-2 sm:items-center">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID or Name"
          className="px-3 py-2 border rounded "
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
        <button onClick={() => { setSearchTerm(""),fetchBooks() }} className="px-4 py-2 bg-gray-600 text-white rounded">
          Reset
        </button>
      </div>
        <div className="overflow-x-auto">
          <table className="w-full overflow-x-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700 ">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Pages</th>
                <th className="p-2 border">Author ID</th>
                <th className="p-2 border">Type ID</th>
                <th className="p-2 border">Published</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="text-center border-t ">
                  <td className="p-2 border">{book.id}</td>
                  <td className="p-2 border">
                    {editingId === book.id ? (
                      <input
                        value={editedBook?.name || ""}
                        onChange={(e) => setEditedBook((prev) => prev && { ...prev, name: e.target.value })}
                        className="px-2 py-1 rounded border dark:bg-gray-900"
                      />
                    ) : (
                      book.name
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === book.id ? (
                      <input
                        type="number"
                        value={editedBook?.pagesNumber || 0}
                        onChange={(e) => setEditedBook((prev) => prev && { ...prev, pagesNumber: +e.target.value })}
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      book.pagesNumber
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === book.id ? (
                      <input
                        type="number"
                        value={editedBook?.authorId || 0}
                        onChange={(e) => setEditedBook((prev) => prev && { ...prev, authorId: +e.target.value })}
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      book.authorId
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === book.id ? (
                      <input
                        type="number"
                        value={editedBook?.typeId || 0}
                        onChange={(e) => setEditedBook((prev) => prev && { ...prev, typeId: +e.target.value })}
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      book.typeId
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingId === book.id ? (
                      <input
                        type="date"
                        value={editedBook?.publishedAt || ""}
                        onChange={(e) => setEditedBook((prev) => prev && { ...prev, publishedAt: e.target.value })}
                        className="px-2 py-1 rounded border"
                      />
                    ) : (
                      book.publishedAt ?? <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="p-2 border space-x-2">
                    {editingId === book.id ? (
                      <>
                        <button onClick={handleUpdate} className="px-3 py-1 bg-blue-600 text-white rounded">
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedBook(null);
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
                            setEditingId(book.id);
                            setEditedBook({ ...book });
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
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
