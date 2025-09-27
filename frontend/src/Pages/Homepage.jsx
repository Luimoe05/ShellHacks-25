import { useEffect, useState } from "react";

function Homepage() {
  const [backendHTML, setBackendHTML] = useState("<p>Loading...</p>");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/`)
      .then((res) => res.text())
      .then((htmlData) => {
        setBackendHTML(htmlData);
      })
      .catch(() => setBackendHTML("<p>Error connecting to backend</p>"));
  }, [backendUrl]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 text-center px-4">
      <div
        className="text-xl bg-gray-100 px-6 py-3 rounded-lg shadow-md"
        dangerouslySetInnerHTML={{ __html: backendHTML }}
      />
    </div>
  );
}

export default Homepage;
