import React from 'react';
import { Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';

// Example data for selects (should be fetched or defined elsewhere in real scenarios)
const experienceOptions = [
    { value: '1-3', label: '1-3 years' },
    { value: '4-6', label: '4-6 years' },
    { value: '7+', label: '7+ years' }
];

const departmentOptions = [
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'marketing', label: 'Marketing' }
];

const positionOptions = [
    { value: 'manager', label: 'Manager' },
    { value: 'seniorDeveloper', label: 'Senior Developer' },
    { value: 'hrConsultant', label: 'HR Consultant' }
];

const WorkExperienceForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
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
                    }}>
                        <Box>
                            <MaterialUIFieldAdapter
                                {...formikProps}
                                type="select"
                                name="workExperience"
                                label="Work Experience"
                                options={experienceOptions}
                            />
                        </Box>
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="select"
                            name="department"
                            label="Department"
                            options={departmentOptions}
                        />
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="select"
                            name="position"
                            label="Position"
                            options={positionOptions}
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? '444px' : "100%" }}>
                               {nextBtnText(isLastStep)}
                            </Button>
                            {renderBackButton(onBack, step)}
                        </Box>
                    </Box>
                </Form>
    );
};

WorkExperienceForm.propTypes = {
    onBack: PropTypes.func,
    step: PropTypes.number,
    isLastStep: PropTypes.bool,
    formikProps: PropTypes.object
}

export default WorkExperienceForm;
