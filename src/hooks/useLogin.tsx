import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function useLogin(): [
  boolean,
  string,
  (email: string, password: string) => Promise<void>
] {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem(
          "authToken",
          JSON.stringify({ token: data.token, expiryTime })
        );
        dispatch({ type: "LOGIN", payload: data.token });

        navigate("/account");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setErrorMessage(`Login error: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, errorMessage, login];
}
