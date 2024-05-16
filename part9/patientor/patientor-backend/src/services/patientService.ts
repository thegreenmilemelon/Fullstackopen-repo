import patients from "../../data/patients";
import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  console.log("patients", patients);
  return patients.find((p) => p.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
};
