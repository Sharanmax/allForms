import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';

// Validation schema
const validationSchema = Yup.object({
    mobileNumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
});

//header style
const resFontStyle = {
    fontSize: '24px',
    fontWeight: 600,
    '@media (min-width:600px)': {
        fontSize: '32px'
    },
}

const MobileNumberForm = ({ header, subHeader, btnText, footerText, callback}) => (
    <Formik
        initialValues={{
            mobileNumber: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            callback();
            alert(`OTP sent`);
            setSubmitting(false);
            resetForm();
        }}
    >
        {() => (
            <Form>
                <Box sx={{ maxWidth: 400, mx: "auto", px: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ mt: 2, mb: 2 }} style={resFontStyle}>
                        {header || "Enter Mobile Number"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        {subHeader || 'We will send you a Confirmation Code'}
                    </Typography>
                    <Box>
                        <MaterialUIFieldAdapter
                            name="mobileNumber"
                            type="text"
                            label="Mobile Number"
                            placeholder="Type Mobile Number"
                        />
                    </Box>
                    <Button type="submit" variant="contained"  sx={{width: '100%', alignSelf: 'center', height: '48px', mt: '64px', mb: '16px'}}>
                        {btnText || 'Get OTP'}
                    </Button>
                    <Typography variant="caption" display="block" align="center" fontSize={10} fontWeight={400}>
                        {footerText || 'By continuing agree to Horecah'}{' '}<br></br>
                        <Typography fontWeight={600} fontSize={10}>
                            <Link href="#" underline="always">Terms of Use & Privacy Policy</Link>
                        </Typography>
                    </Typography>
                </Box>
            </Form>
        )}
    </Formik>
);

MobileNumberForm.propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
    footerText: PropTypes.string,
    btnText: PropTypes.string,
    callback: PropTypes.func,
}

export default MobileNumberForm;
