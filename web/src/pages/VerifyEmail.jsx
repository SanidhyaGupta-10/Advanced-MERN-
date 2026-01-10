import { motion } from "framer-motion"
import { use, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const VerifyEmail = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const {error, isLoading, verifyEmail} = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code]

        // HandlePasted Content

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);


            // Focus on the last non-empty input or the first empty onKeyDown
            const lastFilledIndex = newCode.findIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        }
        else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }

        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        
        try{
            const res = await verifyEmail(verificationCode);
            navigate('/');
            toast.success('Email verified successfully');
            console.log(res)
        } catch(error){
            console.log(error)
        }
    }


    // Auto Submit when all fields are lastFilledIndex
    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event('submit'))
        }
    }, [code])

    return (
        <>
            <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
                >
                    <div className="p-8">
                        <h2
                            className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-green-400  to bg-emerald-500 text-transparent bg-clip-text"
                        >
                            Verify-Email
                        </h2>
                        <p className="text-center text-gray-300 mb-6">
                            Enter the 6-digit code sent to your email address.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center space-x-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    maxLength='6'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"
                                />
                            ))}
                        </div>
                        <motion.button
                            className="mt-5 mb-5 ml-10  w-[80%] mx-auto py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600
        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-50 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 "
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="w-6 h-6 mx-auto animate-spin" /> : "Verify Email"}
                        </motion.button>
                    </form>

                </motion.div>
            </div>
        </>
    )
}

export default VerifyEmail