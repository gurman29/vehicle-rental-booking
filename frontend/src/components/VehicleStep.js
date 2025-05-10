import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography } from '@mui/material';

export default function VehicleStep({ setValue, vehicleTypeId }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!vehicleTypeId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`/api/vehicle-types/${vehicleTypeId}/vehicles`);
        setVehicles(response.data.vehicles);
      } catch (err) {
        console.error('Failed to load vehicles:', err);
        setError('Failed to load vehicle models');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [vehicleTypeId]);

  if (!vehicleTypeId) {
    return <Typography color="textSecondary">Please select a vehicle type first</Typography>;
  }

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <FormControl fullWidth sx={{ mt: 3 }}>
      <InputLabel>Vehicle Model</InputLabel>
      <Select
        label="Vehicle Model"
        onChange={(e) => setValue('vehicle', e.target.value)}
        disabled={vehicles.length === 0}
      >
        {vehicles.length === 0 ? (
          <MenuItem disabled>No models available</MenuItem>
        ) : (
          vehicles.map(vehicle => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {vehicle.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}