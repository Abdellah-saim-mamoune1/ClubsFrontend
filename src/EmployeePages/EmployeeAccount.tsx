import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Slices/Hooks";
import {
  GetEmployeeInfoAPI,
  UpdatePersonlaInfoAPI,
  ResetPassword,
} from "../APIs/EmployeeAPIs";
import { IPerson } from "../Interfaces/EmployeeInterfaces";
import { IRestPassword } from "../Interfaces/ClientInterfaces";

export function EmployeeAccount() {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((s) => s.EmployeeSlice.EmployeeInfo);

  const [formData, setFormData] = useState<IPerson | null>(null);
  const [originalData, setOriginalData] = useState<IPerson | null>(null);
  const [status, setStatus] = useState<"success" | "error" | "loading" | null>(null);

  const [passwordData, setPasswordData] = useState<IRestPassword>({
    oldPassword: "",
    newPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState<"success" | "error" | "loading" | null>(null);

  useEffect(() => {
    dispatch(GetEmployeeInfoAPI());
  }, []);

  useEffect(() => {
    if (employee) {
      const { firstName, lastName, gender, birthDate, email, phoneNumber, address } = employee;
      const personData = { firstName, lastName, gender, birthDate, email, phoneNumber, address };
      setFormData(personData);
      setOriginalData(personData);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || JSON.stringify(formData) === JSON.stringify(originalData)) return;

    setStatus("loading");
    const result = await UpdatePersonlaInfoAPI(formData);
    setStatus(result !== false ? "success" : "error");

    if (result !== false) dispatch(GetEmployeeInfoAPI());

    setTimeout(() => setStatus(null), 3000);
  };

  const handleReset = () => {
    if (originalData) setFormData(originalData);
    setStatus(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.oldPassword || !passwordData.newPassword) return;

    setPasswordStatus("loading");
    const result = await ResetPassword(passwordData);
    setPasswordStatus(result !== false ? "success" : "error");

    if (result !== false) setPasswordData({ oldPassword: "", newPassword: "" });

    setTimeout(() => setPasswordStatus(null), 3000);
  };

  if (!formData) {
    return <div className="text-center mt-10 text-gray-500">No employee data available.</div>;
  }

  return (
    <div className="p-3 sm:p-6 md:p-6 space-y-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-teal-600 mb-6 text-center">Your Information</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "firstName", label: "First Name" },
              { name: "lastName", label: "Last Name" },
              { name: "email", label: "Email" },
              { name: "phoneNumber", label: "Phone Number" },
              { name: "address", label: "Address" },
              { name: "birthDate", label: "Birth Date", type: "date" }
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  type={type || "text"}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-teal-300 "
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-teal-300"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={status === "loading" || JSON.stringify(formData) === JSON.stringify(originalData)}
                className="flex-1 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-300"
              >
                {status === "loading" ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </form>

          {status === "success" && <p className="mt-4 text-green-600 text-center font-medium">Information updated successfully.</p>}
          {status === "error" && <p className="mt-4 text-red-600 text-center font-medium">Failed to update information.</p>}
        </div>

        <div>
        <div className="bg-white  rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-semibold text-teal-600 dark:text-teal-400 mb-6 text-center">Reset Password</h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Current Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={passwordStatus === "loading"}
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition disabled:bg-gray-300"
            >
              {passwordStatus === "loading" ? "Updating..." : "Reset Password"}
            </button>
          </form>

          {passwordStatus === "success" && <p className="mt-4 text-green-600 text-center font-medium">Password reset successfully.</p>}
          {passwordStatus === "error" && <p className="mt-4 text-red-600 text-center font-medium">Failed to reset password.</p>}
        </div>
        </div>
      </div>
    </div>
  );
}
