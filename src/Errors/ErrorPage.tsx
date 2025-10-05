// src/pages/errors/ErrorPage.tsx
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  code: number;
  title: string;
  message: string;
}

export  function ErrorPage({ code, title, message }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-6xl font-extrabold text-gray-800">{code}</h1>
      <h2 className="text-2xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-500 mt-2 max-w-md">{message}</p>

      <button
        className="mt-6 px-2 py-2 bg-blue-600 rounded-lg text-white"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
}
