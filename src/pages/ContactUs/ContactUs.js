import React from 'react';
import './ContactUs.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';

const ContactUs = () => {
    return (
        <div className="page contact_page">
            <PageBanner title="Contact Us" bg="https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
            <div className="page_content">
                <Container>
                    <Grid container spacing={4}>
                        <Grid item md={6} xs={12}>
                            <div className="contact_form_wrapper">
                                <h2 className="contact_form_title">Contact Us</h2>
                                <form action="" className="contact_form">
                                    <div className="input_group">
                                        <input
                                            type="text"
                                            className="form_control"
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div className="input_group">
                                        <input
                                            type="email"
                                            className="form_control"
                                            placeholder="Email Address"
                                        />
                                    </div>
                                    <div className="input_group">
                                        <input
                                            type="text"
                                            className="form_control"
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="input_group">
                                        <textarea
                                            className="form_control"
                                            placeholder="Message"
                                        />
                                    </div>

                                    <div>
                                        <button className="btn btn_primary">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="contact_content">
                                <div>
                                    <h2>Need help?</h2>
                                    <p>Donec vel quam vitae nisl posuere efficitur. Suspendisse eget lectus est. Pellentesque vitae maximus turpis. Morbi sodales vestibulum lorem a ultricies. Pellentesque id dignissim leo. Quisque porta eros nunc, non sodales tellus feugiat nec. Quisque sed pulvinar nulla. Donec viverra nisl non sem bibendum, et ullamcorper est mattis. Praesent posuere dui sit amet condimentum dignissim. Pellentesque quis nunc at erat.</p>
                                </div>

                                <Grid container spacing={3} sx={{
                                    marginTop: '20px'
                                }}>
                                    <Grid item sm={6} xs={12}>
                                        <div className="contact_address">
                                            <h2>London</h2>
                                            <p>
                                                <a href="https://www.google.com/maps/dir//11a+Dacre+St,+Westminster,+London+SW1H,+UK/@51.4990139,-0.1372977,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x487604dc77a6cfcb:0x5aff173f963f4b28!2m2!1d-0.1329203!2d51.499014?_ga=2.50848623.792297434.1635615560-361194678.1635615560">8 Carlton Gardens, St. James, London, United Kingdom</a>
                                            </p>
                                            <p>
                                                <span>Phone: </span>
                                                <a href="tel:+8801303606467">88 (0) 101 0000 000</a>
                                            </p>
                                            <p>
                                                <span>Email: </span>
                                                <a href="mailto:tourxhelp@gmail.com">tourxhelp@gmail.com</a>
                                            </p>
                                        </div>
                                    </Grid>

                                    <Grid item sm={6} xs={12}>
                                        <div className="contact_address">
                                            <h2>New York</h2>
                                            <p>
                                                <a href="https://www.google.com/maps/place/487+8th+Ave,+New+York,+NY+10001,+USA/@40.7520104,-73.9944035,17.5z/data=!4m5!3m4!1s0x89c259adc21c3015:0x2600e29999851411!8m2!3d40.7526402!4d-73.9931291?_ga=2.120619086.792297434.1635615560-361194678.1635615560">487 8th Avenue, Suite 721, New York NY 10010</a>
                                            </p>
                                            <p>
                                                <span>Phone: </span>
                                                <a href="tel:+8801303606467">88 (0) 101 0000 000</a>
                                            </p>
                                            <p>
                                                <span>Email: </span>
                                                <a href="mailto:tourxhelp@gmail.com">tourxhelp@gmail.com</a>
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default ContactUs;