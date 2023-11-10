import React, { useContext, useEffect, useState } from "react";
import classes from "./Message.module.css";
import authContext from "../../../store/authContext";
function Message(props) {
  const [isClose, setIsClose] = useState(false);
  const ctx = useContext(authContext);
  const onCloseHandler = (e) => {
    e.preventDefault();
    setIsClose(true);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => {
      ctx.setMessage(null);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  return (
    <div
      className={`${classes.Message} ${
        props.message.heading === "success" ? classes.success : classes.error
      } ${!isClose ? classes.visible : ""}`}
    >
      <div>
        <h3>{props.message.heading || "message heading"}</h3>
        <p>{props.message.msg ?? "message"}</p>
      </div>
      <label style={{ cursor: "pointer" }} onClick={onCloseHandler}>
        &#x2715;
      </label>
    </div>
  );
}

export default Message;
