import { useState } from "react";
import { ContactUsAPI } from "../../APIs/ClientAPIs";
import { IContactUs } from "../../Interfaces/ClientInterfaces";
import { SlideAlert } from "../Product/SlideAlertProps";
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (form.message.length > 50) {
      newErrors.message = "Message must be 50 characters or less";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const data: IContactUs = {
      userName: form.name,
      account: form.email,
      message: form.message,
    };

    const result = await ContactUsAPI(data);

    if (result===false) {
      setAlert({ type: "error", message: "Failed to send message." });
     
    } else {
       setAlert({ type: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 text-gray-800 ">

      {alert && (
        <SlideAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <h1 className="text-3xl font-bold mb-6 ">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
  
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white "
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

    
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white "
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

      
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            maxLength={50}
            className="w-full border px-4 py-2 rounded bg-white "
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          <p className="text-xs text-gray-500 mt-1">{form.message.length}/50 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
