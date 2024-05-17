import { Typography, Paper, Grid, Button, Rating } from "@mui/material";
import { Patient, Gender, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import diagnosisService from "../services/diagnosis";
// import EntryForm from "./AddEntryModal/EntryForm";
import EntryModal from "./AddEntryModal/EntryModal";
import { EntryWithoutId } from "../types";

import axios from "axios";

const PatientInfo = () => {
  const { id } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setSelectedPatient(patient);

        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
        console.log("diagnoses", diagnoses);
      }
    };

    void fetchPatient();
  }, [id]);

  if (!selectedPatient) {
    return <div>Loading...</div>;
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case "female":
        return <FemaleIcon />;
      case "male":
        return <MaleIcon />;
      default:
        return null;
    }
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const entryPatient = await patientService.addEntry(
        selectedPatient.id,
        values
      );
      console.log("entryPatient", entryPatient);
      const updatedPatient = {
        ...selectedPatient,
        entries: [...selectedPatient.entries, entryPatient],
      };
      setSelectedPatient(updatedPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px", maxWidth: "600px" }}
    >
      <Typography variant="h4" gutterBottom>
        {selectedPatient.name}
        {getGenderIcon(selectedPatient?.gender)}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>
            <strong>SSN:</strong> {selectedPatient?.ssn}
          </Typography>
          <Typography>
            <strong>Occupation:</strong> {selectedPatient.occupation}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <strong>Date of Birth:</strong> {selectedPatient.dateOfBirth}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Entries:</strong>
          </Typography>
          {selectedPatient.entries.map((entry) => (
            <div key={entry.id}>
              <Typography>
                {entry.date} {entry.description}
              </Typography>
              <ul>
                {entry.diagnosisCodes?.map((code, index) => (
                  <li key={`${entry.id}-${index}`}>
                    {code} {diagnoses.find((d) => d.code === code)?.name}
                  </li>
                ))}
              </ul>
              {entry.type === "HealthCheck" && (
                <div>
                  <Rating
                    name="health-check-rating"
                    value={entry.healthCheckRating}
                    readOnly
                    max={3}
                  />
                  <div style={{ marginBottom: "1rem" }} />
                </div>
              )}
            </div>
          ))}
        </Grid>
        <Grid item xs={12}>
          <EntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add Entry
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientInfo;
