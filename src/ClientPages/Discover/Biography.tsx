import { GetBooksTypes } from "../../APIs/GetBooksCopiesAPIs.ts";
import { GetPaginatedBooksByCategory } from "../../APIs/GetBooksCopiesAPIs.ts";
import { GetPaginatedBooksParams } from "../../Interfaces/PublicInterfaces.ts";
import { useAppDispatch, useAppSelector } from "../../Slices/Hooks.ts";
import { useEffect, useState } from "react";
import { SetBookIdToLocalStorage } from "../../Utilities/UClient.ts";
import { useNavigate } from "react-router-dom";
export function Biography() {
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const Category = useAppSelector(state => state.PublicSlice.BooksByCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Category?.totalPages ?? 1;

  const fetchBooks = (page: number) => {
    const paginationParams: GetPaginatedBooksParams = {
      type: "Biography",
      PageNumber: page,
      PageSize: 15,
    };
    dispatch(GetPaginatedBooksByCategory(paginationParams));
  };

  useEffect(() => {
    fetchBooks(currentPage);
    dispatch(GetBooksTypes());
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="py-6 space-y-12 text-gray-800 ">
      <div className="flex flex-col gap-7">
        {Category?.booksCopies != null && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Biography books</h2>

            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
              {Category.booksCopies.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
                >
                  <img
                    src={book.imageUrl.replace("http://", "https://")}
                    alt={book.name}
                    onClick={()=>{SetBookIdToLocalStorage(book.id),navigate('/Detail')}}
                    className="w-full h-[220px] cursor-pointer object-cover rounded-t"
                  />
                  <div className="p-1 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                      {book.name}
                    </h3>
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                      {book.authorName}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900  mb-3">
                      ${book.price}
                    </p>
                 
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span className="px-3 text-sm">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
