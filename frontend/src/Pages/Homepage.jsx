import { useEffect, useState } from "react";

function Homepage() {
  const [userInfo, setUserInfo] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/`)
      .then((res) => res.text())
      .then((htmlData) => {
        if (htmlData.includes("Logged in as")) {
          setUserInfo(htmlData);
        } else {
          setUserInfo(null);
        }
      })
      .catch(() => setUserInfo(null));
  }, [backendUrl]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-900 text-center px-4">
      <div className="text-xl bg-gray-100 px-6 py-3 rounded-lg shadow-md">
        {userInfo ? (
          <div>
            <p>{userInfo}</p>
            <a
              href="http://localhost:3000/logout"
              className="text-blue-600 underline"
            >
              Logout
            </a>
          </div>
        ) : (
          <a
            href="http://localhost:3000/login"
            className="text-blue-600 underline"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}

export default Homepage;
