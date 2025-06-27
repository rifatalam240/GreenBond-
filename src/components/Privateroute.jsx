import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/Authcontext";

const Privateroute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <span className="loading loading-spinner text-primary loading-lg"></span>
    );
  }

  if (user) {
    return children;
  }

  // If not loading and not user, nothing is rendered (redirect happens)
  return null;
};

export default Privateroute;
