import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";
import { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient);
  } else {
    res.json({ error: "Patient not found" });
  }
});

router.get("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    res.send(patient.entries);
  } else {
    res.json({ error: "Patient not found" });
  }
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(id, newEntry);
      res.json(addedEntry);
    } catch (e) {
      let errorMessage = "Something went wrong.";
      if (e instanceof Error) {
        errorMessage += " Error: " + e.message;
      }
      res.status(400).send(errorMessage);
    }
  } else {
    res.json({ error: "Patient not found" });
    return;
  }
});

export default router;
