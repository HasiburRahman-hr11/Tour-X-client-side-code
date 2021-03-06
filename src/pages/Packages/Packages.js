import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Package from '../../components/Package/Package';
import PageBanner from '../../components/PageBanner/PageBanner';
import Loading from '../../components/Loading/Loading';
import { PackageContext } from '../../context/PackageContext';
const Packages = () => {

    const { packages, loading } = useContext(PackageContext)
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="page packages">
                    <PageBanner title="Our Packages" bg="https://images.pexels.com/photos/3788363/pexels-photo-3788363.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
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
            )}
        </>

    );
};

export default Packages;