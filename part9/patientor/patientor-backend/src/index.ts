import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnosis";
import patientsRouter from "./routes/patient";

const app = express();
app.use(express.json());
app.use(cors());

// app.use((req, _res, next) => {
//   console.log("Raw Request Body:", req.body);
//   next();
// });

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/ping`);
});
