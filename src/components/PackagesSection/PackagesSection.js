import React, { useContext } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Package from '../Package/Package';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { PackageContext } from '../../context/PackageContext';

const PackagesSection = () => {

    const { packages, loading } = useContext(PackageContext)
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <section className="packages_section section">
                    <Container fixed spacing={4}>
                        <div className="section_header">
                            <p>Choose Your Package</p>
                            <h2>Select Your Best Package For Your Travel</h2>
                        </div>
                        <div className="section_content">
                            <Grid container spacing={4}>
                                {packages.slice(0 , 6).map(item => (
                                    <Grid item md={4} sm={6} xs={12} key={item._id}>
                                        <Package data={item} />
                                    </Grid>
                                ))}
                            </Grid>

                            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                                <Link to="/packages" className="btn btn_primary">More Package</Link>
                            </div>
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
};

export default PackagesSection;