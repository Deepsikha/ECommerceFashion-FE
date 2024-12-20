'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Link as MuiLink, Toolbar, Container, Typography, Paper, Button } from '@mui/material';
import Grid from "@mui/material/Grid2";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashImag1 from '../../../public/images/dash1.jpg';
import DashImag2 from '../../../public/images/dash2.jpg';
import DashImag3 from '../../../public/images/dash3.jpg';
import DashImag4 from '../../../public/images/dash4.jpg';
import DashImag5 from '../../../public/images/dash5.jpg';
import DashImag6 from '../../../public/images/dash6.jpg';
import { useScreenSize } from '@/hooks/useScreenSize';
import MoonLoader from 'react-spinners/MoonLoader';

const itemData = [
    { img: '/images/img1.jpg', title: 'Bag1 Image', link: '/pages/Product1', price: '$49.99' },
    { img: '/images/img2.jpg', title: 'Bag2 Image', link: '/pages/Product2', price: '$49.99' },
    { img: '/images/img3.jpg', title: 'Bag3 Image', link: '/pages/Product3', price: '$49.99' },
    { img: '/images/img4.jpg', title: 'Bag4 Image', link: '/pages/Product4', price: '$49.99' },
    { img: '/images/img5.jpg', title: 'Bag5 Image', link: '/pages/Product5', price: '$49.99' },
    { img: '/images/img6.jpg', title: 'Bag6 Image', link: '/pages/Product6', price: '$49.99' },
    { img: '/images/img7.jpg', title: 'Bag7 Image', link: '/pages/Product7', price: '$49.99' },
    { img: '/images/img8.jpg', title: 'Bag8 Image', link: '/pages/Product8', price: '$49.99' },
];

// TextSection Component
const TextSection: React.FC = () => (
    <Paper sx={{ marginTop: 4, padding: 3, borderRadius: 2, alignItems: 'center', textAlign: 'center', maxWidth: '1000px', width: '100%', background: 'transparent', boxShadow: 'none' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#333' }}>
            Explore Our Exclusive Women&apos;s Bags
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
            Discover the perfect blend of style and functionality with our curated collection of women&apos;s bags.
            Whether you are looking for a chic handbag, a trendy backpack, or an elegant evening clutch,
            we have something for every occasion. Elevate your wardrobe and make a statement with our
            exclusive designs that combine quality and sophistication.
        </Typography>
    </Paper>
);

// AdditionalTextSection Component
const AdditionalTextSection: React.FC = () => (
    <Paper sx={{ marginTop: 4, padding: 3, borderRadius: 2, textAlign: 'center', background: 'transparent', boxShadow: 'none', maxWidth: '1000px', width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#333' }}>
            Why Choose Us?
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
            Our bags are crafted with precision and care, using only the finest materials. We prioritize both
            style and durability, ensuring that your bag is not only a fashion statement but also a practical
            accessory for your daily life. Join countless satisfied customers who trust us for their fashion needs!
        </Typography>
    </Paper>
);

// Dashboard Component
export const Dashboard: React.FC = () => {
    const router = useRouter();
    const itemsPerPage = 4;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { isMobile } = useScreenSize();

    const handleLinkClick = () => {
        setIsLoading(true);
    };

    const handleImageClick = (link: string) => {
        router.push(link);
    };

    const handleNext = () => {
        if (currentIndex + itemsPerPage < itemData.length) {
            setCurrentIndex((prev) => prev + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - itemsPerPage);
        }
    };

    return (
        <>
            <Box sx={{ position: 'relative', width: '100%', height: '1500px', overflow: 'hidden', cursor: 'pointer' }}>
                <MuiLink href={"/categories"} onClick={handleLinkClick}>
                    <Image
                        src={DashImag1}
                        alt="Dashboard Background"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </MuiLink>
            </Box>

            {/* Centered Text Section */}
            <Box sx={{ textAlign: 'center', marginTop: 2, padding: 2 }}>
                <Typography variant="h4" sx={{ color: '#333', fontWeight: 'bold' }}>
                    Embrace the New
                </Typography>
                <Typography variant="h5" sx={{ color: '#555', marginTop: 1 }}>
                    Timeless Pastel Blues, Luxurious Metallic Leather and Elevated Essentials for Eye-Catching Autumn Styling
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px',
                maxWidth: '2000px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Toolbar />
                <Container maxWidth="xl" sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 0,
                    cursor: 'pointer'
                }}>
                    <Grid container spacing={4} sx={{ width: '100%', marginBottom: 4, alignItems: 'center' }}>
                        {/* Navigation Buttons */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '1500px',
                            marginBottom: 4
                        }}>
                            <Button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                sx={{ flex: 1, marginRight: 2 }}
                            >
                                <ArrowBackIosIcon />
                            </Button>

                            <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        transition: 'transform 0.5s ease',
                                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                                        width: `${(itemData.length / itemsPerPage) * 100}%`,
                                    }}
                                >
                                    {itemData.map((item) => (
                                        <Grid key={item.title} sx={{ width: { xs: '100%', sm: '50%', md: '25%', }, flexShrink: 0 }}>
                                            <Box
                                                onClick={() => handleImageClick(item.link)}
                                                sx={{
                                                    position: 'relative',
                                                    width: '90%',
                                                    height: 300,
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                                                    },
                                                }}
                                            >
                                                <MuiLink href={"/categories"} onClick={handleLinkClick}>
                                                    <Image
                                                        src={item.img}
                                                        alt={item.title}
                                                        fill
                                                        style={{ objectFit: 'cover', borderRadius: '16px' }}
                                                    />
                                                </MuiLink>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Box>
                            </Box>

                            <Button
                                onClick={handleNext}
                                disabled={currentIndex + itemsPerPage >= itemData.length}
                                sx={{ flex: 1, marginLeft: 2 }}
                            >
                                <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', height: '100vh', overflow: 'hidden' }}>
                {/* First Image */}
                <Box sx={{ position: 'relative', width: { xs: '100%', sm: '50%' }, height: { xs: '50vh', sm: '100%' } }}>
                    <MuiLink href={"/categories"} onClick={handleLinkClick}>
                        <Image
                            src={DashImag2}
                            alt="Image 2"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                cursor: 'pointer',
                                transition: 'opacity 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ color: 'white' }}>
                                The Sack Bag
                            </Typography>
                        </Box>
                    </MuiLink>
                </Box>

                {/* Second Image */}
                <Box sx={{ position: 'relative', width: { xs: '100%', sm: '50%' }, height: { xs: '50vh', sm: '100%' } }}>
                    <MuiLink href={"/categories"} onClick={handleLinkClick}>
                        <Image
                            src={DashImag3}
                            alt="Image 3"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                cursor: 'pointer',
                                transition: 'opacity 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ color: 'white' }}>
                                Bags
                            </Typography>
                        </Box>
                    </MuiLink>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', height: '100vh', overflow: 'hidden' }}>
                <Box sx={{ position: 'relative', width: { xs: '100%', sm: '50%' }, height: { xs: '50vh', sm: '100%' } }}>
                    <MuiLink href={"/categories"} onClick={handleLinkClick}>
                        <Image
                            src={DashImag4}
                            alt="Image 4"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                cursor: 'pointer',
                                transition: 'opacity 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ color: 'white' }}>
                                The Fashion Collection
                            </Typography>
                        </Box>
                    </MuiLink>
                </Box>

                <Box sx={{ position: 'relative', width: { xs: '100%', sm: '50%' }, height: { xs: '50vh', sm: '100%' } }}>
                    <MuiLink href={"/categories"} onClick={handleLinkClick}>
                        <Image
                            src={DashImag5}
                            alt="Image 5"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                cursor: 'pointer',
                                transition: 'opacity 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography variant="h4" sx={{ color: 'white' }}>
                                Mini Bags
                            </Typography>
                        </Box>
                    </MuiLink>
                </Box>
            </Box>

            <Box sx={{ position: 'relative', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', height: { xs: '50vh', sm: '1100px' }, overflow: 'hidden' }}>
                <MuiLink href={"/categories"} onClick={handleLinkClick}>
                    <Image
                        src={DashImag6}
                        alt="Dashboard Background"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            cursor: 'pointer',
                            transition: 'opacity 0.3s ease',
                            '&:hover': {
                                opacity: 1,
                            },
                        }}
                    >
                        <Typography variant="h4" sx={{ color: 'white' }}>
                            Goggles & Bags
                        </Typography>
                    </Box>
                </MuiLink>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '300px',
                maxWidth: '2000px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Toolbar />
                <Container maxWidth="xl" sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 0,
                    cursor: 'pointer'
                }}>
                    <Grid container spacing={4} sx={{ width: '100%', marginBottom: 4, alignItems: 'center' }}>
                        {/* Navigation Buttons */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '1500px',
                            marginBottom: 4
                        }}>
                            <Button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                sx={{ flex: 1, marginRight: 2 }}
                            >
                                <ArrowBackIosIcon />
                            </Button>

                            <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        transition: 'transform 0.5s ease',
                                        transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                                        width: `${(itemData.length / itemsPerPage) * 100}%`,
                                    }}
                                >
                                    {itemData.map((item) => (
                                        <Grid key={item.title} sx={{ width: { xs: '100%', sm: '50%', md: '25%', }, flexShrink: 0 }}>
                                            <Box
                                                onClick={() => handleImageClick(item.link)}
                                                sx={{
                                                    position: 'relative',
                                                    width: '90%',
                                                    height: 300,
                                                    borderRadius: '16px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                                                    },
                                                }}
                                            >
                                                <MuiLink href={"/categories"} onClick={handleLinkClick}>
                                                    <Image
                                                        src={item.img}
                                                        alt={item.title}
                                                        fill
                                                        style={{ objectFit: 'cover', borderRadius: '16px' }}
                                                    />
                                                </MuiLink>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Box>
                            </Box>

                            <Button
                                onClick={handleNext}
                                disabled={currentIndex + itemsPerPage >= itemData.length}
                                sx={{ flex: 1, marginLeft: 2 }}
                            >
                                <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '400px',
                maxWidth: '2000px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextSection />
                <AdditionalTextSection />
            </Box>

            {/* Loader Overlay */}
            {isLoading && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "64px",
                        left: 0,
                        width: "100vw",
                        height: `calc(100vh - 64px)`,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MoonLoader color="#000" loading={isLoading} size={50} />
                </Box>
            )}
        </>
    );
};
