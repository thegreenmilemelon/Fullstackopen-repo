import {
  NewPatientEntry,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }
  if (
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect data: some fields are missing");
  }

  switch (object.type) {
    case "HealthCheck":
      if (!("healthCheckRating" in object)) {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newEntry;

    case "OccupationalHealthcare":
      if (!("sickLeave" in object) || !("employerName" in object)) {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry2: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: "OccupationalHealthcare",
        employerName: parseName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
      return newEntry2;

    case "Hospital":
      if (!("discharge" in object)) {
        throw new Error("Incorrect data: some fields are missing");
      }
      const newEntry3: EntryWithoutId = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object),
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
      return newEntry3;

    default:
      throw new Error("Incorrect or missing entry type");
  }
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    return undefined;
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object)
  ) {
    throw new Error("Incorrect or missing discharge data");
  }
  return {
    date: parseDate(object.date),
    criteria: parseDescription(object.criteria),
  };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating;
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

export default toNewPatientEntry;
