import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

import Cookie from "js-cookie"; 
// Define the ProtectedRoute component
const ProtectedRoute = () => {
  // Retrieve the token from local storage
  const token = Cookie.get("token");

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
      try {
        // Decode the token
        const decoded = jwtDecode(token);
        const role = decoded.role;
          console.log(role);

        // Get the current time in seconds
        const currentTime = Date.now() / 1000;

        // Check if the token is expired
        if (decoded.exp < currentTime) {
          setRedirecting(true); // Token has expired
          setTimeout(() => {
            navigate("/"); // Redirect to login page after expiration
          }, 3000);
        } else {
          setLoading(false); // Token is valid, stop loading
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setRedirecting(true); // If there's an error decoding the token, redirect
        setTimeout(() => {
          navigate("/"); // Redirect to login on decoding error
        }, 3000);
      }
    }
  }, [navigate,token]);
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
