import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, Button, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Alert, Typography
} from '@mui/material';
import axios from 'axios';

const steps = ['Name', 'Wheels', 'Vehicle Type', 'Model', 'Date Range'];

const App = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleTypeId: '',
    vehicleId: '',
    startDate: '',
    endDate: ''
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
    setError('');
  };

  const validateStep = () => {
    switch (step) {
      case 0:
        if (!data.firstName || !data.lastName) {
          setError('Please enter both first and last names.');
          return false;
        }
        break;
      case 1:
        if (!data.wheels) {
          setError('Please select number of wheels.');
          return false;
        }
        break;
      case 2:
        if (!data.vehicleTypeId) {
          setError('Please select a vehicle type.');
          return false;
        }
        break;
      case 3:
        if (!data.vehicleId) {
          setError('Please select a vehicle model.');
          return false;
        }
        break;
      case 4:
        if (!data.startDate || !data.endDate) {
          setError('Please select both start and end dates.');
          return false;
        }
        if (data.startDate > data.endDate) {
          setError('Start date must be before end date.');
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    try {
      if (step === 1) {
        const res = await axios.get(`http://localhost:5000/api/vehicle-types?wheels=${data.wheels}`);
        setVehicleTypes(res.data);
      }
      if (step === 2) {
        const selectedType = vehicleTypes.find(v => v.id == data.vehicleTypeId);
        setModels(selectedType?.Vehicles || []);
      }
      setStep((prev) => prev + 1);
    } catch (err) {
      setError('Failed to fetch data. Make sure backend is running.');
    }
  };

  const handleBooking = async () => {
    if (!validateStep()) return;
    try {
      const userRes = await axios.post('http://localhost:5000/api/users', {
        firstName: data.firstName,
        lastName: data.lastName
      });
      const userId = userRes.data.id;

      await axios.post('http://localhost:5000/api/bookings', {
        userId,
        vehicleId: data.vehicleId,
        startDate: data.startDate,
        endDate: data.endDate
      });

      alert('Booking successful!');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 shadow-xl rounded-2xl w-full max-w-2xl">
        <Typography variant="h4" className="text-center mb-6 text-indigo-600 font-bold">
          Vehicle Booking Form
        </Typography>

        <Stepper activeStep={step} alternativeLabel className="mb-6">
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        <div className="space-y-6">
          {step === 0 && (
            <>
              <Typography variant="h6" className="text-gray-700">Enter Your Name</Typography>
              <TextField label="First Name" fullWidth onChange={handleChange('firstName')} value={data.firstName} />
              <TextField label="Last Name" fullWidth onChange={handleChange('lastName')} value={data.lastName} />
            </>
          )}

          {step === 1 && (
            <FormControl>
              <FormLabel className="text-gray-700">Number of Wheels</FormLabel>
              <RadioGroup row value={data.wheels} onChange={handleChange('wheels')}>
                <FormControlLabel value="2" control={<Radio />} label="2-Wheeler" />
                <FormControlLabel value="4" control={<Radio />} label="4-Wheeler" />
              </RadioGroup>
            </FormControl>
          )}

          {step === 2 && (
            <FormControl>
              <FormLabel className="text-gray-700">Select Vehicle Type</FormLabel>
              <RadioGroup value={data.vehicleTypeId} onChange={handleChange('vehicleTypeId')}>
                {vehicleTypes.map(v => (
                  <FormControlLabel key={v.id} value={String(v.id)} control={<Radio />} label={v.name} />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {step === 3 && (
            <FormControl>
              <FormLabel className="text-gray-700">Select Model</FormLabel>
              <RadioGroup value={data.vehicleId} onChange={handleChange('vehicleId')}>
                {models.map(m => (
                  <FormControlLabel key={m.id} value={String(m.id)} control={<Radio />} label={m.name} />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {step === 4 && (
            <>
              <Typography variant="h6" className="text-gray-700">Choose Booking Dates</Typography>
              <TextField
                type="date"
                label="Start Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleChange('startDate')}
                value={data.startDate}
              />
              <TextField
                type="date"
                label="End Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={handleChange('endDate')}
                value={data.endDate}
              />
            </>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          {step > 0 && <Button variant="outlined" onClick={() => setStep(step - 1)}>Back</Button>}
          {step < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" color="success" onClick={handleBooking}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
