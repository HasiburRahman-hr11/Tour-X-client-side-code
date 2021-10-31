import React, { useContext, useEffect, useState } from 'react';
import '../MyOrders/MyOrders.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import pageBannerBg from '../../images/pageBanner/my-order-page.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PackageContext } from '../../context/PackageContext';
import { OrderContext } from '../../context/OrderContext';
import Loading from '../../components/Loading/Loading';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { errorNotify, successNotify } from '../../utils/toastify';


const AllOrders = () => {

    const { orders, loading, userOrders, setUserOrders , setOrders } = useContext(OrderContext);
    const { packages } = useContext(PackageContext);
    const [orderedPackages, setOrderedPackages] = useState([]);



    const handleCancelOrder = async (orderId) => {
        const agree = window.confirm('Delete this order?');
        if (agree) {
            try {
                const { data } = await axios.delete(`https://tour-x-travel-package-api.herokuapp.com/api/orders/${orderId}`);
                if (data.success) {
                    setOrders(orders.filter(order => order._id !== orderId))
                    setUserOrders(userOrders.filter(order => order._id !== orderId))
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

        const getOrderedPackages = () => {
            const ordersArray = [];
            orders.forEach(order => {
                if (order.package) {
                    let orderObj = {}
                    let orderedPackage = packages.find(item => item._id === order.package);
                    orderObj.orderedPackage = orderedPackage || {}
                    orderObj.orderId = order._id;
                    orderObj.bookedBy = order.name;
                    orderObj.status = order.status;
                    ordersArray.push(orderObj)
                }

            })
            setOrderedPackages(ordersArray)
        }
        getOrderedPackages()
    }, [packages, orders])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
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
                                    {orderedPackages.map((order, index) => (
                                        <Grid
                                            key={order.orderId}
                                            item
                                            sm={6}
                                            xs={12}
                                        >
                                            <div className="order_item">
                                                {order?.orderedPackage?.thumbnail && (
                                                    <div className="order_image">
                                                        <img src={order?.orderedPackage?.thumbnail} alt="" />
                                                    </div>
                                                )}

                                                <div className="order_content">
                                                    {order?.orderedPackage?.title ? (
                                                        <div>
                                                            <h4>
                                                                <Link to={`/packages/${order.orderedPackage._id}`}>{order.orderedPackage.title}</Link>
                                                            </h4>
                                                            <p>
                                                                <span className="order_duration">{order.orderedPackage.duration}
                                                                </span>
                                                                <span className="order_price">${order.orderedPackage.price}</span>
                                                            </p>
                                                            <p className="order_bookedBy">
                                                                Booked by: <strong>{order.bookedBy}</strong>
                                                            </p>

                                                        </div>
                                                    ) : (
                                                        <div className="no_order_package">
                                                            <h3>Ordered Package Not Found!</h3>
                                                        </div>
                                                    )}

                                                    <div className="cancel_order">
                                                        <p className="order_status">{order.status}</p>
                                                        <p className="order_actions">
                                                            <DeleteOutlineIcon
                                                                onClick={() => handleCancelOrder(order.orderId)}
                                                                className="order_action_icon"
                                                                title="Delete Order"
                                                            />
                                                            <Link to={`/edit-order/${order.orderId}`}>
                                                                <EditIcon className="order_action_icon" />
                                                            </Link>
                                                        </p>
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

export default AllOrders;