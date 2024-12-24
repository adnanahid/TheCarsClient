import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //!googleLogin
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //!userRegistration
  const userRegistration = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //!Update User Profile
  const updateUserProfile = (updateData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateData);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      try {
        if (currentUser?.email) {
          // Generate JWT for the logged-in user
          const response = await axios.post(
            `${import.meta.env.VITE_DEFAULT_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
          console.log("JWT generated:", response.data);
        } else {
          // Clear JWT and log the user out
          const response = await axios.post(
            `${import.meta.env.VITE_DEFAULT_URL}/logout`,
            {},
            { withCredentials: true }
          );
          console.log("User logged out:", response.data);
        }
      } catch (error) {
        console.error("Error handling auth state change:", error);
      } finally {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unSubscribe(); // Clean up subscription on component unmount
  }, []);

  const authInfo = {
    user,
    setUser,
    signInWithGoogle,
    userRegistration,
    signInWithEmailPass,
    signOutUser,
    updateUserProfile,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
