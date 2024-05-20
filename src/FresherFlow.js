import React, { useState } from 'react';
import { Box } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import EducationForm from './EducationForm';
import MultiStepForm from './StepFormContainer';
import * as Yup from 'yup';
import eighteenYearsAgo, { validateFile } from './utilities';

// Initial values for Formik
const FresherForm = () => {
  const registrationValidationSchema = Yup.object({
    image: Yup.mixed()
      .test("fileSize", "The file is too large", (value) => validateFile(value, 5))  // Assuming a max size of 5MB
      .test("fileType", "Unsupported file format", (value) => validateFile(value, 5)),
    firstName: Yup.string()
      .required('First Name is required')
      .min(2, 'First Name must be at least 2 characters long'),
    lastName: Yup.string()
      .required('Last Name is required')
      .min(2, 'Last Name must be at least 2 characters long'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    gender: Yup.string()
      .oneOf(['male', 'female', 'others'], 'Invalid gender')
      .required('Gender is required'),
    dateOfBirth: Yup.date()
      .required('Date of birth is required')
      .max(eighteenYearsAgo, 'You must be at least 18 years old'),
    currentCity: Yup.string().when('type', {
      is: 'fresher',
      then: Yup.string().required('Current city is required'),
    }),
  });

  const educationValidationSchema = Yup.object({
    levelOfEducation: Yup.string()
      .required('Level of education is required'),
    nameOfInstitution: Yup.string()
      .required('Name of institution is required')
      .min(2, 'Name must be at least 2 characters'),
    cityOfInstitution: Yup.string()
      .required('City of institution is required'),
    fieldOfStudy: Yup.string()
      .required('Field of study is required'),
    passoutYear: Yup.date()
      .max(new Date(), 'Passout year cannot be in the future')
      .required('Passout year is required')
      .typeError('Invalid date format')
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
      type: 'fresher' // Example specific prop for RegistrationForm,       
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
      key: 'education'
    }
  ];


    return (
      <MultiStepForm formConfigs={formConfigs} onSubmitFinal={(values) => alert(`end of fresher flow ${JSON.stringify(values)}`)}/>
    );
};

export default FresherForm;
