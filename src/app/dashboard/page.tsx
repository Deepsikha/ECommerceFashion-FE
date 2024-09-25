'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Toolbar, Container, Typography, Paper, Grid } from '@mui/material';
import Img1 from '../../public/images/img1.jpg';
import Img2 from '../../public/images/img2.jpg';
import Img3 from '../../public/images/img3.jpg';
import Img4 from '../../public/images/img4.jpg';
import Img5 from '../../public/images/img5.jpg';
import Img6 from '../../public/images/img6.jpg';
import Img7 from '../../public/images/img7.jpg';
import Img8 from '../../public/images/img8.jpg';

const itemData = [
    { img: Img1, title: 'Bag1 Image', link: '/pages/Bag1', price: '$49.99' },
    { img: Img2, title: 'Bag2 Image', link: '/pages/Bag2', price: '$49.99' },
    { img: Img3, title: 'Bag3 Image', link: '/pages/Bag3', price: '$49.99' },
    { img: Img4, title: 'Bag4 Image', link: '/pages/Bag4', price: '$49.99' },
    { img: Img5, title: 'Bag5 Image', link: '/pages/Bag5', price: '$49.99' },
    { img: Img6, title: 'Bag6 Image', link: '/pages/Bag6', price: '$49.99' },
    { img: Img7, title: 'Bag7 Image', link: '/pages/Bag7', price: '$49.99' },
    { img: Img8, title: 'Bag8 Image', link: '/pages/Bag8', price: '$49.99' },
];

// TextSection Component
const TextSection: React.FC = () => (
    <Paper sx={{ marginTop: 4, padding: 3, borderRadius: 2, textAlign: 'center', maxWidth: '1000px', width: '100%', background: 'transparent', boxShadow: 'none', }}>
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
    <Paper sx={{ marginTop: 4, padding: 3, borderRadius: 2, textAlign: 'center', background: 'transparent', boxShadow:'none',  maxWidth: '1000px', width: '100%' }}>
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

    const handleImageClick = (link: string) => {
        router.push(link);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '0px', maxWidth: '1500px' }}>
            <Toolbar />
            <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0,cursor:'pointer' }}>
                <Grid container spacing={4} sx={{ width: '100%', marginBottom: 4 }}>
                    {itemData.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.title}>
                            <Box
                                onClick={() => handleImageClick(item.link)}
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: 400,
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
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: 'cover', borderRadius: '16px' }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <TextSection />
                <AdditionalTextSection />
            </Container>
        </Box>
    );
};
