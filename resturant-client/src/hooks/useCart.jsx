import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxios from "./useAxios";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useCart = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);
  const { data: cartInfo = [], isLoading, refetch } = useQuery({
    queryKey: ["cartinfo", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/carts/?email=${user?.email}`);
      return data;
    },
  });
  return { cartInfo, isLoading,refetch };
};

export default useCart;
