import React, { createContext, useReducer, useContext, useEffect } from "react";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_STATE"; payload: AuthState };

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, token: action.payload };
    case "LOGOUT":
      return { isAuthenticated: false, token: null };
    case "SET_AUTH_STATE":
      return action.payload;
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  let intervalTime = 6000000;

  useEffect(() => {
    const checkAuth = () => {
      const tokenData = localStorage.getItem("authToken");
      if (tokenData) {
        const { token, expiryTime } = JSON.parse(tokenData);
        if (new Date().getTime() < expiryTime) {
          dispatch({
            type: "SET_AUTH_STATE",
            payload: { isAuthenticated: true, token },
          });
        } else {
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("authToken");
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
