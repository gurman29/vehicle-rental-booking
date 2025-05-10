import React, { useEffect, useState } from 'react';
import { getVehiclesByType } from '../api';
import { 
  Button, 
  Typography, 
  Box, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  CircularProgress,
  Alert
} from '@mui/material';

const VehicleModelForm = ({ formData, handleChange, nextStep, prevStep }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!formData.vehicleType) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await getVehiclesByType(formData.vehicleType);
        setVehicles(response.data.vehicles || []);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicle models. Please try again.');
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [formData.vehicleType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.vehicleModel) {
      nextStep();
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Select Specific Model
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset" fullWidth>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : vehicles.length > 0 ? (
            <RadioGroup
              aria-label="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel || ''}
              onChange={handleChange('vehicleModel')}
            >
              {vehicles.map(vehicle => (
                <FormControlLabel 
                  key={vehicle.id} 
                  value={vehicle.id.toString()} 
                  control={<Radio />} 
                  label={vehicle.name || vehicle.model} 
                />
              ))}
            </RadioGroup>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No models available for selected type
            </Typography>
          )}
        </FormControl>

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={prevStep}>
            Back
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!formData.vehicleModel || loading}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default VehicleModelForm;