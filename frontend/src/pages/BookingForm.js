import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import WheelsStep from './WheelsStep';
import VehicleTypeStep from './VehicleTypeStep';

const steps = ['Wheels', 'Vehicle Type'];

export default function BookingForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [wheels, setWheels] = useState(null);
    const wheelsRef = useRef(wheels);

    useEffect(() => {
        wheelsRef.current = wheels;
    }, [wheels]);

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleWheelsChange = useCallback((value) => {
        setWheels(value);
    }, []);

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 && (
                <WheelsStep
                    value={wheels}
                    onChange={handleWheelsChange}
                    onNext={handleNext}
                />
            )}

            {activeStep === 1 && wheelsRef.current !== null && (
                <VehicleTypeStep
                    wheels={wheelsRef.current}
                    onBack={handleBack}
                    onNext={handleNext} // Ensure onNext is passed
                />
            )}
        </Box>
    );
}