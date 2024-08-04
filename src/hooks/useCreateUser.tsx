import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function useCreateUser(): [
  boolean,
  string,
  (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>
] {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const createUser = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();

        const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem(
          "authToken",
          JSON.stringify({ token: data.token, expiryTime })
        );
        localStorage.setItem("userData", JSON.stringify(data.user));

        dispatch({
          type: "LOGIN",
          payload: { token: data.token, user: data.user },
        });

        navigate("/account");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "User creation failed");
      }
    } catch (error) {
      console.error("User creation error:", error);
      if (error instanceof Error) {
        setErrorMessage(`User creation error: ${error.message}`);
      } else {
        setErrorMessage("An unknown error occurred during user creation");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, errorMessage, createUser];
}
