import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/userApi";

export default function useGetCurrentUser(token) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getCurrentUser({ token });
      return data.user;
    },
    enabled: !!token,
    retry: false,
  });
}
