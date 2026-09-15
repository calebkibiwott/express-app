import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRotes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`)
})