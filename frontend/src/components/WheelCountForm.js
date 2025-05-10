import React from 'react';
import { Button, Typography, Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

const WheelCountForm = ({ formData, handleChange, nextStep, prevStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.wheelCount) {
      nextStep();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Number of wheels</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="wheelCount"
            name="wheelCount"
            value={formData.wheelCount}
            onChange={handleChange('wheelCount')}
          >
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
          </RadioGroup>
        </FormControl>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={prevStep}>Back</Button>
          <Button type="submit" variant="contained" color="primary" disabled={!formData.wheelCount}>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default WheelCountForm;