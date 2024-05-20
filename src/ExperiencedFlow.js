import React, { useState } from 'react';
import { Box } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import StatusForm from './StatusForm';
import WorkExperienceForm from './ExperienceForm';

// Initial values for Formik
const ExperiencedForm = () => {
    const [step, setStep] = useState(0);

    const incrementStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Function to decrement the step
    const decrementStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const renderStep = (currentStep) => {
        switch (currentStep) {
            case 0:
                return <RegistrationForm callBack={incrementStep} />;
            case 1:
                return <StatusForm goBack={decrementStep} nextStep={incrementStep} />;
            case 2:
                return <WorkExperienceForm goBack={decrementStep} nextStep={incrementStep} />;
            default:
                return <RegistrationForm callBack={incrementStep} />;
        }
    };

    return (
        <Box sx={{ flex: 1 }}>
            {renderStep(step)}
        </Box>
    );
};

export default ExperiencedForm;
