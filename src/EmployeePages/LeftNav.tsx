import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Slices/Hooks";
import { SetUserType } from "../Slices/EmployeeSlices/EmployeeInfoSlice";
import { SetUserTypeToLocalStorage } from "../Utilities/UClient";

export default function LeftNav() {
  const dispatch=useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const UserType=useAppSelector(s=>s.EmployeeSlice.UserType);
 const allItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Clients", path: "/clients" },
  { label: "Employees", path: "/employees" },
  { label: "Authors", path: "/authors" },
  { label: "Books", path: "/books" },
  { label: "Book Copies", path: "/bookscopies" },
  { label: "Orders", path: "/orders" },
  { divider: true },
  { label: "Account", path: "/employeeaccount" },
 
];

const navItems =
  UserType === "Seller"
    ? allItems.filter(
        (item) =>
          item.label === "Dashboard" ||
          item.label === "Orders" ||
          item.label === "Account" ||
          item.label === "Logout" ||
          item.divider
      )
    : allItems;

  const handleNavigate = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>

      <div className="hidden md:block w-64 h-full bg-gray-900 text-white p-5 overflow-y-auto border-r border-gray-800 top-0 left-0">
        <div className="space-y-3 text-sm font-medium mt-10">
          {navItems.map((item, idx) =>
            item.divider ? (
              <hr key={idx} className="my-4 border-gray-700" />
            ) : (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.path!)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition"
              >
                {item.label}
              </button>
            )
          )}
          
           <button
                onClick={() => {dispatch(SetUserType("Client")),SetUserTypeToLocalStorage("Client")}}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 rounded hover:bg-gray-800 transition"
              >
                Logout
              </button>

        </div>
      </div>

      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center border-b border-gray-800 sticky top-0 left-0 w-full z-500">
        <span className="font-semibold text-lg">Menu</span>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="w-64 h-full bg-gray-900 text-white p-5 overflow-y-auto border-r border-gray-800">
            <div className="space-y-3 text-sm font-medium mt-10">
              {navItems.map((item, idx) =>
                item.divider ? (
                  <hr key={idx} className="my-4 border-gray-700" />
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.path!)}
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition"
                  >
                    {item.label}
                  </button>
                )
              )}
              <button
                onClick={() => {dispatch(SetUserType("Client")),SetUserTypeToLocalStorage("Client")}}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 rounded hover:bg-gray-800 transition"
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
