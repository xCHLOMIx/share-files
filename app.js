import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the Share files server!",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default app;