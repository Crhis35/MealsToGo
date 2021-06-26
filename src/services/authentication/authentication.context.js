import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';

import { loginRequest } from './authentication.services';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const currUser = await loginRequest(email, password);
      setUser(currUser);
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (email, password, repeatedPassword) => {
    try {
      setIsLoading(true);
      if (password !== repeatedPassword) {
        setError('Error: Passwords do not match');
        return;
      }
      const currUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      setUser(currUser);
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async () => {
    await firebase.auth().signOut();
    setUser(null);
    setError(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
