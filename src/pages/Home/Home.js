import React from 'react';
import Banner from '../../components/Banner/Banner';
import Offer from '../../components/Offer/Offer';
import PackagesSection from '../../components/PackagesSection/PackagesSection';
import "slick-carousel/slick/slick.css";
import Testimonial from '../../components/Testimonials/Testimonial';


const Home = () => {
    return (
        <>
            <Banner/>
            <PackagesSection/>
            <Offer/>
            <Testimonial/>
        </>
    );
};

export default Home;