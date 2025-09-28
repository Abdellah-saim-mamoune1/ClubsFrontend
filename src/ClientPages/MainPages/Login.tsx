import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { SetLoggedInState } from "../../Slices/ClientSlices/ClientInfoSlice";
import { useAppDispatch } from "../../Slices/Hooks";
import { GetClientInfoAPI } from "../../APIs/ClientAPIs";
import { SetEmployeeLoggedInState, SetUserType } from "../../Slices/EmployeeSlices/EmployeeInfoSlice";
import { GetEmployeeInfoAPI } from "../../APIs/EmployeeAPIs";
import { SetUserTypeToLocalStorage } from "../../Utilities/UClient";

interface LoginRequest {
  account: string;
  password: string;
}

export function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    const request: LoginRequest = { account, password };

    try {
      const response=await axios.post(
        "https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/authentication/login",
        request,
        { withCredentials: true }
      );
      if(response.data.data==="Client"){
      SetUserTypeToLocalStorage("Client");
      dispatch(SetUserType("Client"));
      dispatch(SetLoggedInState(true));
      await dispatch(GetClientInfoAPI());
      navigate("/");
    }
    else{
       SetUserTypeToLocalStorage(response.data.data);
       dispatch(SetEmployeeLoggedInState(true));
       dispatch(SetUserType(response.data.data));
       dispatch(GetEmployeeInfoAPI());
    }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Invalid account or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center text-gray-800 ">
      <div className="bg-white  p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 ">
          Login
        </h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700  text-sm mb-2">
            Account
          </label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white  text-gray-900 "
            placeholder="Enter your account"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white  text-gray-900 "
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600 ">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-sky-600 hover:underline hover:text-sky-700 "
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
