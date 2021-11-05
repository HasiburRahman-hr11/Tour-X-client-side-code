import React, { useContext, useEffect } from 'react';
import '../MyOrders/MyOrders.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageBanner from '../../components/PageBanner/PageBanner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PackageContext } from '../../context/PackageContext';
import Loading from '../../components/Loading/Loading';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { errorNotify, successNotify } from '../../utils/toastify';


const AllPackages = () => {

    const { packages, setPackages, loading } = useContext(PackageContext);

    const handleDeleteOrder = async (packId) => {
        const agree = window.confirm('Delete this package?');
        if (agree) {
            try {
                const { data } = await axios.delete(`http://localhost:8000/api/packages/${packId}`);
                if (data.success) {
                    setPackages(packages.filter(pack => pack._id !== packId));
                    successNotify('Package deleted successfully.');
                } else {
                    errorNotify('Couldn\'t delete the package');
                }
            } catch (error) {
                console.log(error);
                errorNotify('Opps, Something went wrong!');
            }
        }

    }

    useEffect(() => {


    }, [])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="page my_orders">
                    <PageBanner title="All Packages" bg="https://images.pexels.com/photos/3788363/pexels-photo-3788363.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
                    <div className="page_content">
                        <Container fixed>
                            {packages.length < 1 ? (
                                <div className="no_order">
                                    <h2>No Order has been made yet.</h2>
                                </div>
                            ) : (
                                <Grid container spacing={4}>
                                    {packages.map((pack, index) => (
                                        <Grid
                                            key={pack._id}
                                            item
                                            sm={6}
                                            xs={12}
                                        >
                                            <div className="order_item">
                                                <div className="order_image">
                                                    <img src={pack.thumbnail} alt="" />
                                                </div>
                                                <div className="order_content">
                                                    <div>
                                                        <h4>
                                                            <Link to={`/packages/${pack._id}`}>{pack.title}</Link>
                                                        </h4>
                                                        <p>
                                                            <span className="order_duration">{pack.duration}
                                                            </span>
                                                            <span className="order_price">${pack.price}</span>
                                                        </p>


                                                    </div>
                                                    <div className="cancel_order">

                                                        <p className="order_actions">
                                                            <DeleteOutlineIcon
                                                                onClick={() => handleDeleteOrder(pack._id)}
                                                                className="order_action_icon"
                                                                title="Delete Package"
                                                            />
                                                            <Link to={`/edit-package/${pack._id}`}>
                                                                <EditIcon 
                                                                title="Edit Package"
                                                                className="order_action_icon" />
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

export default AllPackages;