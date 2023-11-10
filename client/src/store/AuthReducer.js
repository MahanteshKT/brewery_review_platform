import { useReducer } from "react";

const initalState = {
  user: null,
  token: null,
  isLoading: false,
  message: null,
  breweries: [],
  reviews: [],
};

const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
    };
  }
  if (action.type === "LOADING") {
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  }
  if (action.type === "SET_MESSAGE") {
    return {
      ...state,
      message: action.payload.message,
    };
  }
  if (action.type === "SET_BREWERS") {
    return {
      ...state,
      breweries: action.payload,
    };
  }
  if (action.type === "SET_REVIEWS") {
    return {
      ...state,
      reviews: action.payload,
    };
  }
  return state;
};

const AuthReducer = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return { state, dispatch };
};

export default AuthReducer;
