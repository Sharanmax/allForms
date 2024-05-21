import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';  // Adjust import path as needed
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Persist } from 'formik-persist';
import { nextBtnText, renderBackButton } from './utilities';


const BusinessForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
    return (
                <Form {...formikProps}>
                    <Box sx={{
                        maxWidth: {
                            xs: '100%',  // If viewport width is below 600px, maxWidth is 100%
                            sm: '608px'  // If viewport width is above 600px, maxWidth is 608px
                        },
                        m: 'auto',
                        mt: '32px',
                        px: {
                            xs: '16px',
                            sm: '35px'
                        },
                        py:{
                            xs: '16px',
                            sm: '30px'},
                        boxShadow: {
                            xs: 'none',
                            sm:'0px 4px 25px 0px rgba(0, 0, 0, 0.05)'},
                        borderRadius: 12,
                        bgcolor: 'background.paper',
                    }}>
                        <MaterialUIFieldAdapter
                            type="file"
                            name="companyLogo"
                            label="Upload Company Logo"
                            {...formikProps}
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="brandName"
                            type="text"
                            label="Brand Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="companyName"
                            type="text"
                            label="Company Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="gender"
                            type="radio"
                            label="Gender"
                            options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="natureOfBusiness"
                            type="multiselect"
                            label="Nature of Business"
                            options={[{ value: 'tech', label: 'Tech' }, { value: 'retail', label: 'Retail' }]}
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="numberOfEmployees"
                            type="select"
                            label="No. of Employees"
                            options={[{ value: '1-10', label: '1-10' }, { value: '11-50', label: '11-50' }]}
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                    <Button type="submit" color="primary" variant="contained" sx={{
                            width: {
                                xs: '100%',
                                sm: '79%'
                            } 
                        }}>
                               {nextBtnText(isLastStep)}
                            </Button>
                            {renderBackButton(onBack, step)}
                        </Box>
                        
                    </Box>
                    {/* <Persist name="business-form" /> */}
                </Form>
            )
};

BusinessForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default BusinessForm;
