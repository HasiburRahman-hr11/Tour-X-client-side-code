import React from 'react';
import './MyOrders.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import pageBannerBg from '../../images/pageBanner/my-order-page.jpg';
import { packages } from '../../fakeData';

const MyOrders = () => {
    return (
        <div className="page my_orders">
            <PageBanner title="My Orders" bg={pageBannerBg} />
            <div className="page_content">
                <Container fixed>
                    <Grid container spacing={4}>
                        {packages.map(order => (
                            <Grid
                                key={order._id}
                                item
                                sm={6}
                                xs={12}
                            >
                                <div className="order_item">
                                    <div className="order_image">
                                        <img src={order.thumbnail} alt="" />
                                    </div>
                                    <div className="order_content">
                                        <div>
                                            <h4>{order.title}</h4>
                                            <p>
                                                <span className="order_duration">{order.duration}
                                                </span>
                                                <span className="order_price">${order.price}</span>
                                            </p>

                                        </div>
                                        <div className="cancel_order">
                                            <button className="btn btn_secondary" title="Cancel Order">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default MyOrders;