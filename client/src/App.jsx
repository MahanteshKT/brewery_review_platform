// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup/";
import Profile from "./pages/Profile";
import SearchPage from "./pages/searchPage";
import { useContext, useEffect } from "react";
import authContext from "./store/authContext";
import BreweryDetails from "./pages/breweryPage/breweryDetails";
import BaseUrl from "./BaseUrl";
function App() {
  const ctx = useContext(authContext);
  const getReviews = async () => {
    try {
      const res = await fetch(BaseUrl + "get-reviews", {
        method: "GET",
      });
      const Resdata = await res.json();
      if (!res.ok) {
        console.log(Resdata);
        throw new Error(Resdata.error);
      }
      if (Resdata) {
        console.log(Resdata);
        // ctx.setMessage({ heading: "success", })
        return Resdata;
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  useEffect(() => {
    getReviews()
      .then((data) => {
        ctx.setReviews(data);
      })
      .catch((err) => {
        ctx.setMessage({ heading: "error", msg: err.message });
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={ctx.token ? <Profile /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={ctx.token ? <Profile /> : <SignupPage />}
        />
        <Route
          path="/profile"
          element={ctx.token ? <Profile /> : <LoginPage />}
        />
        <Route
          path="/search"
          element={ctx.token ? <SearchPage /> : <LoginPage />}
        />
        <Route
          path="/brewery-details"
          element={ctx.token ? <BreweryDetails /> : <LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
