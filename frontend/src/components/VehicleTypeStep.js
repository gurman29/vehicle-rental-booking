import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    CircularProgress,
    Button
} from '@mui/material';

const VehicleTypeStep = ({ wheels, onBack, onNext }) => { // Ensure onNext is received
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVehicleType, setSelectedVehicleType] = useState(null); // Add state for selected type

    useEffect(() => {
        if (wheels) {
            setLoading(true);
            axios.get(`/api/vehicle-types?wheels=${wheels}`)
                .then(response => {
                    setTypes(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('API Error:', err);
                    setError('Failed to load vehicle types.');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [wheels]);

    const handleVehicleTypeChange = (event) => {
        setSelectedVehicleType(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedVehicleType) {
            onNext();
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Select Vehicle Type ({wheels ? `${wheels}-wheel vehicles` : 'Please select number of wheels first'})
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : (
                <FormControl component="fieldset" fullWidth disabled={!wheels}>
                    <RadioGroup
                        name="vehicleType"
                        value={selectedVehicleType}
                        onChange={handleVehicleTypeChange}
                    >
                        {types.map(type => (
                            <FormControlLabel
                                key={type.id}
                                value={type.id}
                                control={<Radio />}
                                label={`${type.name} (${type.vehicles?.length || 0} available)`}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}

            <Button onClick={onBack}>Back</Button>
            <Button type="submit" variant="contained" color="primary" disabled={!selectedVehicleType}>
                Next
            </Button>
        </Box>
    );
};

export default VehicleTypeStep;