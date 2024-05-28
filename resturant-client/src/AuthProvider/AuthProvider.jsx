import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/Firebase.config";
import useFirebaseUser from "../hooks/useFirebaseuser";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  //   Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Sign in user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Logout
  const logOut = () => {
    return signOut(auth);
  };
  //   Update profile information
  const updateUserInformation = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  useEffect(() => {
    const unubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current User", currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => unubscribe();
  }, [axiosPublic]);
  // const { data: userr, isLoading } = useFirebaseUser();
  // console.log(userr)

  const authInfo = {
    user,
    createUser,
    signIn,
    logOut,
    updateUserInformation,
    loading,
    setUser,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
