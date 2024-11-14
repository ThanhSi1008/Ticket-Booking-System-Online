import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cinemaApi from "../cinemaApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      }
    };

    loadToken();
  }, []);

  const signUp = async (userData) => {
    console.log(userData)
    try {
      const response = await cinemaApi.post(
        "/auth/signup",
        JSON.stringify(userData),
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await response.data

      if (data.token) {
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
      }
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  const signIn = async (userData) => {
    try {
      console.log(userData);
      // Make the API call
      const response = await cinemaApi.post("/auth/login", userData, {
        headers: { "Content-Type": "application/json" },
      });

      // The response data is automatically parsed by Axios, no need for response.json()
      const data = response.data;

      console.log(data); // Log the data to see what the response contains

      if (data.token) {
        // Store the token in AsyncStorage and update the authToken state
        await AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
      }
    } catch (error) {
      // Log the error response for more details
      console.error(
        "Sign In Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
