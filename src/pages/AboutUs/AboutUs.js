import React from 'react';
import './AboutUs.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import Guides from '../../components/Guides/Guides';

const AboutUs = () => {
    return (
        <div className="page about_page">
            <PageBanner title="About Us" bg="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
            <div className="page_content">
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <div className="about_us_image">
                                <img src="https://images.pexels.com/photos/842687/pexels-photo-842687.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="About Us" />
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="about_content">
                                <h4>About TourX</h4>
                                <h2>The Best Travel Agency Company.</h2>
                                <p>Fusce aliquam luctus est, eget tincidunt velit scelerisque rhoncus. Aliquam lacinia ipsum ornare, porttitor risus nec, mattis mauris. Nunc nec ornare nisi, vel elementum est. Proin malesuada venenatis ex, eu fringilla justo scelerisque sit amet. Sed fringilla nec purus non venenatis. Aliquam nec turpis pharetra, bibendum lorem in, sollicitudin nibh. Nulla sit amet lacus diam.</p>
                            </div>
                        </Grid>
                    </Grid>
                </Container>

                <Guides/>

            </div>
        </div>
    );
};

export default AboutUs;