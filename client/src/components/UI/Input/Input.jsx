import React from "react";
import classes from "./Input.module.css";
function Input(props) {
  return (
    <div>
      <input
        className={`${classes.input} ${props.className ? props.className : ""}`}
        {...props.attributes}
      />
      {/* <p className={`${props.message ? isclasses.message : classes.hide}`}>
        {props.message && props.message}
      </p> */}
    </div>
  );
}

export default Input;
