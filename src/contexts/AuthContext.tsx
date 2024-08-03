import React, { createContext, useReducer, useContext, useEffect } from "react";

type User = {
  email: string;
  name: string;
};

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
};

type AuthAction =
  | { type: "LOGIN"; payload: { token: string; user: User } }
  | { type: "LOGOUT" }
  | { type: "SET_AUTH_STATE"; payload: Omit<AuthState, "isLoading"> }
  | { type: "SET_LOADING"; payload: boolean };

type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        isLoading: false,
      };
    case "SET_AUTH_STATE":
      return { ...state, ...action.payload, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const checkAuth = (): Omit<AuthState, "isLoading"> => {
  const tokenData = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");
  if (tokenData && userData) {
    const { token, expiryTime } = JSON.parse(tokenData);
    const user = JSON.parse(userData);
    if (new Date().getTime() < expiryTime) {
      return { isAuthenticated: true, token, user };
    }
  }
  return { isAuthenticated: false, token: null, user: null };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initialAuthState = checkAuth();
    dispatch({ type: "SET_AUTH_STATE", payload: initialAuthState });

    const interval = setInterval(() => {
      const currentAuthState = checkAuth();
      if (currentAuthState.isAuthenticated !== state.isAuthenticated) {
        dispatch({ type: "SET_AUTH_STATE", payload: currentAuthState });
      }
    }, 60000); // Check every minute

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
