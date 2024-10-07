'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface DynamicBreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function CustomBreadcrumbs({ items }: DynamicBreadcrumbsProps) {
    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "0 0 25px 105px" }}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return isLast ? (
                        <Typography key={item.label} color="text.primary">
                            {item.label}
                        </Typography>
                    ) : (
                        <Link
                            key={item.label}
                            underline="hover"
                            color="inherit"
                            href={item.href}
                            sx={{ "&:hover": {
                                color:"#000",
                              },}}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
}
