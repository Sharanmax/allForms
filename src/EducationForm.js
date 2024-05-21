import React from 'react';
import { Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';

const EducationForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {

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
                    type="select"
                    name="levelOfEducation"
                    label="Level of Education"
                    options={[{ value: 'Bachelors', label: 'Bachelors' }, { value: 'Masters', label: 'Masters' }]}
                    {...formikProps}
                />
                <MaterialUIFieldAdapter
                    type="text"
                    name="nameOfInstitution"
                    label="Name of Institution"
                    placeholder="Type"
                    {...formikProps}
                />
                <MaterialUIFieldAdapter
                    type="select"
                    name="cityOfInstitution"
                    label="City of Institution"
                    options={[{ value: 'New York', label: 'New York' }, { value: 'Los Angeles', label: 'Los Angeles' }]}
                    {...formikProps}
                />
                <MaterialUIFieldAdapter
                    type="text"
                    name="fieldOfStudy"
                    label="Field of Study"
                    placeholder="Type"
                    {...formikProps}
                />
                <MaterialUIFieldAdapter
                    type="date"
                    name="passoutYear"
                    label="Passout Year"
                    {...formikProps}
                />
                <Box display="flex" justifyContent="space-between" width="100%">
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
    );
};

EducationForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default EducationForm;
