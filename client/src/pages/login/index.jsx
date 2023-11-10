import React, { useContext, useState } from "react";
import classes from "./Login.module.css";
import Layout from "../../components/Layout/Root";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import SideImg from "./../../assets/login-side-img.png";
import { NavLink, useNavigate } from "react-router-dom";
import BaseUrl from "../../BaseUrl";
import authContext from "../../store/authContext";

function LoginPage() {
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
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
    const formData = {
      email: formState.email,
      password: formState.password,
    };

    console.log(formData);
    sendData(formData)
      .then(ctx.setMessage({ heading: "success", msg: "Login Successfully" }))
      .catch((err) => {
        ctx.setMessage({ heading: "error", msg: err.message });
      });
    // setFormState(intialData);
  };

  const sendData = async (data) => {
    // console.log("sdfsd", data);
    const res = await fetch(BaseUrl + "auth/login", {
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
      ctx.setUser(Resdata);
      navigate("/search");
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
          <h2>Login</h2>
          <p>
            Don't Have an Acount? <NavLink to="/signup">Signup</NavLink>
          </p>
          <div className={classes.inputs}>
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
          </div>
          <Button>Login</Button>
        </form>
      </Card>
    </Layout>
  );
}

export default LoginPage;
