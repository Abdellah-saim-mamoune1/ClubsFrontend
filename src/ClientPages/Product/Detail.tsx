import { useAppDispatch, useAppSelector } from "../../Slices/Hooks";
import { GetBookInfo, GetPaginatedBooksByCategory } from "../../APIs/GetBooksCopiesAPIs";
import { useEffect, useState } from "react";
import { GetPaginatedBooksParams, GetProductInfo } from "../../Interfaces/PublicInterfaces";
import { SetBookIdToLocalStorage } from "../../Utilities/UClient";
import { useNavigate } from "react-router-dom";
import { AddToCart } from "../../Slices/ClientSlices/CartSlice";
import { AddProductToCartAPI } from "../../APIs/ClientAPIs";
import { CartItem } from "../../Slices/ClientSlices/CartSlice";
import { SetLoggedInState } from "../../Slices/ClientSlices/ClientInfoSlice";
import { SlideAlert } from "./SlideAlertProps";

export function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ProductId, SetProductId] = useState<any>(localStorage.getItem("BookId"));
  const Product = useAppSelector((state) => state.PublicSlice.GetProductInfo);
  const SimilarBooks = useAppSelector((state) => state.PublicSlice.BooksByCategory);
  const isLoggedIn = useAppSelector((state) => state.ClientInfoSlice.IsLoogedIn);
  const CartItems=useAppSelector(s=>s.CartSlice.Items);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function HandelAddingtocart(product: GetProductInfo) {
      const item = CartItems.find((item) => item.productId === product.id);
      if (item&&item.totalQuantity>=product.quantity) {
        setAlert({ type: "error", message: "product is out of stock." });
      }

      else {
    const result = await AddProductToCartAPI(product.id, navigate);
    if (result) {
      const Item: CartItem = {
        id: result,
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        totalPrice: product.price,
        bookCopyQuantity:product.quantity,
        totalQuantity: 1,
        createdAt: new Date().toISOString(),
      };
      dispatch(AddToCart(Item));
      setAlert({ type: "success", message: "Added to cart successfully!" });
    } else if (result === false) {
      dispatch(SetLoggedInState(false));
      setAlert({ type: "error", message: "You must be logged in to add to cart." });
    } else {
      setAlert({ type: "error", message: "Failed to add to cart." });
    }
   
  }
    
  }

  useEffect(() => {
    if (ProductId) {
      dispatch(GetBookInfo(ProductId));
    }
  }, [ProductId]);

  useEffect(() => {
    if (Product) {
      const paginationParams: GetPaginatedBooksParams = {
        type: Product?.category,
        PageNumber: 1,
        PageSize: 15,
      };
      dispatch(GetPaginatedBooksByCategory(paginationParams));
    }
  }, [Product]);

  return (
    <>
      {alert && <SlideAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

      {Product && (
        <div className="p-6 max-w-5xl mx-auto text-gray-800 ">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-shrink-0">
              <img
                src={Product.imageUrl.replace("http://", "https://")}
                alt={Product.name}
                className="w-[300px] h-[420px] object-cover rounded shadow"
              />
            </div>

            <div className="flex-grow space-y-4">
              <h1 className="text-3xl font-bold">{Product.name}</h1>
              <h2 className="text-lg text-gray-600">by {Product.author}</h2>

              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="text-lg font-semibold">{Product.averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({Product.ratingsCount} ratings)</span>
              </div>

              <p className="text-base leading-relaxed text-gray-700">{Product.description}</p>

              <div className="text-2xl font-bold text-sky-600">${Product.price.toFixed(2)}</div>

              <div className="text-sm text-gray-500">
                Quantity Available:{" "}
                <span className={Product.quantity > 0 ? "text-green-500" : "text-red-500"}>
                  {Product.quantity > 0 ? Product.quantity : "Out of Stock"}
                </span>
              </div>

              <button
                disabled={Product.quantity === 0}
                onClick={() => {
                  if (!isLoggedIn) return navigate("/login");
                  HandelAddingtocart(Product);
                }}
                className="mt-4 bg-sky-600 text-white px-6 py-2 rounded shadow hover:bg-sky-700 disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {SimilarBooks?.booksCopies && (
        <div className="mt-12 px-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Similar Books</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {SimilarBooks.booksCopies
              .filter((book) => book.id !== Number(ProductId))
              .map((book) => (
                <div
                  key={book.id}
                  className="min-w-[160px] max-w-[160px] bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
                >
                  <img
                    src={book.imageUrl.replace("http://", "https://")}
                    alt={book.name}
                    onClick={() => {
                      SetBookIdToLocalStorage(book.id);
                      SetProductId(book.id);
                      navigate("/Detail");
                    }}
                    className="w-full h-[220px] object-cover rounded-t cursor-pointer"
                  />
                  <div className="p-2 flex flex-col flex-grow">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">{book.name}</h3>
                    <h4 className="text-sm text-gray-600 mb-1 line-clamp-1">{book.authorName}</h4>
                    <p className="text-lg font-semibold text-gray-900 mb-3">
                      ${book.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                navigate("/" + Product?.category.toLowerCase());
              }}
              className="px-6 py-2 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300 transition"
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </>
  );
}
