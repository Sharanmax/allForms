import * as Yup from 'yup';
import eighteenYearsAgo,{validateFile, phoneRegExp} from './utilities';

export const registrationValidationSchema = Yup.object({
    image: Yup.mixed()
        .test("fileSize", "The file is too large", (value) => validateFile(value, 1))  // Assuming a max size of 5MB
        .test("fileType", "Unsupported file format", (value) => validateFile(value, 1)),
    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters long'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters long'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'others'], 'Invalid gender')
        .required('Gender is required'),
    dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .max(eighteenYearsAgo, 'You must be at least 18 years old'),
    currentCity: Yup.string().when('type', {
        is: 'fresher',
        then: Yup.string().required('Current city is required'),
    }),
});

export const statusValidationSchema = Yup.object({
    brandName: Yup.string()
        .required('Brand Name is required')
        .min(2, 'Brand Name must be at least 2 characters long')
        .max(50, 'Brand Name cannot be longer than 50 characters'),
    currentCity: Yup.string()
        .required('Current working city is required')
        .oneOf(['newYork', 'losAngeles'], 'Invalid city selected'),
    monthlySalary: Yup.string()
        .required('Monthly Salary is required')
        .oneOf(['1000', '2000'], 'Invalid salary selected'),
});

export const workExperienceValidationSchema = Yup.object({
    workExperience: Yup.string().required('Work experience is required'),
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required')
});

export const businessValidationSchema = Yup.object({
    companyLogo: Yup.mixed()
        .nullable()
        .notRequired(), // Assuming this is a file upload field, and files are handled differently

    brandName: Yup.string()
        .required('Brand Name is required')
        .min(2, 'Brand Name must be at least 2 characters')
        .max(100, 'Brand Name must not exceed 100 characters'),

    companyName: Yup.string()
        .required('Company Name is required')
        .min(2, 'Company Name must be at least 2 characters')
        .max(100, 'Company Name must not exceed 100 characters'),

    gender: Yup.string()
        .required('Please select a gender'),

    natureOfBusiness: Yup.array()
        .min(1, 'Please select at least one option')
        .required('This field is required'),

    numberOfEmployees: Yup.string()
        .required('Please select the number of employees')
        .oneOf(['1-10', '11-50'], 'Invalid number of employees selection')
});

export const addressValidationSchema = Yup.object({
    useMap: Yup.boolean(),
    pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'), // Adjust regex according to your country's postal code standards
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State is required'),
    houseNumber: Yup.string()
        .required('House number is required')
        .max(50, 'House number must not exceed 50 characters'),
    area: Yup.string()
        .max(100, 'Area description must not exceed 100 characters') // Optional field but with a length validation
});

export const contactValidationSchema = Yup.object({
    personName: Yup.string()
        .required('Contact Person Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name can be no longer than 50 characters'),

    contactNumber: Yup.string()
        .required('Contact Number is required')
        .matches(phoneRegExp, 'Invalid phone number'),

    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),

    website: Yup.string()
        .nullable()
        .notRequired()
});

export const supplierContactValidationSchema = Yup.object({
    areaOfCoverage: Yup.string()
        .required('Selecting an area of coverage is required'),

    scaleOfSupply: Yup.string()
        .required('Selecting a scale of supply is required'),

    personName: Yup.string()
        .required('Contact Person Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name can be no longer than 50 characters'),

    contactNumber: Yup.string()
        .required('Contact Number is required')
        .matches(phoneRegExp, 'Invalid phone number'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    website: Yup.string()
        .url('Enter a valid URL')
        .notRequired() // Makes it optional
});