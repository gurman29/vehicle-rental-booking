import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';

const DateRangeForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    if (startDate > endDate) {
      setError('End date must be after start date');
      return;
    }
    
    setFormData({
      ...formData,
      startDate,
      endDate
    });
    nextStep();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>Select Rental Dates</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              minDate={new Date()}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          <Box mb={2}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={startDate || new Date()}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={prevStep}>Back</Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;