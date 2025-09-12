import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    staleTime: 60 * 1000,
  });
};
