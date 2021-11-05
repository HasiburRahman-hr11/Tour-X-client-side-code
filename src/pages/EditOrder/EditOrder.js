import React, { useContext, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { errorNotify, successNotify } from '../../utils/toastify';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { OrderContext } from '../../context/OrderContext';

const EditOrder = () => {

    const history = useHistory();
    const { orderId } = useParams();
    const { orders, setOrders } = useContext(OrderContext);

    const [orderData, setOrderData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        date: '',
        message: '',
        status: '',
    });

    const [loadingOrder, setLoadingOrder] = useState(true);
    const [loading, setLoading] = useState(false);


    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const { data } = await axios.put(`http://localhost:8000/api/orders/${orderId}`, orderData);

            const prevOrders = orders.filter(order => order._id !== orderId);

            setOrders([...prevOrders, data])

            setLoading(false);
            successNotify('Order Updated Successfully.');
            history.push('/all-orders');
        } catch (error) {
            console.log(error);
            setLoading(false);
            errorNotify('Opps, Something went wrong!')
        }

    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/orders/${orderId}`);

                if (data._id) {
                    setOrderData({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        date: data.date,
                        message: data.message,
                        status: data.status
                    })
                    setLoadingOrder(false);
                }
            } catch (error) {
                console.log(error);
                setLoadingOrder(false);
            }
        }
        fetchOrder()
    }, [orderId]);
    return (
        <>
            {loadingOrder ? (
                <Loading />
            ) : (
                <div className="page edit_order">
                    <Container fixed>
                        <div className="page_content">
                            <Box component={Paper}>
                                <div className="package_booking_wrapper">
                                    <h2>Edit Order</h2>
                                    <form
                                        action=""
                                        className="package_booking_form"
                                        onSubmit={handleUpdateOrder}
                                    >

                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="input_group">
                                                    <label htmlFor="name" className="form_control_label">Ordered By</label>
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Name"
                                                        name="name"
                                                        id="name"
                                                        value={orderData.name}
                                                        onChange={(e) => setOrderData({ ...orderData, name: e.target.value })}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="input_group">
                                                    <label htmlFor="email" className="form_control_label">Customer's Email</label>
                                                    <input
                                                        type="email"
                                                        className="form_control"
                                                        placeholder="Email Address"
                                                        name="email"
                                                        id="email"
                                                        value={orderData.email}
                                                        onChange={(e) => setOrderData({ ...orderData, email: e.target.value })}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="input_group">
                                                    <label htmlFor="phone" className="form_control_label">Customer's Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="form_control"
                                                        placeholder="Phone Number"
                                                        name="phone"
                                                        id="phone"
                                                        value={orderData.phone}
                                                        onChange={(e) => setOrderData({ ...orderData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <label htmlFor="address" className="form_control_label">Customer's Address</label>
                                                <div className="input_group">
                                                    <input
                                                        type="text"
                                                        className="form_control"
                                                        placeholder="Your Address"
                                                        name="address"
                                                        id="address"
                                                        value={orderData.address}
                                                        onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="input_group">
                                                    <label htmlFor="date" className="form_control_label">Date</label>
                                                    <input
                                                        type="date"
                                                        className="form_control"
                                                        placeholder="Date"
                                                        name="date"
                                                        id="date"
                                                        value={orderData.date}
                                                        onChange={(e) => setOrderData({ ...orderData, date: e.target.value })}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                <div className="input_group">
                                                    <label htmlFor="status" className="form_control_label">Order Status</label>
                                                    <select
                                                        className="form_control"
                                                        name="status"
                                                        id="status"
                                                        value={orderData.status}
                                                        onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="approved">Approved</option>
                                                    </select>

                                                </div>
                                            </Grid>
                                        </Grid>

                                        <div className="input_group">
                                            <label htmlFor="message" className="form_control_label">Customer's Message</label>
                                            <textarea
                                                className="form_control"
                                                placeholder="Message"
                                                name="message"
                                                id="message"
                                                value={orderData.message}
                                                onChange={(e) => setOrderData({ ...orderData, message: e.target.value })}
                                            />
                                        </div>
                                        <div className="booking_submit">
                                            <button type="submit" className="btn btn_primary" style={{ minWidth: '110px' }}>
                                                {loading ? (
                                                    <CircularProgress sx={{
                                                        color: '#fff',
                                                        width: '25px !important',
                                                        height: '25px !important'
                                                    }}
                                                    />
                                                ) : 'Update'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Box>
                        </div>
                    </Container>
                </div>
            )}
        </>
    );
};

export default EditOrder;