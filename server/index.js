import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/authRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import bodyParser from "body-parser";
import IP from './Models/ipmodel.js'
import requestIp from "request-ip";

const app = express();
dotenv.config({
  path: ".env",
});

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 3004`);
});

app.use((req, res, next) => {
  var clientIp = requestIp.getClientIp(req)
  // console.log(clientIp)
  const newIP = new IP({ ipAddress: clientIp });

  newIP.save()
    .then(() => {
      // console.log('IP address saved successfully');
    })
    .catch(err => {
      // console.error('Error saving IP address:', err);
    });

  next();
});


app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/", authRoute);
app.use("/blog", blogRoute);
