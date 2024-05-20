import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
    useMap: Yup.boolean(),
    pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'), // Adjust regex according to your country's postal code standards
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State is required'),
    houseNumber: Yup.string()
        .required('House number is required')
        .max(50, 'House number must not exceed 50 characters'),
    area: Yup.string()
        .max(100, 'Area description must not exceed 100 characters') // Optional field but with a length validation
});


const AddressForm = ({nextStep, goBack}) => {
    return (
        <Formik
            initialValues={{
                useMap: false,
                pincode: '',
                city: '',
                state: '',
                houseNumber: '',
                area: ''
            }}
            onSubmit={(values) => {
                console.log(values);
                nextStep()
            }}
            validationSchema={validationSchema}
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
                            type="checkbox"
                            name="useMap"
                            label="Use Map"
                        />

                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="text"
                            name="pincode"
                            label="Pincode"
                        />

                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="city"
                            label="City"
                            options={[{ value: 'city1', label: 'City 1' }, { value: 'city2', label: 'City 2' }]} // Populate according to your data
                        />

                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="state"
                            label="State"
                            options={[{ value: 'state1', label: 'State 1' }, { value: 'state2', label: 'State 2' }]} // Populate according to your data
                        />

                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="textarea"
                            name="houseNumber"
                            label="House / Flat / Block No."
                        />

                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="textarea"
                            name="area"
                            label="Road / Area (Optional)"
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
}

AddressForm.propTypes = {
    nextStep: PropTypes.func,
    goBack: PropTypes.func
}

export default AddressForm;
