import React from 'react';
import { Formik, Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Box, Button } from '@mui/material';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const ContactForm = ({ goBack }) => {
    const initialValues = {
        personName: '',
        contactNumber: '',
        email: '',
        website: '',
    };

    const validationSchema = Yup.object({
        personName: Yup.string()
            .required('Contact Person Name is required')
            .min(2, 'Name must be at least 2 characters long')
            .max(50, 'Name can be no longer than 50 characters'),

        contactNumber: Yup.string()
            .required('Contact Number is required')
            .matches(phoneRegExp, 'Invalid phone number'),

        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),

        website: Yup.string()
            .nullable()
            .notRequired()
    });

    
    const onSubmit = (values) => {
        alert(`check details ${JSON.stringify(values)}`);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {formik => (
                <Form>
                    <Box sx={{ px: '35px', py: '30px', width: '608px', m: 'auto', mt: '32px', boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)' }}>
                        <MaterialUIFieldAdapter 
                            formik={formik}
                            name="personName"
                            type="text"
                            label="Contact Person Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="contactNumber"
                            type="text"
                            label="Contact Number"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            name="website"
                            type="text"
                            label="Website(Optional)"
                            placeholder="Type"
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

ContactForm.propTypes = {
    goBack: PropTypes.func
}

export default ContactForm;
