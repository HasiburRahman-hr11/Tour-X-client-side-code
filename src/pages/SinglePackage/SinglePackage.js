import { Container, Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import PageBanner from '../../components/PageBanner/PageBanner';
import RoomIcon from '@mui/icons-material/Room';
import './SinglePackage.css';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { errorNotify, successNotify } from '../../utils/toastify';
import useOrders from '../../hooks/useOrders';
import { OrderContext } from '../../context/OrderContext';

const SinglePackage = () => {

    const { orders, setOrders , userOrders, setUserOrders } = useContext(OrderContext);
    const { id } = useParams();
    const { user } = useAuth();
    const history = useHistory();

    const [singlePackage, setSinglePackage] = useState({});
    const [loading, setLoading] = useState(true);

    const [bookingInfo, setBookingInfo] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        date: '',
        message: ''
    });

    const handleBooking = async (e) => {
        e.preventDefault();
        const bookingData = {
            userId: user._id,
            ...bookingInfo,
            package: singlePackage._id
        }

        try {
            const { data } = await axios.post('http://localhost:8000/api/orders/add', bookingData);
            if (data._id) {
                setOrders([data , ...orders])
                setUserOrders([data , ...userOrders])
                successNotify('Booking Successful.');
                history.push('/my-orders')
            }
        } catch (error) {
            console.log(error);
            errorNotify('Opps, Something went wrong!');
        }
    }

    useEffect(() => {

        const getSinglePackage = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/packages/${id}`);

                setSinglePackage(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        };
        getSinglePackage();

    }, [id]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="page single_package">
                    <PageBanner title="Tour Package Details" bg="https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                    <div className="page_content">
                        <Container fixed>
                            <Grid container spacing={4}>
                                <Grid item md={8} xs={12} >
                                    <div className="package_details">
                                        <img src={singlePackage.thumbnail} alt={singlePackage.title} />

                                        <div className="single_package_content">
                                            <h2>{singlePackage.title} </h2>
                                            <div className="single_package_meta">
                                                <p className="single_package_location">
                                                    <RoomIcon />
                                                    {singlePackage.location}
                                                </p>
                                                <p className="single_package_duration">
                                                    {singlePackage.duration}
                                                </p>
                                                <p className="single_package_price">
                                                    ${singlePackage.price} /Per Person
                                                </p>
                                            </div>

                                            <p className="package_overview">
                                                {singlePackage.description}
                                            </p>

                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={4} xs={12} >
                                    <div className="package_booking_wrapper">
                                        <h2>Book This Package</h2>
                                        <form
                                            action=""
                                            className="package_booking_form"
                                            onSubmit={handleBooking}
                                        >
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Your Full Name"
                                                    name="name"
                                                    required
                                                    value={bookingInfo.name}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="email"
                                                    className="form_control"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    required
                                                    value={bookingInfo.email}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="tel"
                                                    className="form_control"
                                                    placeholder="Phone Number"
                                                    name="phone"
                                                    required
                                                    value={bookingInfo.phone}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Your Address"
                                                    name="address"
                                                    required
                                                    value={bookingInfo.address}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, address: e.target.value })}
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="date"
                                                    className="form_control"
                                                    placeholder="Date"
                                                    name="date"
                                                    required
                                                    value={bookingInfo.date}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, date: e.target.value })}
                                                />
                                            </div>
                                            <div className="input_group">
                                                <textarea
                                                    className="form_control"
                                                    placeholder="Message"
                                                    name="message"
                                                    value={bookingInfo.message}
                                                    onChange={(e) => setBookingInfo({ ...bookingInfo, message: e.target.value })}
                                                />
                                            </div>
                                            <div className="booking_submit">
                                                <button className="btn btn_primary" type="submit">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            )}
        </>

    );
};

export default SinglePackage;