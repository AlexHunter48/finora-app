import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/Login");
    },
  });

  return { signUp, isPending, error };
}
