import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();
  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {
    data: menu = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axiosPublic("/menu");
      return data;
    },
  });
  return {menu, isLoading, refetch};
};
export default useMenu;
