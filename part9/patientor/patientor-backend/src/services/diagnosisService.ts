import diagnosis from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getEntries,
};
