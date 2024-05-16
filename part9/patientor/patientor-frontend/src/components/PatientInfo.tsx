import { Typography, Paper, Grid } from "@mui/material";
import { Patient, Gender, Diagnosis } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import diagnosisService from "../services/diagnosis";

const PatientInfo = () => {
  const { id } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientInfo;
