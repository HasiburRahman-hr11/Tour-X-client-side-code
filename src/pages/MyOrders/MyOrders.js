import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyOrders.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import pageBannerBg from '../../images/pageBanner/my-order-page.jpg';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { errorNotify, successNotify } from '../../utils/toastify';
import Loading from '../../components/Loading/Loading';
import { PackageContext } from '../../context/PackageContext';
import useOrders from '../../hooks/useOrders';


const MyOrders = () => {
    const { user } = useAuth();
    const { orders, setOrders, loading } = useOrders();
    const { packages } = useContext(PackageContext);
    const [orderedPackages, setOrderedPackages] = useState([]);


    const handleCancelOrder = async (orderId) => {
        const agree = window.confirm('Are you sure?');
        if (agree) {
            try {
                const { data } = await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
                if (data.success) {
                    setOrderedPackages(orderedPackages.filter(pack => pack.orderId !== orderId));
                    setOrders(orders.filter(order => order._id !== orderId))
                    successNotify('Order deleted successfully.');
                } else {
                    errorNotify('Couldn\'t delete the order');
                }
            } catch (error) {
                console.log(error);
                errorNotify('Opps, Something went wrong!');
            }
        }

    }



    useEffect(() => {
        // const getUsersOrder = async () => {
        //     try {
        //         const { data } = await axios.get(`http://localhost:8000/api/orders/${user._id}`);

        //         setOrders(data);
        //         getOrderedPackages(data)
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //         setLoading(false);
        //     }
        // }
        // getUsersOrder();

        const getOrderedPackages = (data) => {
            const packagesArray = [];
            for (let order of data) {
                const pack = packages.find(item => item._id === order.package);
                if (pack) {
                    pack.orderId = order._id;
                    if (!packagesArray.includes(pack)) {
                        packagesArray.push(pack)
                    }
                }

            }
            setOrderedPackages(packagesArray)
        }

        getOrderedPackages(orders);

    }, [user._id, packages, orders])
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="page my_orders">
                    <PageBanner title="My Orders" bg={pageBannerBg} />
                    <div className="page_content">
                        <Container fixed>
                            {orderedPackages.length < 1 ? (
                                <div className="no_order">
                                    <h2>Your order list is empty</h2>
                                    <Link to="/packages" className="btn btn_primary">Book a Package</Link>
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
                                                    <div className="cancel_order">
                                                        <button
                                                            className="btn btn_secondary"
                                                            title="Cancel Order"
                                                            onClick={() => handleCancelOrder(order.orderId)}
                                                        >Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Container>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyOrders;