import { useEffect, useState } from "react";
import { SearchBooksCopiesAPI } from "../../APIs/GetBooksCopiesAPIs";
import { GetProductInfo } from "../../Interfaces/PublicInterfaces";
import { useNavigate } from "react-router-dom";
import { SetSelectedBook } from "../../Slices/PublicSlices/PGetBooksSlice";
import { useAppDispatch } from "../../Slices/Hooks";
import { SetBookIdToLocalStorage } from "../../Utilities/UClient";



export function SearchResults() {
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
  const bookName = localStorage.getItem("searchQuery") || "";
  const [books, setBooks] = useState<GetProductInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function search() {
      const result = await SearchBooksCopiesAPI(bookName);
      if (Array.isArray(result)) {
        setBooks(result);
      }
      setLoading(false);
    }
    search();
  }, [bookName]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Searching for books...
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        No results found for "<strong>{bookName}</strong>".
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 ">
        Search Results for: <span className="text-blue-600">{bookName}</span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white  rounded-lg shadow-md p-4 flex flex-col"
          >
            <img
              src={book.imageUrl.replace("http://", "https://")}
              alt={book.name}
              onClick={()=>{dispatch(SetSelectedBook(book)), SetBookIdToLocalStorage(book.id), navigate("/Detail")}}
              className="h-48 cursor-pointer w-full object-cover rounded mb-3"
            />
            <h2 className="text-lg font-semibold mb-1">{book.name}</h2>
            <p className="text-sm text-gray-500  mb-1">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-sm text-gray-500  mb-1">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {book.description}
            </p>
            <div className="mt-auto">
              <p className="text-blue-600 font-bold">${book.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 ">
                ⭐ {book.averageRating.toFixed(1)} ({book.ratingsCount} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
