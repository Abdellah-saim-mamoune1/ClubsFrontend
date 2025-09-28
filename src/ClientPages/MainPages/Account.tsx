import { useAppDispatch, useAppSelector } from "../../Slices/Hooks";
import { GetClientInfoAPI, ResetPasswordAPI, UpdateClientInfoAPI } from "../../APIs/ClientAPIs";
import { IUpdateClientInfo } from "../../Interfaces/ClientInterfaces";
import { useState } from "react";
import { IRestPassword } from "../../Interfaces/ClientInterfaces";

export function Account() {
  const dispatch = useAppDispatch();
  const Client = useAppSelector((state) => state.ClientInfoSlice.ClientInfo);

  const [firstName, setFirstName] = useState(Client?.firstName || "");
  const [lastName, setLastName] = useState(Client?.lastName || "");
  const [phoneNumber, setPhoneNumber] = useState(Client?.phoneNumber || "");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isAlgerianPhone = (phone: string) => /^0(5|6|7)[0-9]{8}$/.test(phone);

  async function handleSave() {
    if (!firstName || !lastName || !phoneNumber) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (!isAlgerianPhone(phoneNumber)) {
      setMessage({ type: "error", text: "Phone number must be a valid Algerian number (e.g. 07XXXXXXXX)." });
      return;
    }

    const data: IUpdateClientInfo = { firstName, lastName, phoneNumber };
    const result = await UpdateClientInfoAPI(data);

    if (result === true) {
      dispatch(GetClientInfoAPI());
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } else {
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  }

  async function handlePasswordChange() {
    if (!currentPassword || !newPassword) {
      setMessage({ type: "error", text: "Please enter both current and new password." });
      return;
    }

    const data: IRestPassword = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };

    const result = await ResetPasswordAPI(data);
    if (result === true) {
      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordForm(false);
    } else {
      setMessage({ type: "error", text: "Failed to change password." });
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 py-6 bg-white  rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 ">Account Information</h1>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded shadow ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 ">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300  px-4 py-2 bg-white  text-gray-800 "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 ">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300  px-4 py-2 bg-white text-gray-800 "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 07XXXXXXXX"
            className="mt-1 block w-full rounded border border-gray-300  px-4 py-2 bg-white  text-gray-800 "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 ">Email (readonly)</label>
          <input
            type="email"
            value={Client?.account || ""}
            disabled
            className="mt-1 block w-full rounded border bg-gray-100  text-gray-600  px-4 py-2 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleSave}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded shadow"
        >
          Save Changes
        </button>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="text-sm text-blue-600  hover:underline"
        >
          {showPasswordForm ? "Cancel Password Change" : "Change Password"}
        </button>
      </div>

      {showPasswordForm && (
        <div className="mt-6 border-t pt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 ">Change Password</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 ">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 bg-white  text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 ">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 bg-white  text-gray-800 "
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
