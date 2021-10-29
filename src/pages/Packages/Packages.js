import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { packages } from '../../fakeData';
import Package from '../../components/Package/Package';
import PageBanner from '../../components/PageBanner/PageBanner';
import pageBannerBg from '../../images/banner1.jpg';

const Packages = () => {
    return (
        <div className="page packages">
            <PageBanner title="Our Packages" bg={pageBannerBg} />
            <div className="page_content">
                <Container fixed>
                    <Grid container spacing={4}>
                        {packages.map(item => (
                            <Grid item md={4} sm={6} xs={12} key={item._id}>
                                <Package data={item} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default Packages;