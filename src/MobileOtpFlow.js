import React, {useState} from "react";
import MobileNumberForm from './MobileForm'
import VerifyOTP from "./OtpForm";

const OtpRegistrationFlow = () => {
    const [showOtp, setShowOtp] = useState(false)

    const handleShowOtp = () => {
        setShowOtp(true)
    }
    const hideOtp = () => {
        setShowOtp(false)
    }

   return(
       showOtp ? <VerifyOTP onBack={hideOtp}/> : <MobileNumberForm callback={handleShowOtp}/>
   )
}

export default OtpRegistrationFlow;