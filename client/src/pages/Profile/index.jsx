import React, { useContext } from "react";
import Layout from "../../components/Layout/Root";
import classes from "./Profile.module.css";
import accountImg from "./../../assets/accountImg.png";
import Card from "../../components/UI/Card/Card";
import authContext from "../../store/authContext";
function Profile() {
  const ctx = useContext(authContext);
  return (
    <Layout>
      <Card className={classes.accountdiv}>
        <div className={classes.accountBanner}>
          <img className={classes.sideImg} src={accountImg} alt="lakokdf" />
          <h2 className={classes.sideContent}>
            Hi {ctx.user.fullName.split(" ")[0]} you are logged in.
          </h2>
        </div>
        <div className={classes.accountDetailsContainer}>
          <div className={classes.accountDetails}>
            <div style={{ width: "100%" }}>
              <h2 style={{ textAlign: "center", width: "100%" }}>
                {ctx.user.fullName.split(" ")[0]} Details
              </h2>
            </div>
            <div className={classes.each}>
              <table cellSpacing="2rem">
                <tbody>
                  <tr>
                    <td>Full Name:</td>
                    <td>{ctx.user.fullName}</td>
                  </tr>
                  <tr>
                    <td>Email Address:</td>
                    <td>{ctx.user.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}

export default Profile;
