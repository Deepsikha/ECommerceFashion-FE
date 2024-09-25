'use client';
import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [isTCAccepted, setIsTCAccepted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            name,
            address,
            phoneNumber,
            dob,
            email,
            password,
            confirmPassword,
            rememberMe,
            isTCAccepted,
        });
        // Handle sign in or sign up logic here
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#000"
            p={3}
            borderRadius={2}
            boxShadow={3}
            color="#ffffff"
        >
            <Box display="flex" mb={3}>
                <Button
                    onClick={() => setIsSignIn(true)}
                    variant={isSignIn ? 'contained' : 'outlined'}
                    sx={{
                        mx: 1,
                        color: isSignIn ? '#000' : '#ffffff',
                        borderColor: '#ffffff',
                        bgcolor: isSignIn ? '#ffffff' : 'transparent',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    Login
                </Button>
                <Button
                    onClick={() => setIsSignIn(false)}
                    variant={!isSignIn ? 'contained' : 'outlined'}
                    sx={{
                        mx: 1,
                        color: !isSignIn ? '#000' : '#ffffff',
                        borderColor: '#ffffff',
                        bgcolor: !isSignIn ? '#ffffff' : 'transparent',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    Create Account
                </Button>
            </Box>
            <form onSubmit={handleSubmit} noValidate>
                {isSignIn ? (
                    <>
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                                    color: '#ffffff', // Text color
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#ffffff', // Label color
                                    '&.Mui-focused': {
                                        color: '#007bff', // Focused label color
                                    },
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'gray', // Placeholder color
                                    opacity: 0.7, // Placeholder opacity
                                },
                            }}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                                    color: 'gray', // Placeholder color
                                    opacity: 0.7,
                                },
                            }}
                        />
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
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <TextField
                            type="text"
                            label="Address"
                            variant="outlined"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                        <TextField
                            type="tel"
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <TextField
                            type="date"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
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
                                    '&::-webkit-calendar-picker-indicator': {
                                        filter: 'invert(1)',
                                    }
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
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isTCAccepted}
                                    onChange={() => setIsTCAccepted(!isTCAccepted)}
                                    required
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
                    </>
                )}

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#676565', '&:hover': { bgcolor: '#5a5a5a' } }}>
                    {isSignIn ? 'Login' : 'Create Account'}
                </Button>
            </form>

            <Typography variant="body2" mt={2} color="#ffffff">
                Sign in with{' '}
                <a href="https://www.example.com/login/oauth/google" style={{ color: '#007bff', textDecoration: 'none' }}>
                    Google
                </a>
            </Typography>
        </Box>
    );
};

export default SignIn;
