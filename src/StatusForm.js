import React from 'react';
import {  Form } from 'formik';
import { Box, Button, formControlLabelClasses } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter'; 
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';




const StatusForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
    return (
                <Form {...formikProps}>
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
                            {...formikProps}
                            name="brandName"
                            type="text"
                            label="Brand Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="currentCity"
                            type="select"
                            label="Current working city"
                            options={[
                                { value: 'newYork', label: 'New York' },
                                { value: 'losAngeles', label: 'Los Angeles' }
                            ]}
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            name="monthlySalary"
                            type="select"
                            label="Monthly Salary"
                            options={[
                                { value: '1000', label: '$1,000' },
                                { value: '2000', label: '$2,000' }
                            ]}
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
};

StatusForm.propTypes = {
    onBack: PropTypes.func,
    isLastStep: PropTypes.bool,
    step: PropTypes.number,
    formikProps: PropTypes.object,
    type: PropTypes.string
}

export default StatusForm;
