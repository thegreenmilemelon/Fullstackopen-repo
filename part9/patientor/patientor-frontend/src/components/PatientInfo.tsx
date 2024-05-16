import { Typography, Paper, Grid } from "@mui/material";
import { Patient, Gender } from "../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientInfo = () => {
  const { id } = useParams();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.getPatient(id);
        setSelectedPatient(patient);
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
      </Grid>
    </Paper>
  );
};

export default PatientInfo;
