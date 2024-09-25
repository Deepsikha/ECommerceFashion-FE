// /pages/bags/Bags.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageParams {
    params : {
        bagId:string;
    };
}

const Bags: React.FC<PageParams> = ({params}:{params:{bagId:string}}) => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4">{params.bagId}</Typography>
            {/* Add more details about Bag 1 here */}
        </Box>
    );
};

export default Bags;
