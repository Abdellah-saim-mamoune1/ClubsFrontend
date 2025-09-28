import LeftNav from "../EmployeePages/LeftNav";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../EmployeePages/DashBoard";
import { Clients } from "../EmployeePages/Clients";
import { Orders } from "../EmployeePages/Orders";
import { Authors } from "../EmployeePages/Authors";
import { Books } from "../EmployeePages/Books";
import { BookCopies } from "../EmployeePages/BookCopies";
import { Employees } from "../EmployeePages/Employees";
import { EmployeeAccount } from "../EmployeePages/EmployeeAccount";
import { EmployeeTokensRefresher } from "../EmployeePages/RefreshTokens";

export function EmployeeContainer() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <EmployeeTokensRefresher />

      <div className="flex flex-col md:flex-row flex-1">
      
        <div className=" md:h-screen overflow-y-auto">
          <LeftNav />
        </div>

      
        <div className="flex-1 h-screen overflow-y-auto ">
          <Routes>
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/books" element={<Books />} />
            <Route path="/bookscopies" element={<BookCopies />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employeeaccount" element={<EmployeeAccount />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
