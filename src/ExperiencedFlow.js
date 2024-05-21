import React, { useState } from 'react';
import MultiStepForm from './StepFormContainer';
import RegistrationForm from './RegistrationForm';
import StatusForm from './StatusForm';
import WorkExperienceForm from './ExperienceForm';

import { statusValidationSchema, workExperienceValidationSchema, registrationValidationSchema } from './validationSchemas';

const formConfigs = [
    {
        Component: RegistrationForm,
        initialValues: {
            image: '',
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            dateOfBirth: '',
            currentCity: '',
        },
        validationSchema: registrationValidationSchema,
        key: 'registration',
        type: 'fresher' // Example specific prop for RegistrationForm,       
    },
    {
        Component: StatusForm,
        initialValues: {
            brandName: '',
            currentCity: '',
            monthlySalary: '',
        },
        validationSchema: statusValidationSchema,
        key: 'status'
    },
    {
        Component: WorkExperienceForm,
        initialValues: {
            workExperience: '',
            department: '',
            position: ''
        },
        validationSchema: workExperienceValidationSchema,
        key: 'workExperience' 
    }
];

// Initial values for Formik
const ExperiencedForm = () => {
    

    return (
        <MultiStepForm formConfigs={formConfigs} onSubmitFinal={(values) => alert(`end of fresher flow ${JSON.stringify(values)}`)} />
    );
};

export default ExperiencedForm;
