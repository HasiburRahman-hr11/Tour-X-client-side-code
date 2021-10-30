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
import { OrderContext } from '../../context/OrderContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const MyOrders = () => {
    const { user } = useAuth();
    const { userOrders, setUserOrders, loading } = useContext(OrderContext);
    const { packages } = useContext(PackageContext);
    const [orderedPackages, setOrderedPackages] = useState([]);


    const handleCancelOrder = async (orderId) => {
        const agree = window.confirm('Cancel this order?');
        if (agree) {
            try {
                const { data } = await axios.delete(`http://localhost:8000/api/orders/${orderId}`);
                if (data.success) {
                    setOrderedPackages(orderedPackages.filter(pack => pack.orderId !== orderId));
                    setUserOrders(userOrders.filter(order => order._id !== orderId))
                    successNotify('Order canceled successfully.');
                } else {
                    errorNotify('Couldn\'t cancel the order');
                }
            } catch (error) {
                console.log(error);
                errorNotify('Opps, Something went wrong!');
            }
        }

    }



    useEffect(() => {

        const getOrderedPackages = (data) => {
            const ordersArray = [];
            userOrders.forEach(order => {
                if (order.package) {
                    let orderObj = {}
                    orderObj.orderedPackage = packages.find(item => item._id === order.package);
                    orderObj.orderId = order._id;
                    orderObj.status = order.status;
                    ordersArray.push(orderObj)
                }

            })
            setOrderedPackages(ordersArray)
        }

        getOrderedPackages(userOrders);

    }, [user._id, packages, userOrders])
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
                                            key={order.orderId}
                                            item
                                            sm={6}
                                            xs={12}
                                        >
                                            <div className="order_item">
                                                <div className="order_image">
                                                    <img src={order.orderedPackage.thumbnail} alt="" />
                                                </div>
                                                <div className="order_content">
                                                    <div>
                                                        <h4>
                                                            <Link to={`/packages/${order.orderedPackage._id}`}>{order.orderedPackage.title}</Link>
                                                        </h4>
                                                        <p>
                                                            <span className="order_duration">{order.orderedPackage.duration}
                                                            </span>
                                                            <span className="order_price">${order.orderedPackage.price}</span>
                                                        </p>

                                                    </div>
                                                    <div className="cancel_order">
                                                        {/* <button
                                                            className="btn btn_secondary"
                                                            title="Cancel Order"
                                                            onClick={() => handleCancelOrder(order.orderId)}
                                                        >Cancel</button> */}
                                                        <DeleteOutlineIcon
                                                            onClick={() => handleCancelOrder(order.orderId)}
                                                            className="order_action_icon"
                                                            title="Delete Order"
                                                        />
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