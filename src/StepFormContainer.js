import React, { useState } from 'react';
import { Formik, Form } from 'formik';

const MultiStepForm = ({ formConfigs, onSubmitFinal }) => {
    const [step, setStep] = useState(0);  // Current form step
    const isLastStep = step === formConfigs.length - 1;

    const currentConfig = formConfigs[step];
    const CurrentForm = currentConfig.Component;

    const handleNext = async (values, actions) => {
        if (!isLastStep) {
            const errors = await actions.validateForm();
            if (Object.keys(errors).length === 0) {
                setStep(step + 1);
            } else {
                actions.setTouched(errors);
            }
        } else {
            await onSubmitFinal(values); // Final submission handler
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <Formik
            initialValues={currentConfig.initialValues}
            validationSchema={currentConfig.validationSchema}
            onSubmit={handleNext}
        >
            {formikProps => (
                <Form>
                    <CurrentForm {...formikProps} onNext={() => formikProps.submitForm()} type={currentConfig.type} onBack={handleBack} isLastStep={isLastStep} step={step} />
                </Form>
            )}
        </Formik>
    );
};

export default MultiStepForm;
