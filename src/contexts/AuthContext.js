/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 01:29:17 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

// use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // create an user with firebase
  const signup = (email, pass) => {
    return auth.createUserWithEmailAndPassword(email, pass);
  };

  useEffect(() => {
    // set current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
