import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin(): [
  boolean,
  string,
  (email: string, password: string) => Promise<void>
] {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Navigate or update state as needed;
        navigate("/account");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      console.error("Full error object:", error);
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
