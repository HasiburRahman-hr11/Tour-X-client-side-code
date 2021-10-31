import React, { useContext } from 'react';
import Banner from '../../components/Banner/Banner';
import Offer from '../../components/Offer/Offer';
import PackagesSection from '../../components/PackagesSection/PackagesSection';
import "slick-carousel/slick/slick.css";
import Testimonial from '../../components/Testimonials/Testimonial';
import { PackageContext } from '../../context/PackageContext';
import Loading from '../../components/Loading/Loading';

const Home = () => {
    const { packages, loading } = useContext(PackageContext)
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Banner packages={packages} />
                    <PackagesSection packages={packages} />
                    <Offer />
                    <Testimonial />
                </>
            )}
        </>
    );
};

export default Home;