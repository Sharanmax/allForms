import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter'; 
import * as Yup from 'yup'; 
import PropTypes from 'prop-types';

// Initial values for the form fields
const initialValues = {
    brandName: '',
    currentCity: '',
    monthlySalary: '',
};

const formValidationSchema = Yup.object({
    brandName: Yup.string()
        .required('Brand Name is required')
        .min(2, 'Brand Name must be at least 2 characters long')
        .max(50, 'Brand Name cannot be longer than 50 characters'),
    currentCity: Yup.string()
        .required('Current working city is required')
        .oneOf(['newYork', 'losAngeles'], 'Invalid city selected'),
    monthlySalary: Yup.string()
        .required('Monthly Salary is required')
        .oneOf(['1000', '2000'], 'Invalid salary selected'),
});

const StatusForm = ({nextStep, goBack}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
            onSubmit={(values) => {
                console.log('Form Data:', values);
                nextStep();
            }}
        >
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
                            formik={formik}
                            name="brandName"
                            type="text"
                            label="Brand Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="currentCity"
                            type="select"
                            label="Current working city"
                            options={[
                                { value: 'newYork', label: 'New York' },
                                { value: 'losAngeles', label: 'Los Angeles' }
                            ]}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="monthlySalary"
                            type="select"
                            label="Monthly Salary"
                            options={[
                                { value: '1000', label: '$1,000' },
                                { value: '2000', label: '$2,000' }
                            ]}
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? '444px' : "100%" }}>
                                Next
                            </Button>
                            {window.innerWidth >= 600 ? <Button type="button" color="secondary" variant="contained" sx={{ width: '94px' }} onClick={goBack}>
                                Back
                            </Button> : <></>}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

StatusForm.propTypes = {
    nextStep: PropTypes.func,
    goBack: PropTypes.func
}

export default StatusForm;
