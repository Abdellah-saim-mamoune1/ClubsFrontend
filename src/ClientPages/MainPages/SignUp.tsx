import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { auth } from "../../Main/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { ISignUp } from "../../Interfaces/ClientInterfaces";
import { GetClientInfoAPI, SignUpAPI } from "../../APIs/ClientAPIs";
import { useAppDispatch } from "../../Slices/Hooks";
import { SetLoggedInState } from "../../Slices/ClientSlices/ClientInfoSlice";
import { SetUserType } from "../../Slices/EmployeeSlices/EmployeeInfoSlice";

export function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    account: "",
    password: "",
    phone: "",
  });
  const dispatch=useAppDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userCredential, setUserCredential] = useState<any>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidAlgerianPhone = (phone: string) =>
    /^0(5|6|7)[0-9]{8}$/.test(phone);

  const handleSubmit = async () => {
    const { firstName, lastName, account, password, phone } = form;
    setError("");

    if (!firstName || !lastName || !account || !password || !phone) {
      setError("All fields are required.");
      return;
    }

    if (!isValidAlgerianPhone(phone)) {
      setError("Phone number must be Algerian and start with 05, 06, or 07.");
      return;
    }

    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        account,
        password
      );

      await updateProfile(credential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      await sendEmailVerification(credential.user);
      setVerificationSent(true);
      setUserCredential(credential);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!userCredential) return;

    try {
      await reload(userCredential.user);
      if (userCredential.user.emailVerified) {
        const { firstName, lastName, account, password, phone } = form;

        const data: ISignUp = {
          firstName,
          lastName,
          phoneNumber: phone,
          account_informations: {
            account,
            password,
          },
        };

        const result = await SignUpAPI(data);
        if (result!==false) {
          
          await dispatch(GetClientInfoAPI());
          SetUserType("Client");
          dispatch(SetLoggedInState(true));
          navigate("/");
        }
      } else {
        setError("Email is not verified yet.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to check verification.");
    }
  };

  const handleResendVerification = async () => {
    try {
      if (userCredential) {
        await sendEmailVerification(userCredential.user);
        setError("Verification email resent.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to resend verification email.");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center text-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        {!verificationSent ? (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email (Account)</label>
              <input
                name="account"
                type="email"
                value={form.account}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white "
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Algerian Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="07XXXXXXXX"
                className="w-full px-3 py-2 border rounded bg-white"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm mb-4 text-green-600">
              A verification email has been sent to your account in inbox or junk/spam folder. Please verify your email before proceeding.
            </p>

            <button
              onClick={handleCheckVerification}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded mb-3"
            >
              I Verified My Email
            </button>

            <button
              onClick={handleResendVerification}
              className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Resend Verification Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
