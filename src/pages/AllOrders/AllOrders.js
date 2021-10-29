import React, { useContext, useEffect, useState } from 'react';
import '../MyOrders/MyOrders.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import pageBannerBg from '../../images/pageBanner/my-order-page.jpg';
import { packages } from '../../fakeData';
import axios from 'axios';
import { PackageContext } from '../../context/PackageContext';

const AllOrders = () => {

    const { packages } = useContext(PackageContext);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(true);
    const [orderedPackages, setOrderedPackages] = useState([]);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/orders`);

                setOrders(data);
                getOrderedPackages(data)
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllOrders();

        const getOrderedPackages = (data) => {
            const packagesArray = [];
            for (let order of data) {
                const pack = packages.find(item => item._id === order.package);
                packagesArray.push(pack)
            }
            setOrderedPackages(packagesArray)
        }
    }, [packages])

    return (
        <div className="page my_orders">
            <PageBanner title="All Orders" bg={pageBannerBg} />
            <div className="page_content">
                <Container fixed>
                    {orderedPackages.length < 1 ? (
                        <div className="no_order">
                            <h2>No Order has been made yet.</h2>
                        </div>
                    ) : (
                        <Grid container spacing={4}>
                            {orderedPackages.map(order => (
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
                                            {/* <div className="cancel_order">
                                        <button className="btn cancel_btn">Cancel</button>
                                    </div> */}
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default AllOrders;