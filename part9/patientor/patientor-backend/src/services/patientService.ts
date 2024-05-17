import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";

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

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = getPatient(id);
  if (patient) {
    const newEntry = {
      ...entry,
      id: uuid(),
    };
    patient.entries.push(newEntry);
    return newEntry;
  }
  throw new Error("Patient not found");
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry,
};
