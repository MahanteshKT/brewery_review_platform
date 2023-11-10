import React from "react";
import authContext from "./authContext";
import AuthReducer from "./AuthReducer";
function ContextProvider(props) {
  const { state, dispatch } = AuthReducer();

  const setUserHandler = (data) => {
    const { user, token } = data;
    dispatch({ type: "SET_USER", payload: { user, token } });
  };

  const setMessageHandler = (message) => {
    dispatch({ type: "SET_MESSAGE", payload: { message } });
  };

  const setIsLoadingHandler = () => {
    dispatch({ type: "LOADING" });
  };

  const setBreweriesHandler = (brewers) => {
    dispatch({ type: "SET_BREWERS", payload: brewers });
  };
  const setReviewsHandler = (reviews) => {
    dispatch({ type: "SET_REVIEWS", payload: reviews });
  };

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isLoading: state.isLoading,
        message: state.message,
        reviews: state.reviews,
        setIsLoading: setIsLoadingHandler,
        setUser: setUserHandler,
        setMessage: setMessageHandler,
        setBreweries: setBreweriesHandler,
        setReviews: setReviewsHandler,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export default ContextProvider;
