import { useMutation } from "@tanstack/react-query";
import { googleLoginApi } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useGoogleLoginApi() {
  const { Login } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: googleSignIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: googleLoginApi,
    onSuccess: (data) => {
      Login(data.user, data.token);
      navigate("/dashboard");
    },
  });

  return { googleSignIn, isPending, error };
}
