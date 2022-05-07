import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

mongoose.connect(
  `mongodb://${process.env.DB_URL}/spionsatellit`,
  {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
);

dotenv.config()


const port: string = process.env.PORT!;

app.listen(port, () => {
  console.log(`listening on ${port}`);
})