import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
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

  // Next button handler for each step
  const handleNext = async () => {
    // Step 1: Fetch vehicle types based on number of wheels
    if (step === 1) {
      const res = await axios.get(`http://localhost:5000/api/vehicle-types?wheels=${data.wheels}`);
      console.log(res.data); // Log the API response to check the data structure
      setVehicleTypes(res.data);  // Store the vehicle types in state
    }

    // Step 2: Set the models based on selected vehicle type
    if (step === 2) {
      const selectedType = vehicleTypes.find(v => v.id == data.vehicleTypeId);
      setModels(selectedType?.Vehicles || []);  // Use 'Vehicles' (capital V) here
    }

    // Move to the next step in the form
    setStep(step + 1);
  };

  // Handling form field changes (e.g., user input)
  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
  };

  // Handle the final booking submission
  const handleBooking = async () => {
    try {
      // Create a new user in the system
      const userRes = await axios.post('http://localhost:5000/api/users', {
        firstName: data.firstName,
        lastName: data.lastName
      });
      const userId = userRes.data.id;

      // Create the booking with the selected vehicle and dates
      const booking = {
        userId,
        vehicleId: data.vehicleId,
        startDate: data.startDate,
        endDate: data.endDate
      };
      await axios.post('http://localhost:5000/api/bookings', booking);
      alert('Booking successful!');
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Stepper activeStep={step}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <div className="mt-6">
        {/* Step 1: User name input */}
        {step === 0 && (
          <>
            <TextField label="First Name" fullWidth onChange={handleChange('firstName')} />
            <TextField label="Last Name" fullWidth className="mt-4" onChange={handleChange('lastName')} />
          </>
        )}

        {/* Step 2: Number of wheels selection */}
        {step === 1 && (
          <FormControl>
            <FormLabel>Number of Wheels</FormLabel>
            <RadioGroup row value={data.wheels} onChange={handleChange('wheels')}>
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </FormControl>
        )}

        {/* Step 3: Vehicle type selection */}
        {step === 2 && (
          <FormControl>
            <FormLabel>Vehicle Type</FormLabel>
            <RadioGroup value={data.vehicleTypeId} onChange={handleChange('vehicleTypeId')}>
              {vehicleTypes.map(v => (
                <FormControlLabel key={v.id} value={String(v.id)} control={<Radio />} label={v.name} />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {/* Step 4: Model selection */}
        {step === 3 && (
          <FormControl>
            <FormLabel>Model</FormLabel>
            <RadioGroup value={data.vehicleId} onChange={handleChange('vehicleId')}>
              {models.map(m => (
                <FormControlLabel key={m.id} value={String(m.id)} control={<Radio />} label={m.name} />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {/* Step 5: Date range selection */}
        {step === 4 && (
          <>
            <TextField type="date" label="Start Date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange('startDate')} />
            <TextField type="date" label="End Date" fullWidth className="mt-4" InputLabelProps={{ shrink: true }} onChange={handleChange('endDate')} />
          </>
        )}

        {/* Step navigation buttons */}
        <div className="mt-6 flex justify-between">
          {step > 0 && <Button variant="contained" onClick={() => setStep(step - 1)}>Back</Button>}
          {step < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>Next</Button>
          ) : (
            <Button variant="contained" onClick={handleBooking}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
