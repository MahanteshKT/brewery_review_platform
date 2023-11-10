import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message/Message";
import authContext from "../../store/authContext";

function Layout(props) {
  const ctx = useContext(authContext);
  // console.log(ctx);
  return (
    <div className="App">
      {ctx.message && <Message message={ctx.message} />}
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
