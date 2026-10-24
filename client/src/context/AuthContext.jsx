import { useQueryClient } from "@tanstack/react-query";
import { useContext, createContext, useState } from "react";
import useGetCurrentUser from "../features/profile/useGetCurrentUser";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );

  const isAuthenticated = !!token;

  const queryClient = useQueryClient();

  const { data: user = null, isLoading: isUserLoading } =
    useGetCurrentUser(token);

  const Login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const Logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, Login, Logout, isAuthenticated, isUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context == undefined)
    throw new Error("Context was used outside of the provider");
  return context;
}

export { AuthProvider, useAuth };
