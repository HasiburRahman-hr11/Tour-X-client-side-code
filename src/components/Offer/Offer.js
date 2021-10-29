import React from 'react';
import './Offer.css';
import Grid from '@mui/material/Grid';
import offerImg from '../../images/offer.jpg';
import { Link } from 'react-router-dom';

const Offer = () => {
    return (
        <section className="offer_section">
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div className="offer_img">
                        <img src={offerImg} alt="" />
                    </div>
                </Grid>
                <Grid item md={6} xs={12}>
                    <div className="offer_content">
                        <div>
                            <h1>Beach Camp</h1>
                            <h4>with 50% discount</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil blanditiis culpa animi a facere minima perspiciatis at aliquid atque fugiat facilis, iste explicabo quidem distinctio incidunt repellendus? Consequuntur debitis deleniti magnam? Qui quos, ipsum dolores voluptates ut ipsam. Esse consectetur deleniti laboriosam, qui quaerat quam architecto blanditiis? Repudiandae impedit voluptatem ipsam eius, corrupti nisi.</p>
                            <Link to="/packages" className="btn btn_primary">See More</Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </section>
    );
};

export default Offer;