import React from 'react';
import { Formik, Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Button, Box } from '@mui/material';
import * as Yup from 'yup'; 
import eighteenYearsAgo, { validateFile } from './utilities';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
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


const RegistrationForm = ({type, callBack}) => {
    return (
        <Formik
            initialValues={{
                image: '',
                firstName: '',
                lastName: '',
                email: '',
                gender: '',
                dateOfBirth: '',
                currentCity: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                callBack();
            }}
        >
            {formik => (
                <Form>
                    <Box display="flex" flexDirection="column" alignSelf={'center'} justify={'center'} sx={{ px: '35px', py: '30px', width: '608px', m: 'auto', mt: '32px', boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)'}}>
                        <MaterialUIFieldAdapter
                            type="file"
                            name="image"
                            label="Upload Image"
                            formik={formik}
                        />
                        <Box  fullWidth sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <Box sx={{ width: '49%'}}>
                                <MaterialUIFieldAdapter
                                    type="text"
                                    name="firstName"
                                    label="First Name"
                                    formik={formik}
                                    placeholder="Type"
                                />
                            </Box>
                            <Box sx={{ width: '49%'}}>
                                <MaterialUIFieldAdapter
                                    type="text"
                                    name="lastName"
                                    label="Last Name"
                                    formik={formik}
                                    placeholder="Type"
                                />
                            </Box>
                        </Box>
                        <Box  fullWidth >
                            <MaterialUIFieldAdapter
                                type="email"
                                name="email"
                                label="Email"
                                formik={formik}
                                placeholder="Type"
                            />
                        </Box>
                        <Box >
                            <MaterialUIFieldAdapter
                                formik={formik}
                                name="gender"
                                type="radio"
                                label="Gender"
                                options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                            />
                        </Box>
                        <Box >
                            <MaterialUIFieldAdapter 
                                type='date'
                                label='Date of Birth'
                                name='dateOfBirth'
                                placeholder='DD/MM/YYYY'
                                formik={formik}
                            />
                        </Box>
                        
                        {type === 'fresher' ? <Box >
                            <MaterialUIFieldAdapter
                                type="select"
                                options={[{ value: 'New York', label: 'New York' }, { value: 'Los Angeles', label: 'Los Angeles' }]}
                                name="currentCity"
                                label="Current City"
                                formik={formik}
                                placeholder="Select"
                            />
                        </Box> : <></>}
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? 444 : "100%" }}>
                                Next
                            </Button>
                            {window.innerWidth >= 600 ? <Button type="button" color="secondary" variant="contained" sx={{ width: 94 }}>
                                Back
                            </Button> : <></>}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

RegistrationForm.propTypes = {
    type: PropTypes.string,
    callBack: PropTypes.func
}

export default RegistrationForm;
