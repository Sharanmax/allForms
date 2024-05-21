import { Button } from "@mui/material";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export default eighteenYearsAgo;

export const validateFile = (file, maxSize) => {
    if (!file) return true; // Skip if no file is uploaded
    const sizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes
    return file.size <= sizeInBytes && ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
};

export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const nextBtnText = (isLast) => {
    if(isLast) return 'Confirm'
    else return 'Next'
}

export const renderBackButton = ( onBack, step ) => {
    if (window.innerWidth >= 600 && step > 0){
        return (
            <Button type="button" color="secondary" variant="contained" sx={{ width: 94 }} onClick={onBack}>
                Back
            </Button> 
        )
    }else return <></>
}
