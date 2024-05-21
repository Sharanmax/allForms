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
    if (step > 0){
        return (
            <Button type="button" color="secondary" variant="contained" sx={{
                width: { sm: '19%' }, // Applies width starting from the sm breakpoint
                display: {
                    xs: 'none', // Hides the button on extra small screens (below 600px)
                    sm: 'block' // Displays the button on screens 600px and wider
                } }} onClick={onBack}>
                Back
            </Button> 
        )
    }else return <></>
}
