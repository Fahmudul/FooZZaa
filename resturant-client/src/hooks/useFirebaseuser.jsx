import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import auth from "../firebase/Firebase.config";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

const useFirebaseUser = () => {
  const { setUser, setLoading } = useContext(AuthContext);

  return useQuery("user", async () => {
    return new Promise((resolve, reject) => {
      const unubscribe = onAuthStateChanged(
        auth,
        (currentuser) => {
          setUser(currentuser);
          console.log(currentuser);
          resolve(currentuser);
          unubscribe();
        },
        reject
      );
    });
  });
};

export default useFirebaseUser;
