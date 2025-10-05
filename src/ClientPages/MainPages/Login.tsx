import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SetLoggedInState } from "../../Slices/ClientSlices/ClientInfoSlice";
import { useAppDispatch } from "../../Slices/Hooks";
import { GetClientInfoAPI } from "../../APIs/ClientAPIs";
import { Footer } from "../../Components/Footer";

export function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(true); // ⚠️ حالة البطاقة التحذيرية

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // البطاقة تظهر مرة واحدة عند تحميل الصفحة
    setShowWarning(true);
  }, []);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://localhost:7048/api/authentication/login", {
        username: account,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      await dispatch(GetClientInfoAPI());
      dispatch(SetLoggedInState(true));
      navigate("home");
    } catch (err: any) {
      setError("Invalid id or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-gray-800 relative">
      
      {/* ⚠️ بطاقة التحذير */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-blue-100 border border-blue-400 text-blue-800 rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-semibold mb-2">تنبيه</h3>
            <p className="mb-5">
          سيتم استخراج معلوماتك من تطبيق بروغرس باستخدام رقم تسجيلك وكلمة المرور لعرض بياناتك الشخصية المتعلقة بالدراسة. إذا كنت غير موافق أو غير مرتاح لمشاركة هذه المعلومات عبر الموقع، فالرجاء تجنُّب تسجيل الدخول الآن.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition"
            >
              حسنًا
            </button>
          </div>
        </div>
      )}

      {/* === نموذج تسجيل الدخول === */}
      <div className="mt-8 w-full flex justify-center px-3">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            SignIn
          </h2>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Identifier</label>
            <input
              type="text"
              value={account}
              required
              onChange={(e) => setAccount(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900"
              placeholder="أدخل المعرف الخاص بك"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-gray-900"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading ? "...":"SignIn"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
