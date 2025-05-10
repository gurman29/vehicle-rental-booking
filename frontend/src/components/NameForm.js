import React from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const NameForm = ({ formData, handleChange, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName) {
      nextStep();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>First, what's your name?</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NameForm;