import axios from "axios";

const api = axios.create({
  baseURL: "https://clubsservice-d6e7hccybzcdhefm.spaincentral-01.azurewebsites.net/api/", // your .NET backend URL
  withCredentials: true, // since you’re using cookies/JWT
});

// Export the same instance for all your APIs
export default api;
