import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';


const AddressForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
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
                        py: {
                            xs: '16px',
                            sm: '30px'
                        },
                        boxShadow: {
                            xs: 'none',
                            sm: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)'
                        },
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                    }}>
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="checkbox"
                            name="useMap"
                            label="Use Map"
                        />

                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="text"
                            name="pincode"
                            label="Pincode"
                        />

                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="select"
                            name="city"
                            label="City"
                            options={[{ value: 'city1', label: 'City 1' }, { value: 'city2', label: 'City 2' }]} // Populate according to your data
                        />

                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="select"
                            name="state"
                            label="State"
                            options={[{ value: 'state1', label: 'State 1' }, { value: 'state2', label: 'State 2' }]} // Populate according to your data
                        />

                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="textarea"
                            name="houseNumber"
                            label="House / Flat / Block No."
                        />

                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="textarea"
                            name="area"
                            label="Road / Area (Optional)"
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
                </Form>
            )
}

AddressForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default AddressForm;
