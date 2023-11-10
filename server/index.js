const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/AuthRoutes");
const userRouter = require("./routes/userRouters");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("MONGODB Connected successfully");
      console.log(`server is listening in port -${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error occuredon connection to MongoDB");
    console.log(error);
  });

app.use(express.json());
app.use(morgan("common"));
app.use(cors());

app.use("/", userRouter);
app.use("/auth", authRouter);
