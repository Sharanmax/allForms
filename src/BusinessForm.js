import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';  // Adjust import path as needed
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Persist } from 'formik-persist';

// Initial values for Formik
const initialValues = {
    companyLogo: '',
    brandName: '',
    companyName: '',
    gender: '',
    natureOfBusiness: '',
    numberOfEmployees: ''
};

const validationSchema = Yup.object({
    companyLogo: Yup.mixed()
        .nullable()
        .notRequired(), // Assuming this is a file upload field, and files are handled differently

    brandName: Yup.string()
        .required('Brand Name is required')
        .min(2, 'Brand Name must be at least 2 characters')
        .max(100, 'Brand Name must not exceed 100 characters'),

    companyName: Yup.string()
        .required('Company Name is required')
        .min(2, 'Company Name must be at least 2 characters')
        .max(100, 'Company Name must not exceed 100 characters'),

    gender: Yup.string()
        .required('Please select a gender'),

    natureOfBusiness: Yup.array()
        .min(1, 'Please select at least one option')
        .required('This field is required'),

    numberOfEmployees: Yup.string()
        .required('Please select the number of employees')
        .oneOf(['1-10', '11-50'], 'Invalid number of employees selection')
});

const onSubmit = (values) => {
    console.log(values);

};

const BusinessForm = ({nextStep}) => {
    return (
        <Formik initialValues={initialValues} onSubmit={(values) =>{ onSubmit(values); nextStep();}} validationSchema={validationSchema}>
            {formik => (
                <Form>
                    <Box sx={{
                        maxWidth: '608px',
                        m: 'auto',
                        mt: '32px',
                        px: '35px',
                        py: '30px',
                        boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)',
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}>
                        <MaterialUIFieldAdapter
                            type="file"
                            name="companyLogo"
                            label="Upload Company Logo"
                            formik={formik}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="brandName"
                            type="text"
                            label="Brand Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="companyName"
                            type="text"
                            label="Company Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="gender"
                            type="radio"
                            label="Gender"
                            options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="natureOfBusiness"
                            type="multiselect"
                            label="Nature of Business"
                            options={[{ value: 'tech', label: 'Tech' }, { value: 'retail', label: 'Retail' }]}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="numberOfEmployees"
                            type="select"
                            label="No. of Employees"
                            options={[{ value: '1-10', label: '1-10' }, { value: '11-50', label: '11-50' }]}
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? '444px' : "100%" }}>
                                Next
                            </Button>
                            {window.innerWidth >= 600 ? <Button type="button" color="secondary" variant="contained" sx={{ width: '94px' }}>
                                Back
                            </Button> : <></>}
                        </Box>
                        
                    </Box>
                    {/* <Persist name="business-form" /> */}
                </Form>
            )}
        </Formik>
    );
};

BusinessForm.propTypes = {
    nextStep: PropTypes.func
}

export default BusinessForm;
