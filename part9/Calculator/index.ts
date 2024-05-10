import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBmi(height, weight);
    const result = {
      weight,
      height,
      bmi: bmi.category,
    };
    res.json(result);
  }
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/exercise", (req, res) => {
  const body = req.body as { daily_exercises: number[]; target: number };

  if (!body.daily_exercises || !body.target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (isNaN(body.target) || body.daily_exercises.some(isNaN)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(body.daily_exercises, body.target);
    res.json(result);
  }
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
