import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
// Define form configurations with specific props


const MultiStepForm = ({ formConfigs }) => {
    const [step, setStep] = useState(0);  // Current form step
    const currentConfig = formConfigs[step];

    // Combined initial values from all forms
    const combinedInitialValues = formConfigs.reduce((acc, current) => ({
        ...acc,
        ...current.initialValues
    }), {});

    const handleSubmit = (values) => {
        if (step < formConfigs.length - 1) {
            setStep(step + 1);  // Move to next form segment
        } else {
            console.log('Final submission:', values);
            // Handle final submission here
        }
    };

    return (
        <Formik
            initialValues={combinedInitialValues}
            validationSchema={currentConfig.validationSchema}
            onSubmit={handleSubmit}
        >
            {formikProps => (
                <Form>
                    {/* Spread both Formik props and specific props */}
                    <currentConfig.Component {...formikProps} {...currentConfig.specificProps} />
                    <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
                    <button type="submit">{step === formConfigs.length - 1 ? 'Submit' : 'Next'}</button>
                </Form>
            )}
        </Formik>
    );
};

export default MultiStepForm;
