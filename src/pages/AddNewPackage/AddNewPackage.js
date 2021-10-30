import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { errorNotify, successNotify } from '../../utils/toastify';
import { PackageContext } from '../../context/PackageContext';

const AddNewPackage = () => {

    const { packages, setPackages } = useContext(PackageContext)

    const [packageData, setPackageData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        price: '',
        location: '',
        duration: ''
    });

    const [loading, setLoading] = useState(false)

    const handleAddNewPackage = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post('https://tour-x-travel-package-api.herokuapp.com/api/packages/add', packageData)

            if (data?._id) {
                setPackageData({
                    title: '',
                    description: '',
                    thumbnail: '',
                    price: '',
                    location: '',
                    duration: ''
                });
                setPackages([...packages, data])
            }
            successNotify('Package added successfully');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            errorNotify('Opps, Something went wrong!')
        }
    }

    return (
        <div className="page add_package">
            <div className="page_content">
                <Container fixed>
                    <Box component={Paper} sx={{
                        padding: '20px 20px'
                    }}>
                        <h2 className="add_package_title">Add New Package</h2>
                        <form action="" className="add_package_form" onSubmit={handleAddNewPackage}>
                            <div className="input_group">
                                <input
                                    type="text"
                                    className="form_control"
                                    placeholder="Package Title"
                                    name="title"
                                    required
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
                                            required
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
                                            required
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
                                            required
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
                                    ) : 'Add Package'}
                                </button>
                            </div>
                        </form>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default AddNewPackage;