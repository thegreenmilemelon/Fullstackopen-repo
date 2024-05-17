import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Slider,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { EntryWithoutId, EntryType, Diagnosis } from "../../types";

import diagnosisService from "../../services/diagnosis";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const typeOption: { value: EntryType; label: string }[] = Object.values(
  EntryType
).map((v) => ({
  value: v,
  label: v.toString(),
}));

const EntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [diagnoses, setDiagnoses] = useState<Array<Diagnosis>>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = typeOption.find((t) => t.value.toString() === value);
      if (type) {
        setType(type.value);
      }
    }
  };

  const addEntry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case EntryType.HealthCheck:
        onSubmit({
          ...baseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating,
        });
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          ...baseEntry,
          type: EntryType.OccupationalHealthcare,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        });
        break;
      case EntryType.Hospital:
        onSubmit({
          ...baseEntry,
          type: EntryType.Hospital,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      default:
        onSubmit({
          ...baseEntry,
          type: EntryType.HealthCheck,
          healthCheckRating,
        });
    }
  };

  return (
    <form onSubmit={addEntry}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              multiple
              value={diagnosisCodes}
              onChange={(event) =>
                setDiagnosisCodes(event.target.value as string[])
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} ({diagnosis.name})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={type.toString()}
            onChange={onTypeChange}
          >
            {typeOption.map(({ value, label }) => (
              <MenuItem key={value} value={value.toString()}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {type === EntryType.HealthCheck && (
          <Grid item xs={12} sm={6}>
            <InputLabel id="health-check-rating-label">
              Health Check Rating
            </InputLabel>
            <Slider
              aria-labelledby="health-check-rating-label"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={3}
              value={healthCheckRating || 0}
              onChange={(_event, newValue) =>
                setHealthCheckRating(newValue as number)
              }
            />
          </Grid>
        )}
        {type === EntryType.OccupationalHealthcare && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Employer name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              fullWidth
              label="Sick leave start date"
              type="date"
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Sick leave end date"
              type="date"
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        )}
        {type === EntryType.Hospital && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discharge date"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              label="Discharge criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <Button type="submit">Add Entry</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryForm;
