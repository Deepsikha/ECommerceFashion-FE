// components/Footer.tsx
'use client';
import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    TextField,
    Button,
    Snackbar,
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log('Submitted Email:', email);
        setEmail('');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: '#282c34', color: '#fff', padding: '40px 0', marginTop: '10px', zIndex: 9999, position: 'sticky' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid sx={{ width: { xs:"100%", sm:"22%" }}}>
                        <Typography variant="h6" gutterBottom>
                            Company
                        </Typography>
                        <Link href="#" color="inherit" underline="none">About Us</Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">Careers</Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">Privacy Policy</Link>
                    </Grid>
                    <Grid sx={{ width: { xs:"100%", sm:"22%" }}}>
                        <Typography variant="h6" gutterBottom>
                            Help
                        </Typography>
                        <Link href="#" color="inherit" underline="none">Contact Us</Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">FAQ</Link>
                        <br />
                        <Link href="#" color="inherit" underline="none">Shipping Info</Link>
                    </Grid>
                    <Grid sx={{ width: { xs:"100%", sm:"22%" }}}>
                        <Typography variant="h6" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                            <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
                            <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
                            <IconButton color="inherit" href="#"><InstagramIcon /></IconButton>
                            <IconButton color="inherit" href="#"><LinkedInIcon /></IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{ width: { xs:"100%", sm:"25%" }}}>
                        {/* Email Subscription Section */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                Subscribe to ECommerceFashion
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={handleEmailChange}
                                        sx={{
                                            bgcolor: '#fff',
                                            borderRadius: '4px',
                                            width: '100%',
                                            maxWidth: '300px', 
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#ccc',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#007bff',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#007bff',
                                                },
                                            },
                                        }}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            marginTop: 1,
                                            width: '100%',
                                            maxWidth: '300px',
                                            '&:hover': {
                                                backgroundColor: '#0056b3',
                                            },
                                        }}
                                    >
                                        Yes, Please!
                                    </Button>
                                </Box>
                                <Typography variant="body2" sx={{ marginTop: 1 }}>
                                    By subscribing, you agree to receive our emails. You can unsubscribe at any time.
                                </Typography>
                                <Link href="#" color="inherit" underline="none">Privacy Policy</Link>
                            </form>
                        </Box>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message="Thank you for subscribing!"
                        />
                    </Grid>

                </Grid>

                <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} ECommerceFashion. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
