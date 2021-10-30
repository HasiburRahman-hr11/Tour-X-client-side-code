import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { errorNotify, successNotify } from '../../utils/toastify';
import { PackageContext } from '../../context/PackageContext';
import Loading from '../../components/Loading/Loading';

const EditPackage = () => {
    const { id } = useParams();

    const { packages, setPackages } = useContext(PackageContext);

    const [packageData, setPackageData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        price: '',
        location: '',
        duration: ''
    });

    const [loadingPackage, setLoadingPackage] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const { data } = await axios.put(`https://tour-x-travel-package-api.herokuapp.com/api/packages/${id}`, packageData);

            const prevPackages = packages.filter(order => order._id !== id);

            setPackages([...prevPackages, data])

            setLoading(false);
            successNotify('Package Updated Successfully.')
        } catch (error) {
            console.log(error);
            setLoading(false);
            errorNotify('Opps, Something went wrong!')
        }

    }
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const { data } = await axios.get(`https://tour-x-travel-package-api.herokuapp.com/api/packages/${id}`);

                if (data._id) {
                    setPackageData({
                        title: data.title,
                        description: data.description,
                        thumbnail: data.thumbnail,
                        price: data.price,
                        location: data.location,
                        duration: data.duration
                    })
                    setLoadingPackage(false);
                }
            } catch (error) {
                console.log(error);
                setLoadingPackage(false);
            }
        }
        fetchPackage()
    }, [id]);

    return (
        <>
            {loadingPackage ? (
                <Loading />
            ) : (
                <div className="page add_package">
                    <div className="page_content">
                        <Container fixed>
                            <Box component={Paper} sx={{
                                padding: '20px 20px'
                            }}>
                                <h2 className="add_package_title">Edit Package</h2>
                                <form action="" className="add_package_form" onSubmit={handleUpdate}>
                                    <div className="input_group">
                                        <input
                                            type="text"
                                            className="form_control"
                                            placeholder="Package Title"
                                            name="title"
                                            id="title"
                                            value={packageData.title}
                                            onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
                                        />
                                    </div>

                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Package Duration"
                                                    name="duration"
                                                    name="id"
                                                    value={packageData.duration}
                                                    onChange={(e) => setPackageData({ ...packageData, duration: e.target.value })}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <div className="input_group">
                                                <input
                                                    type="number"
                                                    className="form_control"
                                                    placeholder="Package Price"
                                                    name="price"
                                                    id="price"
                                                    value={packageData.price}
                                                    onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
                                                />
                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={12}>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Package Location"
                                                    name="location"
                                                    id="location"
                                                    value={packageData.location}
                                                    onChange={(e) => setPackageData({ ...packageData, location: e.target.value })}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <div className="input_group">
                                                <input
                                                    type="text"
                                                    className="form_control"
                                                    placeholder="Package Thumbnail"
                                                    name="thumbnail"
                                                    id="thumbnail"
                                                    value={packageData.thumbnail}
                                                    onChange={(e) => setPackageData({ ...packageData, thumbnail: e.target.value })}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <div className="input_group">
                                        <textarea
                                            className="form_control"
                                            placeholder="Package Description"
                                            name="description"
                                            id="description"
                                            value={packageData.description}
                                            onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="auth_submit">
                                        <button type="submit" className="btn btn_primary" style={{ minWidth: '130px' }}>
                                            {loading ? (
                                                <CircularProgress sx={{
                                                    color: '#fff',
                                                    width: '25px !important',
                                                    height: '25px !important'
                                                }}
                                                />
                                            ) : 'Update Package'}
                                        </button>
                                    </div>
                                </form>
                            </Box>
                        </Container>
                    </div>
                </div>
            )}

        </>
    );
};

export default EditPackage;