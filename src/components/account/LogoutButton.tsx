import React from "react";
import { useAuth } from "../../contexts/AuthContext";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const { dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
