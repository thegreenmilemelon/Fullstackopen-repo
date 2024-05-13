export type Gender = "male" | "female" | "other";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;
