import React from "react";
import classes from "./Button.module.css";
function Button(props) {
  return (
    <button
      onClick={props.onClick && props.onClick}
      style={props.style || {}}
      className={`${props.className ? props.className : ""} ${classes.button}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
