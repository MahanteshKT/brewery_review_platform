import React, { useContext, useState } from "react";

import classes from "./Signup.module.css";

import { NavLink, useNavigate } from "react-router-dom";
import SideImg from "./../../assets/login-side-img.png";
import Layout from "../../components/Layout/Root";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import BaseUrl from "../../BaseUrl";
import authContext from "../../store/authContext";

function SignupPage() {
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const intialData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isMatch, setisMatch] = useState(true);
  const [formState, setFormState] = useState(intialData);
  const onChangeHandler = (e, label) => {
    setFormState((prev) => {
      return {
        ...prev,
        [label]: e.target.value,
      };
    });
  };

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(formState);
    if (formState.password !== formState.confirmPassword) {
      ctx.setMessage({
        heading: "error",
        msg: "password not match in confirm fields",
      });
      return;
    }
    const formData = {
      fullName: formState.fullName,
      email: formState.email,
      password: formState.password,
    };
    console.log(formData);
    sendData(formData)
      .then(
        ctx.setMessage({ heading: "success", msg: "Successfully Registered" })
      )
      .catch((err) => {
        ctx.setMessage({ heading: "error", msg: err.message });
      });
    // setFormState(intialData);
  };

  const sendData = async (data) => {
    console.log("sdfsd", data);
    const res = await fetch(BaseUrl + "auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const Resdata = await res.json();
    if (!res.ok) {
      console.log(Resdata);
      throw new Error(Resdata.error);
    }
    if (Resdata) {
      console.log(Resdata);
      navigate("/");
    }
  };
  return (
    <Layout>
      <Card className={classes.formdiv}>
        <div className={classes.signupBanner}>
          <h2 className={classes.sideContent}>Hi, Welcome Back</h2>
          <img className={classes.sideImg} src={SideImg} alt="lakokdf" />
        </div>
        <form className={classes.form} onSubmit={OnSubmitHandler}>
          <h2>SignUp</h2>
          <p>
            Have an Acount? <NavLink to="/">Login</NavLink>
          </p>
          <div className={classes.inputs}>
            <Input
              className={classes.formInput}
              attributes={{
                type: "text",
                placeholder: "Full Name",
                name: "fullName",
                value: formState.fullName,
                onChange: (e) => onChangeHandler(e, "fullName"),
              }}
            />

            <Input
              className={classes.formInput}
              attributes={{
                type: "text",
                placeholder: "Email Address",
                name: "email",
                value: formState.email,
                onChange: (e) => onChangeHandler(e, "email"),
              }}
            />

            <Input
              className={classes.formInput}
              label="Full Name:"
              attributes={{
                type: "password",
                placeholder: "Password",
                name: "password",
                value: formState.password,
                onChange: (e) => onChangeHandler(e, "password"),
              }}
            />

            <Input
              className={`${classes.lastInput} ${
                isMatch ? classes.matched : classes.notMatched
              }`}
              label="Full Name:"
              message={isMatch ? "password matched" : "Password not matching"}
              attributes={{
                type: "password",
                placeholder: "Confirm Password",
                name: "confirmPassword",
                value: formState.confirmPassword,
                onChange: (e) => onChangeHandler(e, "confirmPassword"),
              }}
            />
          </div>
          <Button className={classes.button}>Signup</Button>
        </form>
      </Card>
    </Layout>
  );
}

export default SignupPage;
