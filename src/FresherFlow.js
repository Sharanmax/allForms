import React, { useState } from 'react';
import { Box } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import EducationForm from './EducationForm';
import MultiStepForm from './StepFormContainer';
import * as Yup from 'yup';

// Initial values for Formik
const FresherForm = () => {
  const registrationValidationSchema = Yup.object({
    image: Yup.string(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    gender: Yup.string().required(),
    dateOfBirth: Yup.date().required(),
    currentCity: Yup.string()
  });

  const educationValidationSchema = Yup.object({
    levelOfEducation: Yup.string().required(),
    nameOfInstitution: Yup.string().required().min(2),
    cityOfInstitution: Yup.string().required(),
    fieldOfStudy: Yup.string().required(),
    passoutYear: Yup.date().max(new Date()).required()
  });

  // Define form configurations with specific props
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
        currentCity: ''
      },
      validationSchema: registrationValidationSchema,
      key: 'registration',
      specificProps: {
        type: 'user' // Example specific prop for RegistrationForm
      }
    },
    {
      Component: EducationForm,
      initialValues: {
        levelOfEducation: '',
        nameOfInstitution: '',
        cityOfInstitution: '',
        fieldOfStudy: '',
        passoutYear: ''
      },
      validationSchema: educationValidationSchema,
      key: 'education',
      specificProps: {
        goBack: () => console.log('Going back') // Example specific prop for EducationForm
      }
    }
  ];


    return (
      <MultiStepForm formConfigs={formConfigs}/>
    );
};

export default FresherForm;
