import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Define the ProtectedRoute component
const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Retrieve the token from local storage
  const [redirecting, setRedirecting] = useState(false); // Track if redirection is happening
  const [loading, setLoading] = useState(true); // Track loading state to hide content until check completes
  const navigate = useNavigate();
  // Check if the token exists
  useEffect(() => {
    if (!token) {
      setRedirecting(true); // Start the redirection process
      setTimeout(() => {
        navigate("/"); // Redirect to login after 3 seconds
      }, 3000);
    } else {
      setLoading(false); // If token exists, stop the loading state and show protected content
    }
  }, [token, navigate]);

  if (redirecting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="p-4 border-2 border-red-500 bg-red-100 text-center rounded-md"
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <h2 className="text-lg font-bold text-red-600">
            Unauthorized Access! You will be redirected to the home page.
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return null; // Don't render any content while loading (before token check)
  }

  return <Outlet />; // Render the nested routes if the token exists
};

export default ProtectedRoute;
