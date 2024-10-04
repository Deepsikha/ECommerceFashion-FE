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
import { useScreenSize } from '@/hooks/useScreenSize';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const { isMobile } = useScreenSize(); 

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setEmail('');
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ backgroundColor: '#1f1f1f', color: '#fff', padding: '60px 0', zIndex: 9999, marginTop: 'auto', }}>
            <Container maxWidth="xl">
                <Grid container spacing={6}>
                    <Grid size={{xs:12,sm:3}}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Company
                        </Typography>
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">About Us</Link><br />
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">Careers</Link><br />
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">Privacy Policy</Link>
                    </Grid>

                    <Grid size={{xs:12,sm:3}}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Help
                        </Typography>
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">Contact Us</Link><br />
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">FAQ</Link><br />
                        <Link href="#" color="inherit" sx={{ "&:hover": {color:"#a39e9e"}}} underline="hover">Shipping Info</Link>
                    </Grid>

                    <Grid size={{xs:12,sm:3}}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <IconButton color="inherit" href="#" sx={{ '&:hover': { color: '#3b5998' } }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ '&:hover': { color: '#1da1f2' } }}>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ '&:hover': { color: '#c32aa3' } }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" href="#" sx={{ '&:hover': { color: '#0077b5' } }}>
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid size={{xs:12,sm:3}}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: isMobile ? 'center' : 'left' }}>
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
                                        backgroundColor: '#007bff',
                                        '&:hover': {
                                            backgroundColor: '#0056b3',
                                        },
                                    }}
                                >
                                    Yes, Please!
                                </Button>
                            </Box>
                            <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center' }}>
                                By subscribing, you agree to receive our emails. You can unsubscribe at any time.
                            </Typography>
                            <Link href="#" color="info" underline="none" sx={{ display: 'block', textAlign: 'center', marginTop: '8px', "&:hover": {color:"#a39e9e"} }}>
                                Privacy Policy
                            </Link>
                        </form>
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={handleCloseSnackbar}
                            message="Thank you for subscribing!"
                        />
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #444', paddingTop: '20px' }}>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} ECommerceFashion. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
