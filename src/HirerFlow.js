import React, { useState } from 'react';
import { Box } from '@mui/material';
import BusinessForm from './BusinessForm'
import AddressForm from './AddressForm';
import ContactForm from './ContactForm';
import MultiStepForm from './StepFormContainer';
import { businessValidationSchema, addressValidationSchema, contactValidationSchema  } from './validationSchemas';

// Initial values for Formik
const formConfigs = [
    {
        Component: BusinessForm,
        initialValues: {
            companyLogo: '',
            brandName: '',
            companyName: '',
            gender: '',
            natureOfBusiness: '',
            numberOfEmployees: ''
        },
        validationSchema: businessValidationSchema,
        key: 'business',   
    },
    {
        Component: AddressForm,
        initialValues: {
            useMap: false,
            pincode: '',
            city: '',
            state: '',
            houseNumber: '',
            area: ''
        },
        validationSchema: addressValidationSchema,
        key: 'address'
    },
    {
        Component: ContactForm,
        initialValues: {
            personName: '',
            contactNumber: '',
            email: '',
            website: '',
        },
        validationSchema: contactValidationSchema,
        key: 'contact'
    }
];

const RecruiterForm = () => {
   

    return (
        <Box sx={{ flex: 1 }}>
            <MultiStepForm formConfigs={formConfigs} onSubmitFinal={(values) => alert(`end of fresher flow ${JSON.stringify(values)}`)} />
        </Box>
    );
};

export default RecruiterForm;
