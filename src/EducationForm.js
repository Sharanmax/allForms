import React from 'react';
import { Formik, Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Box, Button } from '@mui/material';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const EducationForm = ({ goBack }) => {
    const initialValues = {
        levelOfEducation: '',
        nameOfInstitution: '',
        cityOfInstitution: '',
        fieldOfStudy: '',
        passoutYear: ''
    };

    const educationValidationSchema = Yup.object({
        levelOfEducation: Yup.string()
            .required('Level of education is required'),
        nameOfInstitution: Yup.string()
            .required('Name of institution is required')
            .min(2, 'Name must be at least 2 characters'),
        cityOfInstitution: Yup.string()
            .required('City of institution is required'),
        fieldOfStudy: Yup.string()
            .required('Field of study is required'),
        passoutYear: Yup.date()
            .max(new Date(), 'Passout year cannot be in the future')
            .required('Passout year is required')
            .typeError('Invalid date format')
    });

    const onSubmit = (values) => {
        alert(`check details ${values}`);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={educationValidationSchema}>
            {formik => (
                <Form>
                    <Box sx={{ px: '35px', py: '30px', width: '608px', m: 'auto', mt: '32px', boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)' }}>
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="levelOfEducation"
                            label="Level of Education"
                            options={[{ value: 'Bachelors', label: 'Bachelors' }, { value: 'Masters', label: 'Masters' }]}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="text"
                            name="nameOfInstitution"
                            label="Name of Institution"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="select"
                            name="cityOfInstitution"
                            label="City of Institution"
                            options={[{ value: 'New York', label: 'New York' }, { value: 'Los Angeles', label: 'Los Angeles' }]}
                        />
                        <MaterialUIFieldAdapter
                            formik={formik}
                            type="text"
                            name="fieldOfStudy"
                            label="Field of Study"
                            placeholder="Type"
                        />
                        <Box>
                            <MaterialUIFieldAdapter
                                formik={formik}
                                type="date"
                                name="passoutYear"
                                label="Passout Year"
                            />
                        </Box>
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? 444 : "100%" }}>
                                Next
                            </Button>
                            {window.innerWidth >= 600 ? <Button type="button" color="secondary" variant="contained" sx={{ width: 94 }} onClick={goBack}>
                                Back
                            </Button> : <></>}
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

EducationForm.propTypes = {
    goBack: PropTypes.func
}

export default EducationForm;
