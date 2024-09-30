import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToastNotify";

const AuthContext = createContext();

//* custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  //* neu Benutzer
  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //* benutzer profile aktualisieren
      await updateProfile(auth.currentUser, {
        displayName,
      })

      console.log(userCredential);
      navigate("/login");
      toastSuccessNotify("Registered successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  //* aktueller benutzer
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Logged in successfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toastSuccessNotify("Logged out successfully");
        //Sign-out successful.
      })
      .catch((error) => {
        //An error happened
      });
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
          const {email, displayName,photoURL} = user
        setCurrentUser({email, displayName,photoURL})
      } else {
        setCurrentUser(false)
      }
    });
  };

  const googleProvider = ()=> {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result)=> {
        navigate("/")
        toastSuccessNotify("Logged in successfuly")

    }).catch((error)=> {
        toastErrorNotify(error.message)
    })
  }
//* password zurück setzen
  const forgotPassword = (email)=>{
    sendPasswordResetEmail(auth, email)
    .then(()=> {
        toastWarnNotify("Please check your mail box")

    })
    .catch((error)=>{
        toastErrorNotify(error.message)
    })
  }

  const values = { currentUser, createUser, signIn, logOut, googleProvider, forgotPassword };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
