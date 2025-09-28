import { useAppDispatch, useAppSelector } from "../../Slices/Hooks";
import { ClearCart,
  RemoveFromCart,
  UpdateItemQuantity, } from "../../Slices/ClientSlices/CartSlice";
import { useNavigate } from "react-router-dom";
import {
  AddOrderAPI,
  DeleteCartProductAPI,
  UpdateCartProductAPI,
} from "../../APIs/ClientAPIs";
import {
  IAddOrder,
  UpdateCartItem,
} from "../../Interfaces/ClientInterfaces";
import { useState } from "react";
import { SetLoggedInState } from "../../Slices/ClientSlices/ClientInfoSlice";

export function Cart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.ClientInfoSlice.IsLoogedIn);
  const products = useAppSelector((state) => state.CartSlice.Items);

  const [showModal, setShowModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(localStorage.getItem("ShippingAddress")??"");
  const [error, setError] = useState("");
  

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600 dark:text-gray-300">
        Your cart is empty.
      </div>
    );
  }

  async function HandleUpdate(CartItemId: number, quantity: number) {
    const data: UpdateCartItem = {
      quantity,
      cartItemId: CartItemId,
    };
    const result = await UpdateCartProductAPI(data, navigate);
    if (result) dispatch(UpdateItemQuantity({ id: CartItemId, quantity }));
  }

  async function HandleDelete(CartItemId: number) {
    dispatch(RemoveFromCart(CartItemId));
    await DeleteCartProductAPI(CartItemId, navigate);
  }

  async function handleConfirmOrder() {
    setError("");

    if (!shippingAddress || shippingAddress.trim().length < 6) {
      setError("Please enter a valid shipping address.");
      return;
    }
    let sum=0;
    products.forEach(item=>sum+=item.totalQuantity)
    const totalPrice= products
          .reduce((sum, item) => sum + item.totalPrice * item.totalQuantity, 0)
          .toFixed(2)
    const cartIds = products.map((item) => item.id);
    const data: IAddOrder = {
      shipmentAddress: shippingAddress,
      totalPrice:Number(totalPrice),
      totalQuantity:sum,
      cartItemsIds: cartIds,
    };

    const result = await AddOrderAPI(data,dispatch);
    if (result) {
      setShowModal(false);
      localStorage.setItem("ShippingAddress",shippingAddress);
      setShippingAddress("");
      dispatch(ClearCart());

    } else if(result===false) {
      dispatch(SetLoggedInState(false));
    }
  }

  return (
    <div className="relative p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      

      <h1 className="text-2xl font-bold">Your Cart</h1>

      {products.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row gap-4 items-center bg-white  p-4 rounded-lg shadow"
        >
          <img
            src={item.imageUrl.replace("http://", "https://")}
            alt={item.name}
            className="w-[120px] h-[160px] object-cover rounded shadow"
          />

          <div className="flex-1 w-full">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-700 ">
              Price: <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
            </p>

            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => HandleUpdate(item.id, item.totalQuantity - 1)}
                disabled={item.totalQuantity <= 1}
                className="px-2 py-1 bg-gray-200  rounded hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>
              <span className="text-sm">{item.totalQuantity}</span>
              <button
                onClick={() => HandleUpdate(item.id, item.totalQuantity + 1)}
                disabled={item.totalQuantity >= item.bookCopyQuantity}
                className="px-2 py-1 bg-gray-200  rounded hover:bg-gray-300 disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => HandleDelete(item.id)}
            className="text-sm text-red-500 hover:underline mt-2 sm:mt-0"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="text-right text-lg font-bold text-sky-600">
        Total: $
        {products
          .reduce((sum, item) => sum + item.totalPrice * item.totalQuantity, 0)
          .toFixed(2)}
      </div>

      <div className="text-right">
        <button
          onClick={() => {
            if (!isLoggedIn) return navigate("/login");
            setShowModal(true);
          }}
          className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
        >
          Proceed to Checkout
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex px-3 items-center justify-center bg-gray-500/30 backdrop-blur-sm z-50">
          <div className="bg-white  p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 ">
              Shipping Address
            </h2>

            {error && (
              <div className="mb-2 text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <textarea
              rows={4}
              placeholder="Enter your shipping address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full border border-gray-300  rounded px-3 py-2 text-gray-800  bg-white "
            />

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 "
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
