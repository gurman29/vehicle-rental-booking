import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Fixed import
import CssBaseline from '@mui/material/CssBaseline';  // Added .js extension
import Container from '@mui/material/Container';  // Added .js extension
import NameForm from './components/NameForm.js';  // Added .js extension
import WheelCountForm from './components/WheelCountForm.js';  // Added .js extension
import VehicleTypeStep from './components/VehicleTypeStep.js';  // Added .js extension
import VehicleModelForm from './components/VehicleModelForm.js';  // Added .js extension
import DateRangeForm from './components/DateRangeForm.js';  // Added .js extension
import Confirmation from './components/Confirmation.js';  // Added .js extension

const theme = createTheme();

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheelCount: null,
    vehicleType: null,
    vehicleModel: null,
    startDate: null,
    endDate: null
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
    
    // Reset dependent fields when their parent changes
    if (input === 'wheelCount') {
      setFormData(prev => ({
        ...prev,
        vehicleType: null,
        vehicleModel: null
      }));
    } else if (input === 'vehicleType') {
      setFormData(prev => ({
        ...prev,
        vehicleModel: null
      }));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <NameForm formData={formData} handleChange={handleChange} nextStep={nextStep} />;
      case 2:
        return <WheelCountForm formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <VehicleTypeStep formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <VehicleModelForm formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <DateRangeForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Confirmation formData={formData} prevStep={prevStep} />;
      default:
        return <NameForm formData={formData} handleChange={handleChange} nextStep={nextStep} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        {renderStep()}
      </Container>
    </ThemeProvider>
  );
}

export default App;
