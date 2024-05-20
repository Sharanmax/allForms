import React from 'react';
import { Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';

const RegistrationForm = ({ onNext, onBack, isLastStep, type, step, ...formikProps }) => {

    return (
        <Form onSubmit={formikProps.handleSubmit}>
            <Box display="flex" flexDirection="column" alignSelf={'center'} justify={'center'} sx={{ px: '35px', py: '30px', width: '608px', m: 'auto', mt: '32px', boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)' }}>
                <MaterialUIFieldAdapter
                    formik={formikProps}
                    type="file"
                    name="image"
                    label="Upload Image"
                />
                <Box fullWidth sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '49%' }}>
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="text"
                            name="firstName"
                            label="First Name"
                            placeholder="Type"
                        />
                    </Box>
                    <Box sx={{ width: '49%' }}>
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="text"
                            name="lastName"
                            label="Last Name"
                            placeholder="Type"
                        />
                    </Box>
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        formik={formikProps}
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Type"
                    />
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        formik={formikProps}
                        type="radio"
                        name="gender"
                        label="Gender"
                        options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                    />
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        formik={formikProps}
                        type='date'
                        name='dateOfBirth'
                        label='Date of Birth'
                        placeholder='DD/MM/YYYY'
                    />
                </Box>
                {type === 'fresher' && (
                    <Box>
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="select"
                            options={[{ value: 'New York', label: 'New York' }, { value: 'Los Angeles', label: 'Los Angeles' }]}
                            name="currentCity"
                            label="Current City"
                            placeholder="Select"
                        />
                    </Box>
                )}
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button type="submit" color="primary" variant="contained" sx={{ width: window.innerWidth >= 600 ? 444 : "100%" }} onClick={onNext} >
                        {nextBtnText(isLastStep)}
                    </Button>
                    {renderBackButton({ onBack, step })}
                </Box>
            </Box>
        </Form>
    );
}

RegistrationForm.propTypes = {
    type: PropTypes.string,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    isLastStep: PropTypes.bool,
    step: PropTypes.number.isRequired
}

export default RegistrationForm;
