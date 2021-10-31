import React from 'react';
import './Footer.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ToTop from '../ToTop/ToTop';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_top">
                <Container fixed>
                    <Grid container spacing={4}>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className="footer_widget">
                                <h3 className="widget_title">This is TourX</h3>
                                <div className="widget_body">
                                    <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid maxime aut ut voluptate dolorum nisi ducimus ratione</p>

                                    <div className="footer_social">
                                        <h2>Get Social</h2>
                                        <ul className="social_list">
                                            <li>
                                                <Link to="#">
                                                    <FacebookIcon />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <TwitterIcon />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <InstagramIcon />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <YouTubeIcon />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className="footer_widget">
                                <h3 className="widget_title">Contact</h3>
                                <div className="widget_body">
                                    <Link to="#">A: Via Venti Settembre, Ireland</Link>
                                    <Link to="#">P: +31 555 777 83</Link>
                                    <Link to="#">App: Viber, WhatsApp</Link>
                                    <Link to="#">E: kamperen@qode.com</Link>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className="footer_widget">
                                <h3 className="widget_title">Links</h3>
                                <div className="widget_body">
                                    <ul>
                                        <li>
                                            <Link to="/about">About Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/contact">Contact Us</Link>
                                        </li>
                                        <li>
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/my-orders">My Orders</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={3} sm={6} xs={12}>
                            <div className="footer_widget">
                                <h3 className="widget_title">Newsletter</h3>
                                <div className="widget_body">
                                    <p>Sign up for our newsletter and get updated about our latest promotions</p>
                                    <div className="newslatter_box">
                                        <input type="email" placeholder="Your Email" />
                                        <button>
                                            <ArrowRightAltIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div className="fooetr_bottom">
                <div className="footer_bottom_content">
                    <p>© 2021 HR Hasib, All Rights Reserved</p>
                </div>
            </div>
            <ToTop/>
        </footer>
    );
};

export default Footer;