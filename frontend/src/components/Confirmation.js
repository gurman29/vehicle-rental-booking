import React, { useState } from 'react';
import { createBooking } from '../api.js';
import { Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Confirmation = ({ formData, prevStep }) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await createBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: parseInt(formData.vehicleModel),
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Booking Confirmed!</Typography>
        <Typography>Thank you for your booking, {formData.firstName}!</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Confirm Your Booking</Typography>
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={`${formData.firstName} ${formData.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Wheels" secondary={formData.wheelCount} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Vehicle Model" secondary={formData.vehicleModel} />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Rental Period" 
            secondary={`${new Date(formData.startDate).toLocaleDateString()} - ${new Date(formData.endDate).toLocaleDateString()}`} 
          />
        </ListItem>
      </List>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={prevStep}>Back</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Confirm Booking'}
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;