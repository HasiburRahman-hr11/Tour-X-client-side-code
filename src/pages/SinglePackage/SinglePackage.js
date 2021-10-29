import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import PageBanner from '../../components/PageBanner/PageBanner';
import { packages } from '../../fakeData';
import RoomIcon from '@mui/icons-material/Room';
import './SinglePackage.css';

const SinglePackage = () => {
    const { id } = useParams();

    const [singlePackage, setSinglePackage] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getSinglePackage = () => {
            setLoading(true);
            const findPackge = packages.find(pack => pack._id === id);
            setSinglePackage(findPackge);
            setLoading(false);
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

                                        <div className="package_content">
                                            <h2>{singlePackage.title} </h2>
                                            <p className="package_location">
                                                <RoomIcon />
                                                {singlePackage.location}
                                            </p>

                                            <p className="package_overview">
                                                {singlePackage.description}
                                            </p>

                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={4} xs={12} >
                                    <div className="package_booking_wrapper">
                                        <h2>Book This Package</h2>
                                        <form action="" className="package_booking_form">
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Your Full Name"
                                                    name="userName"
                                                    required
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="email"
                                                    className="form_control"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    required
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="tel"
                                                    className="form_control"
                                                    placeholder="Phone Number"
                                                    name="phone"
                                                    required
                                                />
                                            </div>
                                            <div className="input_group">
                                                <input
                                                    type="date"
                                                    className="form_control"
                                                    placeholder="Date"
                                                    name="date"
                                                    required
                                                />
                                            </div>
                                            <div className="input_group">
                                                <textarea
                                                    className="form_control"
                                                    placeholder="Message"
                                                    name="message"
                                                />
                                            </div>
                                            <div className="booking_submit">
                                                <button className="btn btn_primary">Submit</button>
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