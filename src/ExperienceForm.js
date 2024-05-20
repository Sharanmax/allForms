import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';

// Initial values for Formik
const initialValues = {
    workExperience: '',
    department: '',
    position: ''
};

// Validation Schema using Yup
const validationSchema = Yup.object({
    workExperience: Yup.string().required('Work experience is required'),
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required')
});

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

const WorkExperienceForm = ({nextStep, goBack}) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log(values)}>
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
                    }}>
                        <Box>
                            <MaterialUIFieldAdapter
                                formik={formik}
                                type="select"
                                name="workExperience"
                                label="Work Experience"
                                options={experienceOptions}
                            />
                        </Box>
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="department"
                            label="Department"
                            options={departmentOptions}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="position"
                            label="Position"
                            options={positionOptions}
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

WorkExperienceForm.propTypes = {
    nextStep: PropTypes.func,
    goBack: PropTypes.func
}

export default WorkExperienceForm;
