import React from 'react';
import Box from '@mui/material/Box';
const PageBanner = ({ bg, title }) => {
    return (
        <Box component="div" className="page_banner" sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0,0, 0.5)), url(${bg})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            padding: '50px 0',
            minHeight: {
                md: '370px',
                sm: '250px',
                xs: '200px'
            },
            color: '#fff'
        }}>
            <Box component="div">
                <Box component="h2" sx={{
                    fontSize: {
                        md: '38px',
                        sm: '27px',
                        xs: '22px'
                    },
                    textTransform: 'capitalize',
                    fontWeight: 'bold'
                }}>
                    {title}
                </Box>
            </Box>
        </Box >
    );
};

export default PageBanner;