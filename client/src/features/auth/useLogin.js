import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function useLogin() {
  const navigate = useNavigate();
  const { Login } = useAuth();
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Login(data.user, data.token);
      console.log("data-user", data.user);
      navigate("/dashboard");
    },
  });

  return { signIn, isPending, error };
}
