import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import OtpInput from 'react-otp-input';
import * as Yup from 'yup';
import { Box, Button, Typography, FormHelperText } from '@mui/material';
import { createTimer } from './utilities';

const validationSchema = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^[0-9]+$/, "Must be only digits")
        .length(4, 'OTP must be exactly 4 digits')
});

const VerifyOTP = ({subHeader, onBack, callBack}) => {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        const timer = createTimer(10,(val) => setTimeLeft(val));

        return () => timer.stop();  // Cleanup function to stop the timer on unmount
    }, []);

    return (
        <Box 
            sx={{
                width: 400,
                margin: 'auto',
                padding: 2,
                textAlign: 'center',
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                display: 'flex',         // Use Flexbox for alignment
                flexDirection: 'column', // Stack children vertically
                alignItems: 'center',    // Center-align children horizontally
                justifyContent: 'center'
            }}>
            <h2>Verify OTP</h2>
            <Typography variant="body2" sx={{ mb: 2 }} >
                {subHeader || 'We will send you a Confirmation Code'}
            </Typography>
            <Formik
                initialValues={{ otp: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ setFieldValue, isSubmitting, errors, touched }) => (
                    <Form>
                        <Field name="otp">
                            {({ field }) => (
                                <Box>
                                    <OtpInput
                                        {...field}
                                        value={field.value}
                                        onChange={otp => setFieldValue('otp', otp)}
                                        numInputs={4}
                                        separator={<span>-</span>}
                                        shouldAutoFocus
                                        isInputNum
                                        renderInput={(props) => <input {...props} />}
                                        inputStyle={{
                                            width: '45px',
                                            height: '45px',
                                            margin: '0 5px',
                                            fontSize: '20px',
                                            borderRadius: '5px',
                                            border: '1px solid rgba(0,0,0,0.3)',
                                            border: touched.otp && errors.otp ? '1px solid red' : '1px solid rgba(0,0,0,0.3)',
                                        }}
                                    />
                                    {touched.otp && errors.otp && (
                                        <FormHelperText sx={{ color: 'error.main', textAlign: 'right' }}>{errors.otp}</FormHelperText>
                                    )}
                                        <Button disabled={timeLeft > 0} onClick={() => console.log("check for callback")} sx={{
                                            textTransform: 'none', // Prevent uppercase
                                            width: '100%',         // Ensure the button occupies the required width
                                            justifyContent: 'flex-end' // Aligns content to the right within the button
                                        }}>
                                            <Typography
                                                sx={{
                                                    textAlign: 'right', // Ensures text is right-aligned
                                                    fontSize: '10px',   // Sets font size
                                                    display: 'flex',    // Uses flexbox for internal alignment
                                                    alignItems: 'center' // Centers items vertically within the flex container
                                                }}
                                            >
                                                Resend OTP in {timeLeft} sec
                                            </Typography>

                                        </Button>
                                </Box>
                            )}
                        </Field>
                        <Button type="submit" color='primary' variant='contained' disabled={isSubmitting} sx={{ width: '100%', alignSelf: 'center', height: '48px', mt: '96px', mb: '16px' }}>
                            Verify
                        </Button>
                    </Form>
                )}
            </Formik>
            <Button onClick={onBack}>Back</Button>
        </Box>
    );
};

export default VerifyOTP;
