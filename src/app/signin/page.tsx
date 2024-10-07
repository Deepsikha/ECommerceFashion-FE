'use client';
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { SignInSchema, SignUpSchema } from '@/schema';
import { useDispatch } from 'react-redux';
import { signInUser, signUpUser } from '@/store/userSlice';
import { SignUpValues } from '@/interface';
import { ToastError, ToastSuccess } from '@/components/ToastMessage';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const initialValues: SignUpValues & { confirmPassword: string } = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    address: "",
    phoneNumber: "",
    isTnCApplied: false,
    confirmPassword: ""
}

interface SignInProps {
    onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const dispatch = useDispatch<any>()
    const route = useRouter()

    const validationSchema = isSignIn ? SignInSchema : SignUpSchema;
    const { values, errors, touched, setErrors, handleChange, setFieldValue, handleSubmit, resetForm } = useFormik<SignUpValues>({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values: SignUpValues) => {

            try {
                if (isSignIn) {
                    const response = await dispatch(signInUser({ ...values }))
                    if (response.payload.token) {
                        onClose();
                        route.push("/");
                    }
                }
                else {
                    if (!values.isTnCApplied) {
                        ToastError("Please checked the Terms & Conditions");
                        return;
                    }
                    const response = await dispatch(signUpUser({ ...values }))
                    if (response.payload?.success) {
                        ToastSuccess(response.payload?.message);
                        onClose();
                        route.replace("/");
                    } else if (response.error?.message) {
                        ToastError(response.error?.message || "An error occurred.");
                    }
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error:', error.response?.data || error.message);
                } else {
                    console.error('Unexpected Error:', error);
                }
            }
        }
    })

    const handleLoginRegister = (isSignIn: boolean) => {
        setErrors({});
        resetForm();
        setIsSignIn(isSignIn);
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight='calc(100% - 90px)'
            bgcolor="#000"
            p={3}
            borderRadius={2}
            boxShadow={3}
            color="#ffffff"
        >
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <Button
                    onClick={() => handleLoginRegister(true)}
                    variant={isSignIn ? 'contained' : 'outlined'}
                    sx={{
                        mx: 1,
                        color: isSignIn ? '#000' : '#ffffff',
                        borderColor: '#ffffff',
                        bgcolor: isSignIn ? '#ffffff' : 'transparent',
                        '&:hover': {
                            bgcolor: '#a5a5a5',
                        },
                    }}
                >
                    Login
                </Button>
                <Button
                    onClick={() => handleLoginRegister(false)}
                    variant={!isSignIn ? 'contained' : 'outlined'}
                    sx={{
                        mx: 1,
                        color: !isSignIn ? '#000' : '#ffffff',
                        borderColor: '#ffffff',
                        bgcolor: !isSignIn ? '#ffffff' : 'transparent',
                        '&:hover': {
                            bgcolor: '#a5a5a5',
                        },
                    }}
                >
                    Create Account
                </Button>
            </Box>

            <form

                onSubmit={handleSubmit} noValidate>
                <div style={{
                    maxHeight: 'calc(100vh - 350px)',
                    overflow: 'auto',
                }}>
                    {isSignIn ? (
                        <>

                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={values.emailAddress}
                                name="emailAddress"
                                id="emailAddress"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.emailAddress && touched.emailAddress ? (
                                <p className="text-red">{errors.emailAddress}</p>
                            ) : null}
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={values.password}
                                name="password"
                                id="password"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-red">{errors.password}</p>
                            ) : null}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                        sx={{
                                            color: '#ffffff',
                                            '&.Mui-checked': {
                                                color: '#007bff',
                                            },
                                        }}
                                    />
                                }
                                label="Remember Me"
                                sx={{ color: '#ffffff' }}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                type="text"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={values.firstName}
                                name="firstName"
                                id="firstName"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.firstName && touched.firstName ? (
                                <p className="text-red">{errors.firstName}</p>
                            ) : null}
                            <TextField
                                type="text"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={values.lastName}
                                name="lastName"
                                id="lastName"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.lastName && touched.lastName ? (
                                <p className="text-red">{errors.lastName}</p>
                            ) : null}
                            <TextField
                                type="text"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={values.address}
                                name="address"
                                id="address"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.address && touched.address ? (
                                <p className="text-red">{errors.address}</p>
                            ) : null}
                            <TextField
                                type="tel"
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={values.phoneNumber}
                                name="phoneNumber"
                                id="phoneNumber"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <p className="text-red">{errors.phoneNumber}</p>
                            ) : null}
                            <TextField
                                type="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={values.emailAddress}
                                name="emailAddress"
                                id="emailAddress"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.emailAddress && touched.emailAddress ? (
                                <p className="text-red">{errors.emailAddress}</p>
                            ) : null}
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={values.password}
                                name="password"
                                id="password"
                                onChange={handleChange}
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-red">{errors.password}</p>
                            ) : null}
                            <TextField
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                sx={{
                                    mb: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: '#ffffff',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: '#007bff',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'gray',
                                        opacity: 0.7,
                                    },
                                }}
                            />

                        </>
                    )}
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={values.isTnCApplied}
                            onChange={handleChange}
                            required
                            name="isTnCApplied"
                            id="isTnCApplied"
                            sx={{
                                color: '#ffffff',
                                '&.Mui-checked': {
                                    color: '#007bff',
                                },
                            }}
                        />
                    }
                    label="I accept the Terms & Conditions"
                    sx={{ color: '#ffffff' }}
                />
                <Button id='btnsubmit' type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#676565', '&:hover': { bgcolor: '#5a5a5a' } }}
                    disabled={isSignIn ? false : !values.isTnCApplied}>
                    {isSignIn ? 'Login' : 'Create Account'}
                </Button>
            </form>

        </Box>
    );
};

export default SignIn;
