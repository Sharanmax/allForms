import React from 'react';
import { Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { nextBtnText, renderBackButton } from './utilities';

const RegistrationForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {

    return (
        <Form onSubmit={formikProps.handleSubmit}>
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
                    type="file"
                    name="image"
                    label="Upload Image"
                />
                <Box fullWidth sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ width: '49%' }}>
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="text"
                            name="firstName"
                            label="First Name"
                            placeholder="Type"
                        />
                    </Box>
                    <Box sx={{ width: '49%' }}>
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="text"
                            name="lastName"
                            label="Last Name"
                            placeholder="Type"
                        />
                    </Box>
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        {...formikProps}
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Type"
                    />
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        {...formikProps}
                        type="radio"
                        name="gender"
                        label="Gender"
                        options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'others', label: 'Others' }]}
                    />
                </Box>
                <Box>
                    <MaterialUIFieldAdapter
                        {...formikProps}
                        type='date'
                        name='dateOfBirth'
                        label='Date of Birth'
                        placeholder='DD/MM/YYYY'
                    />
                </Box>
                {type === 'fresher' && (
                    <Box>
                        <MaterialUIFieldAdapter
                            {...formikProps}
                            type="select"
                            options={[{ value: 'New York', label: 'New York' }, { value: 'Los Angeles', label: 'Los Angeles' }]}
                            name="currentCity"
                            label="Current City"
                            placeholder="Select"
                        />
                    </Box>
                )}
                <Box display="flex" justifyContent="space-between" width="100%">
                    <Button type="submit" color="primary" variant="contained" sx={{ width: {
                        xs: '100%',
                        sm: '79%'
                    } }} >
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
    onBack: PropTypes.func,
    isLastStep: PropTypes.bool,
    step: PropTypes.number.isRequired
}

export default RegistrationForm;
