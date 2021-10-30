import React from 'react';
import './ContactUs.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';

const ContactUs = () => {
    return (
        <div className="page contact_page">
            <PageBanner title="Contact Us" />
            <div className="page_content">
                <Container>

                </Container>
            </div>
        </div>
    );
};

export default ContactUs;