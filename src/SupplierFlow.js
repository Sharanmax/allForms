import React, { useState } from 'react';
import { Box } from '@mui/material';
import BusinessForm from './BusinessForm'
import AddressForm from './AddressForm';
import ContactForm from './SupplierContactForm';
// Initial values for Formik


const SupplierForm = () => {
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
                return <BusinessForm nextStep={incrementStep} />;
            case 1:
                return <AddressForm goBack={decrementStep} nextStep={incrementStep} />;
            case 2:
                return <ContactForm goBack={decrementStep} nextStep={incrementStep} />;
            default:
                return <BusinessForm nextStep={incrementStep} />;
        }
    };

    return (
        <Box sx={{ flex: 1 }}>
            {renderStep(step)}
        </Box>
    );
};

export default SupplierForm;
