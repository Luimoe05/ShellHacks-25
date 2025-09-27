import { useEffect, useState } from "react";

function Homepage() {
  const [backendMessage, setBackendMessage] = useState("Loading...");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/`)
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Error connecting to backend "));
  }, [backendUrl]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 text-center px-4">
      <p className="text-xl bg-gray-100 px-6 py-3 rounded-lg shadow-md">
        {backendMessage}
      </p>
    </div>
  );
}

export default Homepage;
