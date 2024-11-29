import express from "express";
import cors from "cors";
import connectDB from "./database/index.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// all user routes related to authentication
app.use("/api/user", userRouter);

// tosend json if error eccors in controlller
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

connectDB()
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`Server is Running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1);
  });
