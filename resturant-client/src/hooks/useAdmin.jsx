import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/admin/${user.email}`);
      // console.log(data['admin']);
      return data["admin"];
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
