import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7048/api/", // your .NET backend URL
  withCredentials: true, // since you’re using cookies/JWT
});

// Export the same instance for all your APIs
export default api;
