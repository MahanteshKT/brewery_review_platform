import React, { createContext } from "react";

const authContext = createContext({
  user: null,
  token: null,
  isLoading: false,
  message: null,
  breweries: [],
  reviews: [],
  setUser: (data) => {},
  setMessage: (message) => {},
  setIsLoading: () => {},
  setBreweries: (data) => {},
  setReviews: (data) => {},
});

export default authContext;
